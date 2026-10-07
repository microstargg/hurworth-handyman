"""Tidy and crop the Recent Work photos.

Removes small clutter with LaMa inpainting, applies light tone correction,
and crops each photo square for the work grid.

Setup: pip install simple-lama-inpainting numpy
Usage: python scripts/process-work-photos.py
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
from simple_lama_inpainting import SimpleLama

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "design" / "source" / "work"
OUT = ROOT / "public" / "images" / "work"

# source file, output name, clutter boxes to remove, tone settings, square crop
PHOTOS = [
    (
        "hallway-bench.webp", "hallway-bench",
        [(462, 200, 668, 270)],  # router and sockets on the shelf
        dict(gamma=1.15, wb=(0.97, 1.0, 1.04), contrast=1.05, sat=1.02),
        (76, 150, 1086, 1160),
    ),
    (
        "garden-decking.jpg", "garden-decking",
        [(150, 1655, 270, 1775), (1355, 450, 1490, 505)],  # plant pot, tub on neighbour's roof
        dict(gamma=1.05, contrast=1.06, sat=1.05),
        (0, 220, 1500, 1720),
    ),
    (
        "garden-fence.jpg", "garden-fence",
        [(970, 695, 1185, 805), (985, 955, 1115, 1095)],  # timber offcuts, rock on lawn
        dict(contrast=1.04, sat=1.04),
        (180, 0, 1305, 1125),
    ),
]


def inpaint(lama, im, boxes):
    mask = Image.new("L", im.size, 0)
    draw = ImageDraw.Draw(mask)
    for box in boxes:
        draw.rectangle(box, fill=255)
    mask = mask.filter(ImageFilter.MaxFilter(15))
    return lama(im, mask).crop((0, 0, *im.size))


def tone(im, gamma=1.0, wb=(1, 1, 1), contrast=1.0, sat=1.0):
    a = np.asarray(im).astype(np.float32) / 255
    a = np.clip(a * np.array(wb), 0, 1) ** (1 / gamma)
    im = Image.fromarray((a * 255).round().astype(np.uint8))
    im = ImageEnhance.Contrast(im).enhance(contrast)
    im = ImageEnhance.Color(im).enhance(sat)
    return im.filter(ImageFilter.UnsharpMask(radius=1.5, percent=60, threshold=3))


def main():
    lama = SimpleLama()
    OUT.mkdir(parents=True, exist_ok=True)
    for src, name, boxes, settings, crop in PHOTOS:
        im = Image.open(SRC / src).convert("RGB")
        im = tone(inpaint(lama, im, boxes), **settings).crop(crop)
        im.save(OUT / f"{name}.jpg", quality=86, optimize=True, progressive=True)
        print(f"{name}: {im.width}x{im.height}")


if __name__ == "__main__":
    main()
