import sharp from "sharp";
import { writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "public/images/lotus-reference-source.png");
const input = existsSync(source)
  ? source
  : join(root, "public/images/lotus-reference.png");
const output = join(root, "public/images/lotus-reference.png");

const WHITE = 246;
const EDGE = 218;

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const avg = (r + g + b) / 3;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;

  let alpha = data[i + 3];

  const isWhite = r >= WHITE && g >= WHITE && b >= WHITE;
  const isLightFringe = avg >= EDGE && (sat <= 0.22 || isWhite);
  const isPinkHalo = r > g + 6 && r > b + 6 && avg >= 205 && avg <= WHITE && sat < 0.35;

  if (isWhite || isPinkHalo) {
    alpha = 0;
  } else if (isLightFringe) {
    const t = Math.max(0, Math.min(1, (WHITE - avg) / (WHITE - EDGE)));
    alpha = Math.min(alpha, Math.floor(t * t * 255));
  }

  data[i + 3] = alpha;
}

const out = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toBuffer();

writeFileSync(output, out);
console.log("Wrote transparent lotus:", output, info.width, "x", info.height);
