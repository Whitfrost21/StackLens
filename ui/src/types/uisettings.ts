import { createContext } from "react";

export type TimeRange = "24h" | "7d" | "30d";
export type Theme = "dark" | "light";

export interface UISettings {
  defaultRange: TimeRange;
  autoRefresh: boolean;
  setDefaultRange: (range: TimeRange) => void;
  setAutoRefresh: (value: boolean) => void;
}

export const UISettingsContext = createContext<UISettings | null>(null);
