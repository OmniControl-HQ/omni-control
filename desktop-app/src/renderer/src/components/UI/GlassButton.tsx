import { cx } from "../../utils/cx";

export function GlassButton({
  className,
  children,
  onClick,
  disabled,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cx("glass-button", className)}
    >
      {children}
    </button>
  );
}
