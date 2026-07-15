import { NavItem } from "../../types/global";
import { cx } from "../../utils/cx";
import { Icon } from "../UI/Icon";
import Logo from "../../public/img/logo.png";

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
    <aside className="w-64 h-full flex flex-col p-6 z-10 relative">
      <div className="flex app-drag items-center gap-3 mb-8">
        <img
          alt="OmniRemote Logo"
          className="w-8 h-8 rounded-full object-cover"
          src={Logo}
        />
        <div>
          <h1 className="text-[20px] leading-7 font-bold text-[#e2e2e4]">
            Omni Control
          </h1>
          <p className="text-[12px] leading-4 tracking-wider font-semibold text-[#c4c7c7]">
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
                "flex items-center gap-4 px-4 py-3 rounded-2xl group transition-colors active:scale-95 duration-150 outline-none",
                active
                  ? "bg-[#454749]/20 text-[#b4b5b7] border border-white/5"
                  : "text-[#c4c7c7] hover:bg-[#454749]/10 border border-transparent",
              )}
            >
              <Icon name={item.icon} filled={active} className="text-[24px]" />
              <span className="text-[14px] leading-5 tracking-[0.01em] font-medium">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
