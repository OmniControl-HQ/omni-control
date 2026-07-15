import { cx } from "../../utils/cx";

export function GlassPanel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cx("glass-panel", className)}>{children}</div>;
}
