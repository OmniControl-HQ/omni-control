import { Icon } from "./Icon";

export default function SettingRow({
  icon,
  label,
  description,
  children,
  border = true,
}: any) {
  return (
    <div
      className={`flex items-center justify-between p-5 ${border ? "border-b border-white/5" : ""}`}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60">
            <Icon name={icon} className="text-[20px]" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-[15px] text-white/90 tracking-wide">
            {label}
          </span>
          {description && (
            <span className="text-[13px] text-white/40 mt-0.5">
              {description}
            </span>
          )}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
