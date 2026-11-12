import type { ReactNode } from "react";

export function ContentPlate({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`plate ${className}`.trim()}>{children}</div>;
}
