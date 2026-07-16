import React from "react";
import { useLocation, useOutlet } from "react-router-dom";

export function PanelFadeOutlet() {
  const location = useLocation();
  const outlet = useOutlet();
  const [displayOutlet, setDisplayOutlet] = React.useState(outlet);
  const [displayKey, setDisplayKey] = React.useState(location.key);
  const [isPanelVisible, setIsPanelVisible] = React.useState(true);

  React.useEffect(() => {
    if (location.key === displayKey) return;

    setIsPanelVisible(false);

    const t = window.setTimeout(() => {
      setDisplayOutlet(outlet);
      setDisplayKey(location.key);
      requestAnimationFrame(() => {
        setIsPanelVisible(true);
      });
    }, 140);

    return () => {
      window.clearTimeout(t);
    };
  }, [displayKey, location.key, outlet]);

  return (
    <div
      className={[
        "flex-1 min-h-0 overflow-hidden flex flex-col transition-opacity duration-150 ease-out",
        isPanelVisible ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {displayOutlet}
    </div>
  );
}

