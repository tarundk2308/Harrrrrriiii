import Image from "next/image";

/** Tall Pinterest-style pin artwork: soft pastel top, lotus photo at bottom. */
export function PinterestPinArt() {
  return (
    <div className="pinterest-pin__media">
      <Image
        src="/images/lotus-florals.jpg"
        alt=""
        width={1024}
        height={260}
        className="pinterest-pin__photo"
        priority
      />
    </div>
  );
}
