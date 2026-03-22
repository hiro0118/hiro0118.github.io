import { PortfolioTheme } from "./types";

export const hudTheme: PortfolioTheme = {
  id: "hud",
  displayName: "SPACESHIP HUD",

  bg: "#050810",
  surface: "#0a1628",
  border: "#0d4f6e",
  primary: "#00d4ff",
  secondary: "#00ff88",
  accent: "#ffaa00",
  text: "#cce8ff",
  dim: "#6fb8d4",

  fontHeading: "'Orbitron', sans-serif",
  fontBody: "'Exo 2', sans-serif",

  cardVariant: "corners",
  card: { border: "1px solid #0d4f6e" },
  cardText: "#cce8ff",
  cardDim: "#6fb8d4",
  cardHover: { scale: 1.02, boxShadow: "0 0 24px rgba(0,212,255,0.2)" },

  typingCursor: "█",
  glowAnimation: "glow-pulse 3s ease-in-out infinite",
  sectionLabel: (num, title) => `[ // ${num} — ${title} ]`,
};
