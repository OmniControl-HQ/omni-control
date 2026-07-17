import React from "react";
import { cx } from "../../utils/cx";

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function Switch({
  checked,
  defaultChecked,
  onChange,
  className,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked || false,
  );

  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setInternalChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label
      className={cx(
        "relative inline-flex items-center cursor-pointer",
        className,
      )}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={handleChange}
      />
      <div
        className={cx(
          "w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer transition-colors",
          "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/70 after:rounded-full after:h-4 after:w-4 after:transition-transform",
          "peer-checked:bg-white/20 peer-checked:after:bg-white peer-checked:after:translate-x-[20px]",
        )}
      ></div>
    </label>
  );
}
