import { cx } from "../../utils/cx";

export function MetricBar({
  label,
  valueLabel,
  percent,
  barClassName,
}: {
  label: string;
  valueLabel: string;
  percent: number;
  barClassName: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
        <span className="text-[#c4c7c7]">{label}</span>
        <span className="text-[#e2e2e4] font-bold">{valueLabel}</span>
      </div>
      <div className="h-1.5 w-full bg-[#1e2021]/50 border border-white/5 rounded-full overflow-hidden">
        <div
          className={cx("h-full rounded-full", barClassName)}
          style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
        />
      </div>
    </div>
  );
}
