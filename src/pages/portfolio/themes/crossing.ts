import { PortfolioTheme } from './types';

// Animal Crossing design language:
// - The world itself is BRIGHT and soft (sky blues, grass greens, warm creams)
// - Dialog boxes are warm cream/white with thick rounded borders and a depth shadow
// - Everything is friendly, round, and cozy — no sharp edges, no dark backgrounds
// - Color palette: daytime sky, leaf green, golden bells, warm earth

export const crossingTheme: PortfolioTheme = {
  id: 'crossing',
  displayName: 'COZY CROSSING',

  // Bright game world
  bg:        '#c2dff0',   // AC daytime sky blue
  surface:   '#d8efd8',   // soft grass / meadow
  border:    '#5a9e52',   // leaf green
  primary:   '#4878c0',   // AC friendly blue
  secondary: '#5a9e52',   // leaf green
  accent:    '#f8c830',   // golden Bells / stars
  text:      '#2a2a1a',   // warm dark (readable on light bg)
  dim:       '#6a7a5a',   // muted forest green-grey

  fontHeading: "'Nunito', sans-serif",
  fontBody:    "'Nunito', sans-serif",

  // Warm cream dialog box — the signature AC UI element
  cardVariant: 'dialog',
  card: {
    background:   '#fffde4',
    border:       '4px solid #5a9e52',
    borderRadius: '20px',
    // The depth shadow is the key AC touch — card "floats" above the world
    boxShadow:    '0 6px 0 #3a7e32, 0 10px 28px rgba(58,126,50,0.18)',
  },
  cardText:  '#2a2a1a',
  cardDim:   '#6a7a5a',
  cardHover: {
    y: -4,
    boxShadow: '0 10px 0 #3a7e32, 0 16px 32px rgba(58,126,50,0.25)',
  },

  typingCursor:  '▶',
  glowAnimation: 'none',
  sectionLabel:  (num, title) => `✿  ${title}`,
};
