export type ThemeId = "hud" | "crossing" | "comic";

export interface PortfolioTheme {
  id: ThemeId;
  displayName: string;

  // World / page-level colors
  bg: string;
  surface: string;
  border: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string; // text on world bg
  dim: string;

  // Fonts
  fontHeading: string;
  fontBody: string;

  // Card / dialog box
  cardVariant: "corners" | "dialog";
  card: {
    background?: string;
    border: string;
    borderRadius?: string;
    boxShadow?: string;
  };
  cardText: string;
  cardDim: string;
  cardHover: { scale?: number; y?: number; boxShadow?: string };

  // Misc
  typingCursor: string;
  glowAnimation: string;
  sectionLabel: (num: string, title: string) => string;
}
