import { useContext } from "react";
import { UISettingsContext } from "../types/uisettings";

export function useUISettings() {
  const ctx = useContext(UISettingsContext);
  if (!ctx)
    throw new Error("useUISettings must be used inside UISettingsProvider");
  return ctx;
}
