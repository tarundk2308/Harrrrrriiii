"use client";

const SRC = "/images/lotus-reference.png";

function smoothstep(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

export function LotusReferenceBloom({
  bloom,
  flash,
  spin,
}: {
  bloom: number;
  flash: number;
  spin: number;
  pull?: number;
}) {
  const openPhase = smoothstep(Math.min(1, bloom / 0.68));
  const zoom = smoothstep(Math.max(0, (bloom - 0.46) / 0.54));
  const flashEase = smoothstep(flash);
  const scale = 0.58 + openPhase * 0.5 + zoom * 0.88 + flashEase * 0.48;
  const lift = (1 - bloom) * 5 - zoom * 20 - flashEase * 26;

  return (
    <div
      className="lotus-ref"
      style={{
        transform: `scale(${scale}) translateY(${lift}px) rotate(${spin + flashEase * 22}deg)`,
        opacity: Math.max(0, 1 - flashEase * 0.98),
      }}
    >
      <img src={SRC} alt="" className="lotus-ref__img" width={740} height={740} decoding="async" />
    </div>
  );
}
