import { useEffect } from "react";
import { PortfolioThemeProvider, usePortfolioTheme } from "./ThemeContext";
import { HudNav } from "./HudNav";
import { HeroSection } from "./sections/HeroSection";
import { BioSection } from "./sections/BioSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";

function PortfolioInner() {
  const { theme } = usePortfolioTheme();

  useEffect(() => {
    document.body.style.backgroundColor = theme.bg;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [theme.bg]);

  return (
    <div style={{ background: theme.bg, minHeight: "100vh" }}>
      <HudNav />
      <HeroSection />
      <BioSection />
      <SkillsSection />
      <ProjectsSection />
    </div>
  );
}

export function PortfolioPage() {
  return (
    <PortfolioThemeProvider>
      <PortfolioInner />
    </PortfolioThemeProvider>
  );
}
