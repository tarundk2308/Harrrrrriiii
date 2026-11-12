const LAMPS = [0, 0.4, 0.9, 1.5, 2.1, 0.2, 1.1, 2.6, 1.8, 0.7, 2.3];

export function Horizon() {
  return (
    <div className="horizon" aria-hidden="true">
      <div className="horizon-glow" />
      <div className="horizon-line" />
      <div className="lamps">
        {LAMPS.map((delay, i) => (
          <i key={i} style={{ animationDelay: `${delay}s` }} />
        ))}
      </div>
      <div className="water">
        <span className="sheen" />
      </div>
    </div>
  );
}

const PETALS = [
  { left: "7%", delay: "-2s", duration: "18s", size: 9, drift: "26px", opacity: 0.38 },
  { left: "20%", delay: "-9s", duration: "22s", size: 7, drift: "-18px", opacity: 0.26 },
  { left: "78%", delay: "-4s", duration: "20s", size: 11, drift: "14px", opacity: 0.32 },
  { left: "88%", delay: "-12s", duration: "24s", size: 8, drift: "-24px", opacity: 0.24 },
  { left: "48%", delay: "-7s", duration: "21s", size: 6, drift: "18px", opacity: 0.2 },
  { left: "63%", delay: "-15s", duration: "19s", size: 10, drift: "-10px", opacity: 0.28 },
];

export function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((petal) => (
        <span
          key={petal.left}
          className="petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.55,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
            opacity: petal.opacity,
            ["--drift" as string]: petal.drift,
          }}
        />
      ))}
    </div>
  );
}
