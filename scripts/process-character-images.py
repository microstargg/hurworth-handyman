"""Rebuild the cartoon character images from the source collage.

Each panel is cropped on its real gutters, upscaled 4x with Real-ESRGAN
(anime_6B), cut out with rembg/BiRefNet, edge-decontaminated so no light
fringe from the panel background survives, then saved as a trimmed PNG.

Setup (one-off, outside the repo):
  python -m venv .venv-images
  .venv-images/Scripts/pip install "rembg[cpu]" spandrel torch pillow numpy opencv-python-headless
  curl -L -o RealESRGAN_x4plus_anime_6B.pth \
    https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.2.4/RealESRGAN_x4plus_anime_6B.pth

Usage:
  .venv-images/Scripts/python scripts/process-character-images.py path/to/RealESRGAN_x4plus_anime_6B.pth [name ...]
"""
import sys
from pathlib import Path

import cv2
import numpy as np
import torch
from PIL import Image
from rembg import new_session, remove
from spandrel import ModelLoader

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "design" / "source" / "character-collage.jpg"
OUT_DIR = ROOT / "public" / "images" / "character"
MAX_HEIGHT = 1600

# (left, top, right, bottom) in the 1024x1024 collage, measured on the white gutters.
PANELS = {
    "portrait-hammer": (0, 0, 413, 516),
    "lawn-mowing": (420, 0, 768, 516),
    "fence-hammering": (785, 0, 1024, 516),
    "drill-wood": (0, 524, 356, 1024),
    "arms-crossed": (368, 524, 672, 1024),
    "yard-raking": (692, 524, 1024, 1024),
}


def upscale(model, img):
    t = torch.from_numpy(np.array(img)).permute(2, 0, 1).float().div(255).unsqueeze(0)
    with torch.no_grad():
        out = model(t).squeeze(0).permute(1, 2, 0).clamp(0, 1).numpy()
    return Image.fromarray((out * 255).round().astype(np.uint8))


def decontaminate(rgba):
    """Replace edge colours with nearby solid foreground colour to kill halos."""
    a = rgba[..., 3].astype(np.float32) / 255
    rgb = rgba[..., :3].astype(np.float32)
    solid = (a > 0.95).astype(np.float32)
    k = (15, 15)
    fg = cv2.blur(rgb * solid[..., None], k) / np.maximum(cv2.blur(solid, k), 1e-4)[..., None]
    edge = ((a > 0) & (a < 0.95))[..., None]
    rgba[..., :3] = np.where(edge, fg, rgb).clip(0, 255).astype(np.uint8)
    # Drop near-invisible specks left by the matting.
    rgba[..., 3] = np.where(a < 0.04, 0, rgba[..., 3])
    return rgba


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    names = sys.argv[2:] or list(PANELS)
    model = ModelLoader().load_from_file(sys.argv[1]).eval()
    session = new_session("birefnet-general")
    collage = Image.open(SOURCE).convert("RGB")

    for name in names:
        big = upscale(model, collage.crop(PANELS[name]))
        cut = remove(big, session=session, post_process_mask=True)
        cut = Image.fromarray(decontaminate(np.array(cut.convert("RGBA"))))
        cut = cut.crop(cut.getbbox())
        if cut.height > MAX_HEIGHT:
            w = round(cut.width * MAX_HEIGHT / cut.height)
            cut = cut.resize((w, MAX_HEIGHT), Image.LANCZOS)
        cut.save(OUT_DIR / f"{name}.png", optimize=True)
        print(f"{name}: {cut.width}x{cut.height}", flush=True)


if __name__ == "__main__":
    main()
