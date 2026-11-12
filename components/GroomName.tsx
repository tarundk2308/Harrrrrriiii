import { invite } from "@/lib/invite";

export function GroomName({
  variant = "hero",
}: {
  variant?: "hero" | "compact" | "card" | "inline";
}) {
  if (variant === "inline") {
    return (
      <>
        {invite.groom} aka {invite.groomAlias}
      </>
    );
  }

  if (variant === "compact") {
    return (
      <span className="groom-compact">
        {invite.groom}
        <span className="groom-alias-inline"> aka {invite.groomAlias}</span>
      </span>
    );
  }

  if (variant === "card") {
    return (
      <>
        {invite.groom}
        <span className="groom-alias-card">aka {invite.groomAlias}</span>
      </>
    );
  }

  return (
    <>
      {invite.groom}
      <span className="groom-alias">aka {invite.groomAlias}</span>
    </>
  );
}
