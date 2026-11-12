import { invite } from "@/lib/invite";

export function GroomName({
  variant = "hero",
}: {
  variant?: "hero" | "compact" | "card" | "inline";
}) {
  if (variant === "compact") {
    return <span className="groom-compact">{invite.groomFull}</span>;
  }

  return <>{invite.groomFull}</>;
}
