import sharp from "sharp";
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "public/images/pressed-collage-source.jpg");
const outDir = join(root, "public/images/flowers");

/** Crops tuned for 576×1024 collage — one file per bloom cluster */
const REGIONS = [
  { name: "hydrangea-pink-a", left: 0, top: 0, width: 290, height: 340 },
  { name: "hydrangea-pink-b", left: 268, top: 0, width: 308, height: 300 },
  { name: "yellow-bloom-a", left: 60, top: 280, width: 240, height: 220 },
  { name: "burgundy-daisy", left: 330, top: 190, width: 220, height: 210 },
  { name: "lavender", left: 175, top: 400, width: 210, height: 230 },
  { name: "white-daisy", left: 20, top: 470, width: 175, height: 175 },
  { name: "yellow-bloom-b", left: 360, top: 370, width: 195, height: 190 },
  { name: "pink-cluster-mid", left: 85, top: 610, width: 235, height: 240 },
  { name: "cream-daisy", left: 295, top: 560, width: 205, height: 200 },
  { name: "babys-breath", left: 430, top: 640, width: 145, height: 220 },
  { name: "pink-wide-bottom", left: 0, top: 760, width: 275, height: 264 },
  { name: "mix-bottom", left: 245, top: 790, width: 331, height: 234 },
];

function keyMagentaBackground(data) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    const avg = (r + g + b) / 3;

    const isMagentaPaper =
      r > 95 &&
      r > g + 8 &&
      (b < r - 5 || (r > 140 && g < 145)) &&
      sat > 0.12 &&
      avg < 235;

    const isHotPinkFill = r > 150 && g < 95 && b > 80 && b < 170;

    let alpha = data[i + 3];
    if (isMagentaPaper || isHotPinkFill) {
      alpha = 0;
    } else if (isMagentaPaper === false && r > 180 && g < 130 && b > 100 && sat > 0.35) {
      const t = Math.min(1, (220 - avg) / 80);
      alpha = Math.min(alpha, Math.floor(t * t * 255));
    }

    data[i + 3] = alpha;
  }
}

mkdirSync(outDir, { recursive: true });

const manifest = [];

for (const region of REGIONS) {
  const { data, info } = await sharp(source)
    .extract({
      left: region.left,
      top: region.top,
      width: region.width,
      height: region.height,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  keyMagentaBackground(data);

  const keyed = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();

  const trimmed = await sharp(keyed).trim({ threshold: 12 }).png().toBuffer();
  const meta = await sharp(trimmed).metadata();

  const outPath = join(outDir, `${region.name}.png`);
  writeFileSync(outPath, trimmed);

  manifest.push({
    id: region.name,
    src: `/images/flowers/${region.name}.png`,
    w: meta.width,
    h: meta.height,
  });
}

writeFileSync(
  join(root, "lib/pressed-flowers.manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log(`Wrote ${manifest.length} flowers to ${outDir}`);
