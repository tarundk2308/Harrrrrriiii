/** Shared static backdrop: grain, dots, soft veils, corner rings — gate & main. */
export function BackdropOrnaments({ variant }: { variant: "gate" | "main" }) {
  return (
    <div className={`backdrop-ornaments backdrop-ornaments--${variant}`} aria-hidden="true">
      <div className="backdrop-ornaments__grain" />
      <div className="backdrop-ornaments__dots" />
      <div className="backdrop-ornaments__mesh">
        <span className="backdrop-ornaments__orb backdrop-ornaments__orb--1" />
        <span className="backdrop-ornaments__orb backdrop-ornaments__orb--2" />
        <span className="backdrop-ornaments__orb backdrop-ornaments__orb--3" />
        <span className="backdrop-ornaments__orb backdrop-ornaments__orb--4" />
        <span className="backdrop-ornaments__orb backdrop-ornaments__orb--5" />
      </div>
      <div className="backdrop-ornaments__veils">
        <span className="backdrop-ornaments__veil backdrop-ornaments__veil--tl" />
        <span className="backdrop-ornaments__veil backdrop-ornaments__veil--tr" />
        <span className="backdrop-ornaments__veil backdrop-ornaments__veil--bl" />
        <span className="backdrop-ornaments__veil backdrop-ornaments__veil--br" />
      </div>
      <svg className="backdrop-ornaments__frame backdrop-ornaments__frame--tl" viewBox="0 0 120 120" aria-hidden>
        <ellipse cx="12" cy="12" rx="48" ry="44" fill="none" stroke="currentColor" strokeWidth="0.85" />
        <ellipse cx="12" cy="12" rx="32" ry="30" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
      </svg>
      <svg className="backdrop-ornaments__frame backdrop-ornaments__frame--br" viewBox="0 0 120 120" aria-hidden>
        <ellipse cx="108" cy="108" rx="52" ry="48" fill="none" stroke="currentColor" strokeWidth="0.85" />
        <ellipse cx="108" cy="108" rx="34" ry="32" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
      </svg>
      <div className="backdrop-ornaments__rules">
        <span className="backdrop-ornaments__rule backdrop-ornaments__rule--top" />
        <span className="backdrop-ornaments__rule backdrop-ornaments__rule--mid" />
        <span className="backdrop-ornaments__rule backdrop-ornaments__rule--bottom" />
      </div>
      <div className="backdrop-ornaments__spark-field">
        {Array.from({ length: variant === "gate" ? 14 : 18 }, (_, i) => (
          <span key={i} className="backdrop-ornaments__pin" style={{ left: `${(i * 17 + 7) % 96}%`, top: `${(i * 23 + 11) % 94}%` }} />
        ))}
      </div>
    </div>
  );
}
