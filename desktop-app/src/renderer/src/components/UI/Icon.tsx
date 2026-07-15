import { cx } from "../../utils/cx";

export function Icon({
  name,
  filled,
  className,
}: {
  name: string;
  filled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cx("material-symbols-outlined select-none", className)}
      style={
        filled
          ? ({ fontVariationSettings: "'FILL' 1" } as React.CSSProperties)
          : undefined
      }
    >
      {name}
    </span>
  );
}
