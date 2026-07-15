import { NavItem } from "../../types/global";
import { cx } from "../../utils/cx";
import { Icon } from "../UI/Icon";

export function SideNav({
  items,
  activeKey,
  onSelect,
}: {
  items: NavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  return (
    <aside className="w-64 h-full flex flex-col p-[24px] z-10 relative">
      <div className="flex items-center gap-3 mb-8">
        <img
          alt="OmniRemote Logo"
          className="w-8 h-8 rounded-full object-cover"
          src="https://lh3.googleusercontent.com/aida/AP1WRLvpzFuhqUU2oT58KrampxsQJvnjARLrr9y3S67oYA4j1FnnMmQlEThkwj7IfO5Zr49gjceIEKjQj_kXhZiF_AJ6m2JGw0feZsH64UvDPcwU3YxFUWPLN1w42QstJhiycfCIiVDVx-YuZFJ90DR2i8X42Qd8S1FJCt2LQK2P24ZUfDU-Vqi5IK3EAXdL90nP7CiVvsIe9TnaFZCnBaBtv3gGcIO4dh3Iwc2AnGsW41tCG2dXiHREQ0yJOg"
        />
        <div>
          <h1 className="text-[20px] leading-[28px] font-bold text-[#e2e2e4]">
            Omni Control
          </h1>
          <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#c4c7c7]">
            Community Server
          </p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {items.map((item) => {
          const active = item.key === activeKey;
          return (
            <a
              key={item.key}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelect(item.key);
              }}
              className={cx(
                "flex items-center gap-[16px] px-4 py-3 rounded-[1rem] group transition-colors active:scale-95 duration-150",
                active
                  ? "bg-[#454749]/50 text-[#b4b5b7] border border-white/5 hover:bg-[#333537]"
                  : "text-[#c4c7c7] hover:bg-[#333537]/50",
              )}
            >
              <Icon name={item.icon} filled={active} className="text-[24px]" />
              <span className="text-[14px] leading-[20px] tracking-[0.01em] font-medium">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
