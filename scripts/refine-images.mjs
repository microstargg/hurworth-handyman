import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const characterDir = path.join(root, "public", "images", "character");
const collage = process.argv[2];

const W = 1024;
const H = 1024;
const cellW = Math.floor(W / 3);
const cellH = Math.floor(H / 2);

async function extractCell(name, col, row, insetL, insetR, insetY = 14) {
  const left = col * cellW + insetL;
  const top = row * cellH + insetY;
  const width = cellW - insetL - insetR;
  const height = cellH - insetY * 2;
  const dest = path.join(characterDir, `${name}.png`);
  await sharp(collage).extract({ left, top, width, height }).png().toFile(dest);
  console.log("extract", name, `${width}x${height}`);
  return dest;
}

function isPaper(r, g, b) {
  const avg = (r + g + b) / 3;
  return (
    avg > 228 ||
    (r > 212 && g > 208 && b > 198 && Math.max(r, g, b) - Math.min(r, g, b) < 32)
  );
}

function isPurple(r, g, b) {
  if (r > g + 28 && r > b + 8) return false;
  if (r > 155 && g > 115 && b < 115) return false;
  return b > 105 && b > g + 25 && b >= r - 22 && g < 180;
}

function isBackdrop(r, g, b) {
  return isPaper(r, g, b) || isPurple(r, g, b);
}

function dist(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function floodCutout(inputPath, mild = false) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels } = info;
  const rgba = Buffer.from(data);
  const visited = new Uint8Array(w * h);
  const queue = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const idx = y * w + x;
    if (visited[idx]) return;
    const i = idx * channels;
    if (!isBackdrop(rgba[i], rgba[i + 1], rgba[i + 2])) return;
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  const samples = [];
  for (const idx of queue) {
    const i = idx * channels;
    if (samples.length < 120) samples.push([rgba[i], rgba[i + 1], rgba[i + 2]]);
  }

  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    const x = idx % w;
    const y = (idx / w) | 0;
    for (const [dx, dy] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ]) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const nidx = ny * w + nx;
      if (visited[nidx]) continue;
      const i = nidx * channels;
      const c = [rgba[i], rgba[i + 1], rgba[i + 2]];
      let ok = isBackdrop(c[0], c[1], c[2]);
      if (!ok) {
        for (const s of samples) {
          if (
            dist(c, s) < 38 &&
            (isPaper(...c) ||
              isPurple(...c) ||
              (c[2] > c[1] + 15 && c[2] > 95))
          ) {
            ok = true;
            break;
          }
        }
      }
      if (!ok) continue;
      visited[nidx] = 1;
      queue.push(nidx);
    }
  }

  for (let idx = 0; idx < w * h; idx++) {
    if (visited[idx]) rgba[idx * channels + 3] = 0;
  }

  for (let idx = 0; idx < w * h; idx++) {
    const i = idx * channels;
    if (rgba[i + 3] === 0) continue;
    if (isPurple(rgba[i], rgba[i + 1], rgba[i + 2])) rgba[i + 3] = 0;
  }

  const passes = mild ? 2 : 3;
  for (let pass = 0; pass < passes; pass++) {
    const alpha = new Uint8Array(w * h);
    for (let idx = 0; idx < w * h; idx++) alpha[idx] = rgba[idx * channels + 3];
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        if (alpha[idx] === 0) continue;
        const i = idx * channels;
        const r = rgba[i];
        const g = rgba[i + 1];
        const b = rgba[i + 2];
        const avg = (r + g + b) / 3;
        let t = 0;
        for (const [dx, dy] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          if (alpha[(y + dy) * w + (x + dx)] === 0) t++;
        }
        if (t < 2) continue;
        if (avg < 100) continue;
        if (r > 145 && g > 95 && g < 175 && b < 145 && r > b + 18) continue;
        if (r > 170 && g > 130 && b < 105) continue;
        if (
          isPaper(r, g, b) ||
          isPurple(r, g, b) ||
          avg > 200 ||
          (b > g + 15 && avg > 150)
        ) {
          rgba[i + 3] = 0;
        }
      }
    }
  }

  const tmp = `${inputPath}.tmp.png`;
  await sharp(rgba, { raw: { width: w, height: h, channels } })
    .png()
    .trim({ threshold: 0 })
    .toFile(tmp);
  fs.renameSync(tmp, inputPath);
  console.log("cutout", path.basename(inputPath));
}

if (!collage) {
  console.error("Usage: node scripts/refine-images.mjs <collage-path>");
  process.exit(1);
}

await floodCutout(await extractCell("portrait-hammer", 0, 0, 18, 28), true);
await floodCutout(await extractCell("arms-crossed", 1, 1, 22, 22), false);

const fence = await extractCell("fence-hammering", 2, 0, 125, 4, 20);
const fenceMeta = await sharp(fence).metadata();
const cropL = 10;
await sharp(fence)
  .extract({
    left: cropL,
    top: 0,
    width: fenceMeta.width - cropL,
    height: fenceMeta.height,
  })
  .png()
  .toFile(`${fence}.tmp`);
fs.renameSync(`${fence}.tmp`, fence);
console.log("fence cropped");
console.log("done");
