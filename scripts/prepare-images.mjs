import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const collage = process.argv[2];
const outDir = path.join(root, "public", "images");

const W = 1024;
const H = 1024;
const cols = 3;
const rows = 2;
const cellW = Math.floor(W / cols);
const cellH = Math.floor(H / rows);
const insetY = 14;

// Per-cell insets: outer edges need more trim to avoid white gutters /
// neighbouring-panel bleed in the collage.
const crops = [
  ["portrait-hammer", 0, 0, 18, 28],
  ["lawn-mowing", 1, 0, 22, 22],
  ["fence-hammering", 2, 0, 78, 10],
  ["drill-wood", 0, 1, 18, 28],
  ["arms-crossed", 1, 1, 22, 22],
  ["yard-raking", 2, 1, 72, 10],
];

for (const [name, col, row, insetL, insetR] of crops) {
  const left = col * cellW + insetL;
  const top = row * cellH + insetY;
  const width = cellW - insetL - insetR;
  const height = cellH - insetY * 2;
  const dest = path.join(outDir, "character", `${name}.png`);
  await sharp(collage)
    .extract({ left, top, width, height })
    .png()
    .toFile(dest);
  console.log("wrote", name, `${width}x${height}`);
}

const placeholders = [
  {
    name: "fence-install",
    c1: "#8B7355",
    c2: "#5C4A3A",
    title: "Fence install",
    hint: "Replace with your photo",
  },
  {
    name: "repairs",
    c1: "#6B7F5A",
    c2: "#3F4F35",
    title: "Repairs",
    hint: "Replace with your photo",
  },
  {
    name: "renovation",
    c1: "#A89070",
    c2: "#6E5A42",
    title: "Renovation",
    hint: "Replace with your photo",
  },
];

for (const p of placeholders) {
  const w = 1200;
  const h = 900;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.c1}"/>
      <stop offset="100%" stop-color="${p.c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect x="48" y="48" width="${w - 96}" height="${h - 96}" fill="none"
    stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-dasharray="14 12" rx="8"/>
  <text x="600" y="420" text-anchor="middle" font-family="Georgia, serif" font-size="48"
    fill="rgba(255,255,255,0.95)">${p.title}</text>
  <text x="600" y="480" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="26"
    fill="rgba(255,255,255,0.75)">${p.hint}</text>
  <text x="600" y="540" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="20"
    fill="rgba(255,255,255,0.55)">public/images/work/${p.name}.jpg</text>
</svg>`;
  const dest = path.join(outDir, "work", `${p.name}.jpg`);
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(dest);
  console.log("wrote work", p.name);
}
