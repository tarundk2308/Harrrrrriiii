import manifest from "@/lib/pressed-flowers.manifest.json";

type ManifestEntry = { id: string; src: string; w: number; h: number };

const entries = manifest as ManifestEntry[];
const srcById = Object.fromEntries(entries.map((m) => [m.id, m.src]));

export type FlowerPlace = {
  id: string;
  src: string;
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

function flower(id: string, layout: Omit<FlowerPlace, "id" | "src">): FlowerPlace {
  return {
    id,
    src: srcById[id] ?? `/images/flowers/${id}.png`,
    ...layout,
  };
}

/** Gate — kept to the sides so the lotus stays clear. */
export const GATE_FLOWERS: FlowerPlace[] = [
  flower("hydrangea-pink-a", {
    x: -4,
    y: 2,
    size: "min(40vw, 10.5rem)",
    rot: -12,
    depth: 0.25,
    opacity: 0.88,
    layer: 1,
    float: 6,
    delay: 0,
  }),
  flower("hydrangea-pink-b", {
    x: 72,
    y: 1,
    size: "min(38vw, 10rem)",
    rot: 14,
    depth: 0.2,
    opacity: 0.85,
    layer: 1,
    float: 5,
    delay: 0.4,
  }),
  flower("yellow-bloom-a", {
    x: -2,
    y: 38,
    size: "min(32vw, 8rem)",
    rot: -18,
    depth: 0.45,
    opacity: 0.9,
    layer: 2,
    float: 8,
    delay: 0.2,
  }),
  flower("burgundy-daisy", {
    x: 78,
    y: 32,
    size: "min(28vw, 7rem)",
    rot: 22,
    depth: 0.5,
    opacity: 0.92,
    layer: 2,
    float: 7,
    delay: 0.65,
  }),
  flower("white-daisy", {
    x: 6,
    y: 68,
    size: "min(26vw, 6.5rem)",
    rot: -8,
    depth: 0.55,
    opacity: 0.88,
    layer: 2,
    float: 5,
    delay: 0.9,
  }),
  flower("yellow-bloom-b", {
    x: 76,
    y: 58,
    size: "min(30vw, 7.5rem)",
    rot: 16,
    depth: 0.4,
    opacity: 0.9,
    layer: 2,
    float: 6,
    delay: 0.35,
  }),
  flower("lavender", {
    x: 82,
    y: 72,
    size: "min(34vw, 8.5rem)",
    rot: -14,
    depth: 0.35,
    opacity: 0.82,
    layer: 1,
    float: 4,
    delay: 1.1,
  }),
  flower("babys-breath", {
    x: 4,
    y: 20,
    size: "min(22vw, 5.5rem)",
    rot: 10,
    depth: 0.65,
    opacity: 0.78,
    layer: 3,
    float: 10,
    delay: 0.55,
  }),
  flower("cream-daisy", {
    x: 70,
    y: 80,
    size: "min(28vw, 7rem)",
    rot: -20,
    depth: 0.48,
    opacity: 0.86,
    layer: 2,
    float: 7,
    delay: 0.75,
  }),
  flower("pink-cluster-mid", {
    x: -3,
    y: 78,
    size: "min(36vw, 9rem)",
    rot: 8,
    depth: 0.3,
    opacity: 0.84,
    layer: 1,
    float: 5,
    delay: 0.15,
  }),
];

/** Main scroll — wider scatter, lower behind copy. */
export const MAIN_FLOWERS: FlowerPlace[] = [
  flower("hydrangea-pink-a", {
    x: -6,
    y: 4,
    size: "min(44vw, 11rem)",
    rot: -10,
    depth: 0.15,
    opacity: 0.42,
    layer: 0,
    float: 5,
    delay: 0,
  }),
  flower("hydrangea-pink-b", {
    x: 78,
    y: 8,
    size: "min(40vw, 10rem)",
    rot: 12,
    depth: 0.12,
    opacity: 0.38,
    layer: 0,
    float: 4,
    delay: 0.3,
  }),
  flower("yellow-bloom-a", {
    x: 2,
    y: 28,
    size: "min(34vw, 8.5rem)",
    rot: -16,
    depth: 0.35,
    opacity: 0.48,
    layer: 1,
    float: 7,
    delay: 0.5,
  }),
  flower("burgundy-daisy", {
    x: 84,
    y: 22,
    size: "min(30vw, 7.5rem)",
    rot: 18,
    depth: 0.4,
    opacity: 0.5,
    layer: 1,
    float: 6,
    delay: 0.2,
  }),
  flower("lavender", {
    x: 88,
    y: 48,
    size: "min(36vw, 9rem)",
    rot: -12,
    depth: 0.28,
    opacity: 0.44,
    layer: 1,
    float: 8,
    delay: 0.8,
  }),
  flower("white-daisy", {
    x: -4,
    y: 52,
    size: "min(28vw, 7rem)",
    rot: 6,
    depth: 0.42,
    opacity: 0.52,
    layer: 2,
    float: 9,
    delay: 0.65,
  }),
  flower("yellow-bloom-b", {
    x: 80,
    y: 68,
    size: "min(32vw, 8rem)",
    rot: 14,
    depth: 0.38,
    opacity: 0.46,
    layer: 1,
    float: 5,
    delay: 0.4,
  }),
  flower("pink-cluster-mid", {
    x: 6,
    y: 72,
    size: "min(38vw, 9.5rem)",
    rot: -8,
    depth: 0.22,
    opacity: 0.4,
    layer: 0,
    float: 6,
    delay: 0.9,
  }),
  flower("cream-daisy", {
    x: 74,
    y: 88,
    size: "min(30vw, 7.5rem)",
    rot: -18,
    depth: 0.45,
    opacity: 0.48,
    layer: 2,
    float: 7,
    delay: 0.25,
  }),
  flower("babys-breath", {
    x: 10,
    y: 14,
    size: "min(24vw, 6rem)",
    rot: 12,
    depth: 0.55,
    opacity: 0.45,
    layer: 2,
    float: 11,
    delay: 1,
  }),
  flower("pink-wide-bottom", {
    x: -8,
    y: 86,
    size: "min(46vw, 12rem)",
    rot: 4,
    depth: 0.18,
    opacity: 0.36,
    layer: 0,
    float: 4,
    delay: 0.55,
  }),
  flower("mix-bottom", {
    x: 72,
    y: 90,
    size: "min(42vw, 11rem)",
    rot: -6,
    depth: 0.2,
    opacity: 0.34,
    layer: 0,
    float: 5,
    delay: 0.7,
  }),
];

export const PRESSED_FLOWER_IDS = entries.map((e) => e.id);
