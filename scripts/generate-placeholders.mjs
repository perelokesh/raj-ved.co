// Generates synthetic, clearly-labelled placeholder stills (section 3d of the brief).
// No real people are depicted. Output goes to public/media/ and is recorded in CREDITS.json.
// Run: node scripts/generate-placeholders.mjs
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/media");
const FETCHED = new Date().toISOString().slice(0, 10);

// Palette from the brand tokens.
const PALETTE = {
  olive: "#47542B",
  deepOlive: "#2F381C",
  ivory: "#F6F2E9",
  sand: "#E9E2D2",
  marigold: "#D9A441",
  maroon: "#6B2A22",
  ink: "#14170E",
};

// Each frame: a distinct warm-toned composition. Shapes suggest light, fabric
// and garlands without depicting people.
const FRAMES = [
  { id: "hero-poster", w: 2400, h: 1350, name: "warm-light-mandap", stops: [PALETTE.deepOlive, PALETTE.marigold, PALETTE.ink], accent: PALETTE.marigold, shape: "arches" },
  { id: "intro", w: 2400, h: 3000, name: "sand-linen-drape", stops: [PALETTE.sand, PALETTE.ivory, PALETTE.sand], accent: PALETTE.olive, shape: "drape" },
  { id: "story", w: 2000, h: 2500, name: "olive-dusk-window", stops: [PALETTE.olive, PALETTE.deepOlive, PALETTE.ink], accent: PALETTE.sand, shape: "window" },
  { id: "film", w: 2400, h: 1350, name: "marigold-garland-glow", stops: [PALETTE.maroon, PALETTE.marigold, PALETTE.deepOlive], accent: PALETTE.ivory, shape: "garland" },
  { id: "gallery-01", w: 1600, h: 2000, name: "ceremony-diya-flame", stops: [PALETTE.ink, PALETTE.maroon, PALETTE.marigold], accent: PALETTE.marigold, shape: "arches" },
  { id: "gallery-02", w: 2400, h: 1600, name: "details-brass-table", stops: [PALETTE.sand, PALETTE.marigold, PALETTE.sand], accent: PALETTE.deepOlive, shape: "drape" },
  { id: "gallery-03", w: 1600, h: 2000, name: "portrait-olive-veil", stops: [PALETTE.olive, PALETTE.sand, PALETTE.ivory], accent: PALETTE.deepOlive, shape: "window" },
  { id: "gallery-04", w: 2400, h: 1600, name: "celebration-maroon-hall", stops: [PALETTE.maroon, PALETTE.deepOlive, PALETTE.ink], accent: PALETTE.marigold, shape: "garland" },
  { id: "gallery-05", w: 1600, h: 1600, name: "detail-marigold-square", stops: [PALETTE.marigold, PALETTE.sand, PALETTE.olive], accent: PALETTE.ivory, shape: "arches" },
  { id: "og", w: 1200, h: 630, name: "brand-og-card", stops: [PALETTE.olive, PALETTE.deepOlive, PALETTE.ink], accent: PALETTE.sand, shape: "window" },
];

function shapeSvg(shape, w, h, accent) {
  const op = 0.18;
  if (shape === "arches") {
    return [0.2, 0.5, 0.8].map((x, i) =>
      `<path d="M${w * x - w * 0.12} ${h} L${w * x - w * 0.12} ${h * 0.45} Q${w * x} ${h * 0.12} ${w * x + w * 0.12} ${h * 0.45} L${w * x + w * 0.12} ${h}" fill="none" stroke="${accent}" stroke-opacity="${op + i * 0.04}" stroke-width="${w * 0.006}"/>`
    ).join("");
  }
  if (shape === "drape") {
    return Array.from({ length: 9 }, (_, i) => {
      const x = (w / 9) * i + w / 18;
      return `<path d="M${x} 0 Q${x + w * 0.02} ${h / 2} ${x} ${h}" fill="none" stroke="${accent}" stroke-opacity="${op}" stroke-width="${w * 0.004}"/>`;
    }).join("");
  }
  if (shape === "window") {
    return `<rect x="${w * 0.3}" y="${h * 0.2}" width="${w * 0.4}" height="${h * 0.5}" fill="none" stroke="${accent}" stroke-opacity="${op + 0.05}" stroke-width="${w * 0.005}"/><line x1="${w * 0.5}" y1="${h * 0.2}" x2="${w * 0.5}" y2="${h * 0.7}" stroke="${accent}" stroke-opacity="${op}" stroke-width="${w * 0.003}"/>`;
  }
  // garland: scattered dots in a sagging string
  return Array.from({ length: 40 }, (_, i) => {
    const x = (w / 39) * i;
    const y = h * 0.3 + Math.sin((i / 39) * Math.PI) * h * 0.15;
    return `<circle cx="${x}" cy="${y}" r="${w * 0.008}" fill="${accent}" fill-opacity="${op + 0.1}"/>`;
  }).join("");
}

function frameSvg(f) {
  const [a, b, c] = f.stops;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${f.w}" height="${f.h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/><stop offset="0.5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.4" r="0.6">
      <stop offset="0" stop-color="${b}" stop-opacity="0.55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.45"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  ${shapeSvg(f.shape, f.w, f.h, f.accent)}
  <rect width="100%" height="100%" fill="url(#vig)"/>
</svg>`;
}

// Warm, lifted grade + film grain applied at processing time (section 3e).
async function grade(buffer, w, h) {
  const noise = Buffer.alloc(w * h * 3);
  for (let i = 0; i < noise.length; i++) noise[i] = 128 + ((Math.random() * 2 - 1) * 14) | 0;
  const grainPng = await sharp(noise, { raw: { width: w, height: h, channels: 3 } }).png().toBuffer();
  return sharp(buffer)
    .modulate({ saturation: 0.92 })
    .linear(0.96, 8) // lift blacks slightly
    .tint({ r: 255, g: 246, b: 232 }) // warm highlights
    .composite([{ input: grainPng, blend: "overlay", opacity: 0.12 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}

await mkdir(path.join(OUT, "gallery"), { recursive: true });
await mkdir(path.join(OUT, "og"), { recursive: true });
await mkdir(path.join(OUT, "hero"), { recursive: true });

const credits = [];
for (const f of FRAMES) {
  const svgBuf = Buffer.from(frameSvg(f));
  const raw = await sharp(svgBuf).png().toBuffer();
  const jpg = await grade(raw, f.w, f.h);
  const dir = f.id.startsWith("gallery") ? "gallery" : f.id === "og" ? "og" : "hero";
  const file = `${dir}/${f.name}.jpg`;
  await writeFile(path.join(OUT, file), jpg);
  credits.push({
    file: `public/media/${file}`,
    id: f.id,
    kind: "synthetic-still",
    width: f.w,
    height: f.h,
    author: "Generated locally for this prototype (no photographs of people)",
    source: "scripts/generate-placeholders.mjs",
    licence: "Generated for this project; no third-party licence",
    fetched: FETCHED,
  });
}

await writeFile(path.join(OUT, "CREDITS.json"), JSON.stringify(credits, null, 2) + "\n");
console.log(`Wrote ${credits.length} synthetic stills to public/media`);
