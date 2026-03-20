import { PortfolioTheme } from './types';

// American Comic Book design language:
// - Bright, punchy colors — red, blue, yellow on white
// - Hard black outlines everywhere, no soft shadows
// - Bangers font for headings, Comic Neue for body
// - Ben-Day halftone dots, action-lines sunburst, speech bubbles
// - Every shadow is hard (no blur): 5px 5px 0 #1a1a1a
// - Tags and buttons are chunky, bold, with thick black borders

export const comicTheme: PortfolioTheme = {
  id: 'comic',
  displayName: 'COMIC BOOK',

  bg:        '#FFF5A0',  // bright action-yellow
  surface:   '#FFFFFF',  // crisp white panels
  border:    '#1a1a1a',  // thick black ink
  primary:   '#E63329',  // superhero red
  secondary: '#1565C0',  // classic comic blue
  accent:    '#FFD700',  // golden yellow
  text:      '#1a1a1a',  // ink black
  dim:       '#555555',  // grey ink

  fontHeading: "'Bangers', cursive",
  fontBody:    "'Comic Neue', cursive",

  cardVariant: 'dialog',
  card: {
    background:   '#FFFFFF',
    border:       '3px solid #1a1a1a',
    borderRadius: '3px',
    boxShadow:    '5px 5px 0 #1a1a1a',
  },
  cardText:  '#1a1a1a',
  cardDim:   '#555555',
  cardHover: {
    y:         -3,
    boxShadow: '8px 8px 0 #1a1a1a',
  },

  typingCursor:  '_',
  glowAnimation: 'none',
  sectionLabel:  (_num, title) => title.toUpperCase(),
};
