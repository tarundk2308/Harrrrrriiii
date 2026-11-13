import manifest from "@/lib/pressed-flowers.manifest.json";

type ManifestEntry = { id: string; src: string; w: number; h: number };

const entries = manifest as ManifestEntry[];

export type FlowerPlace = {
  slotId: string;
  id: string;
  src: string;
  naturalW: number;
  naturalH: number;
  x: number;
  y: number;
  size: string;
  rot: number;
  depth: number;
  opacity: number;
  layer: number;
  float: number;
  delay: number;
};

function flower(
  id: string,
  slotId: string,
  layout: Omit<FlowerPlace, "id" | "src" | "slotId" | "naturalW" | "naturalH">,
): FlowerPlace {
  const entry = entries.find((e) => e.id === id);
  return {
    id,
    slotId,
    src: entry?.src ?? `/images/flowers/${id}.png`,
    naturalW: entry?.w ?? 220,
    naturalH: entry?.h ?? 220,
    ...layout,
  };
}

/** Gate — all collage blooms, spaced around the lotus; duplicates for fullness. */
export const GATE_FLOWERS: FlowerPlace[] = [
  flower("hydrangea-pink-a", "gate-a", { x: -8, y: 0, size: "min(44vw, 11rem)", rot: -10, depth: 0.2, opacity: 0.92, layer: 1, float: 6, delay: 0 }),
  flower("hydrangea-pink-b", "gate-b", { x: 68, y: -2, size: "min(42vw, 10.5rem)", rot: 12, depth: 0.18, opacity: 0.9, layer: 1, float: 5, delay: 0.25 }),
  flower("pink-wide-bottom", "gate-c", { x: 62, y: 82, size: "min(40vw, 10rem)", rot: -6, depth: 0.22, opacity: 0.88, layer: 1, float: 4, delay: 0.45 }),
  flower("mix-bottom", "gate-d", { x: -10, y: 78, size: "min(42vw, 10.5rem)", rot: 8, depth: 0.2, opacity: 0.86, layer: 1, float: 5, delay: 0.35 }),
  flower("yellow-bloom-a", "gate-e", { x: -6, y: 32, size: "min(34vw, 8.5rem)", rot: -16, depth: 0.45, opacity: 0.94, layer: 2, float: 8, delay: 0.15 }),
  flower("yellow-bloom-b", "gate-f", { x: 72, y: 28, size: "min(32vw, 8rem)", rot: 18, depth: 0.42, opacity: 0.93, layer: 2, float: 7, delay: 0.55 }),
  flower("burgundy-daisy", "gate-g", { x: 76, y: 48, size: "min(30vw, 7.5rem)", rot: 14, depth: 0.5, opacity: 0.95, layer: 3, float: 7, delay: 0.7 }),
  flower("white-daisy", "gate-h", { x: 2, y: 58, size: "min(28vw, 7rem)", rot: -8, depth: 0.48, opacity: 0.92, layer: 2, float: 6, delay: 0.85 }),
  flower("cream-daisy", "gate-i", { x: 80, y: 66, size: "min(30vw, 7.5rem)", rot: -18, depth: 0.46, opacity: 0.9, layer: 2, float: 6, delay: 0.4 }),
  flower("lavender", "gate-j", { x: 82, y: 12, size: "min(32vw, 8rem)", rot: -12, depth: 0.38, opacity: 0.88, layer: 2, float: 5, delay: 0.95 }),
  flower("pink-cluster-mid", "gate-k", { x: -4, y: 66, size: "min(38vw, 9.5rem)", rot: 6, depth: 0.32, opacity: 0.9, layer: 1, float: 5, delay: 0.2 }),
  flower("babys-breath", "gate-l", { x: 8, y: 14, size: "min(24vw, 6rem)", rot: 10, depth: 0.6, opacity: 0.85, layer: 3, float: 10, delay: 0.6 }),
  flower("babys-breath", "gate-m", { x: 86, y: 38, size: "min(22vw, 5.5rem)", rot: -14, depth: 0.58, opacity: 0.82, layer: 3, float: 9, delay: 1.05 }),
  flower("white-daisy", "gate-n", { x: 74, y: 86, size: "min(26vw, 6.5rem)", rot: 12, depth: 0.44, opacity: 0.86, layer: 2, float: 8, delay: 0.75 }),
  flower("yellow-bloom-a", "gate-o", { x: -2, y: 88, size: "min(30vw, 7.5rem)", rot: -20, depth: 0.4, opacity: 0.84, layer: 2, float: 7, delay: 0.5 }),
  flower("burgundy-daisy", "gate-p", { x: 40, y: 92, size: "min(26vw, 6.5rem)", rot: 4, depth: 0.52, opacity: 0.8, layer: 2, float: 6, delay: 0.9 }),
  flower("lavender", "gate-q", { x: -6, y: 44, size: "min(30vw, 7.5rem)", rot: 16, depth: 0.36, opacity: 0.82, layer: 2, float: 5, delay: 0.3 }),
  flower("cream-daisy", "gate-r", { x: 88, y: 72, size: "min(24vw, 6rem)", rot: -10, depth: 0.5, opacity: 0.84, layer: 2, float: 7, delay: 0.65 }),
];

/** Main scroll — softer, behind content. */
export const MAIN_FLOWERS: FlowerPlace[] = [
  flower("hydrangea-pink-a", "main-a", { x: -6, y: 4, size: "min(44vw, 11rem)", rot: -10, depth: 0.15, opacity: 0.42, layer: 0, float: 5, delay: 0 }),
  flower("hydrangea-pink-b", "main-b", { x: 78, y: 8, size: "min(40vw, 10rem)", rot: 12, depth: 0.12, opacity: 0.38, layer: 0, float: 4, delay: 0.3 }),
  flower("yellow-bloom-a", "main-c", { x: 2, y: 28, size: "min(34vw, 8.5rem)", rot: -16, depth: 0.35, opacity: 0.48, layer: 1, float: 7, delay: 0.5 }),
  flower("burgundy-daisy", "main-d", { x: 84, y: 22, size: "min(30vw, 7.5rem)", rot: 18, depth: 0.4, opacity: 0.5, layer: 1, float: 6, delay: 0.2 }),
  flower("lavender", "main-e", { x: 88, y: 48, size: "min(36vw, 9rem)", rot: -12, depth: 0.28, opacity: 0.44, layer: 1, float: 8, delay: 0.8 }),
  flower("white-daisy", "main-f", { x: -4, y: 52, size: "min(28vw, 7rem)", rot: 6, depth: 0.42, opacity: 0.52, layer: 2, float: 9, delay: 0.65 }),
  flower("yellow-bloom-b", "main-g", { x: 80, y: 68, size: "min(32vw, 8rem)", rot: 14, depth: 0.38, opacity: 0.46, layer: 1, float: 5, delay: 0.4 }),
  flower("pink-cluster-mid", "main-h", { x: 6, y: 72, size: "min(38vw, 9.5rem)", rot: -8, depth: 0.22, opacity: 0.4, layer: 0, float: 6, delay: 0.9 }),
  flower("cream-daisy", "main-i", { x: 74, y: 88, size: "min(30vw, 7.5rem)", rot: -18, depth: 0.45, opacity: 0.48, layer: 2, float: 7, delay: 0.25 }),
  flower("babys-breath", "main-j", { x: 10, y: 14, size: "min(24vw, 6rem)", rot: 12, depth: 0.55, opacity: 0.45, layer: 2, float: 11, delay: 1 }),
  flower("pink-wide-bottom", "main-k", { x: -8, y: 86, size: "min(46vw, 12rem)", rot: 4, depth: 0.18, opacity: 0.36, layer: 0, float: 4, delay: 0.55 }),
  flower("mix-bottom", "main-l", { x: 72, y: 90, size: "min(42vw, 11rem)", rot: -6, depth: 0.2, opacity: 0.34, layer: 0, float: 5, delay: 0.7 }),
];

export const PRESSED_FLOWER_IDS = entries.map((e) => e.id);
