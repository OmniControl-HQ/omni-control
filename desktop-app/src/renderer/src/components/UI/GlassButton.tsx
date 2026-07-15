import { cx } from "../../utils/cx";

export function GlassButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx("glass-button", className)}
    >
      {children}
    </button>
  );
}
