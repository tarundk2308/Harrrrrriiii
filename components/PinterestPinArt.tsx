"use client";

import { FreshFloralIllustration } from "@/components/FreshFloralIllustration";

/** Pin header art — custom pastel florals (no photo assets). */
export function PinterestPinArt() {
  return (
    <div className="pinterest-pin__media pinterest-pin__media--fresh">
      <div className="pinterest-pin__sky" aria-hidden="true" />
      <FreshFloralIllustration variant="hero" />
    </div>
  );
}
