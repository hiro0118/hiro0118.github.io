import { createContext, useContext, useState, ReactNode } from "react";
import { PortfolioTheme, ThemeId } from "./themes/types";
import { hudTheme } from "./themes/hud";
import { crossingTheme } from "./themes/crossing";
import { comicTheme } from "./themes/comic";

export const THEMES: PortfolioTheme[] = [hudTheme, crossingTheme, comicTheme];

interface ThemeCtx {
  theme: PortfolioTheme;
  setThemeId: (id: ThemeId) => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

export function PortfolioThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<PortfolioTheme>(hudTheme);

  const setThemeId = (id: ThemeId) => {
    const next = THEMES.find((t) => t.id === id);
    if (next) setTheme(next);
  };

  return <Ctx.Provider value={{ theme, setThemeId }}>{children}</Ctx.Provider>;
}

export function usePortfolioTheme(): ThemeCtx {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error(
      "usePortfolioTheme must be used within PortfolioThemeProvider",
    );
  return ctx;
}
