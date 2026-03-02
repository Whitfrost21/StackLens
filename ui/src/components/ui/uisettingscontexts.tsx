import { useEffect, useState } from "react";
import { UISettingsContext, type TimeRange } from "../../types/uisettings";

export function UISettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [defaultRange, setDefaultRange] = useState<TimeRange>(
    () => (localStorage.getItem("ui_default_range") as TimeRange) || "24h",
  );
  const [autoRefresh, setAutoRefresh] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("auto_refresh") === "true";
  });

  useEffect(() => {
    localStorage.setItem("ui_default_range", defaultRange);
  }, [defaultRange]);

  useEffect(() => {
    localStorage.setItem("auto_refresh", String(autoRefresh));
  }, [autoRefresh]);

  // keep state in sync if localStorage changes in another tab/window
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (!e.key) return;
      if (e.key === "auto_refresh") {
        setAutoRefresh(e.newValue === "true");
      } else if (e.key === "ui_default_range") {
        if (
          e.newValue === "24h" ||
          e.newValue === "7d" ||
          e.newValue === "30d"
        ) {
          setDefaultRange(e.newValue);
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <UISettingsContext.Provider
      value={{
        defaultRange,
        autoRefresh,
        setDefaultRange,
        setAutoRefresh,
      }}
    >
      {children}
    </UISettingsContext.Provider>
  );
}
