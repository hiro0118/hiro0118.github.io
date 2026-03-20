import { PortfolioTheme } from './types';

// Newspaper design language:
// - Aged newsprint background (#F4EFE0), slightly off-white cards
// - Editorial typography: Playfair Display headings, Merriweather body
// - Dark red (#8B0000) used sparingly for headlines and accent lines only
// - Clean ruled lines instead of borders; no border radius
// - Understated, print-media aesthetic throughout

export const newspaperTheme: PortfolioTheme = {
  id: 'newspaper',
  displayName: 'THE GAZETTE',

  bg:        '#F4EFE0',  // aged newsprint
  surface:   '#FAF6EC',  // slightly off-white
  border:    '#AAAAAA',  // light grey rule
  primary:   '#8B0000',  // dark red — headlines only
  secondary: '#1a1a1a',  // deep ink black
  accent:    '#8B0000',  // same dark red
  text:      '#1a1a1a',  // ink
  dim:       '#555555',  // grey ink

  fontHeading: "'Playfair Display', serif",
  fontBody:    "'Merriweather', serif",

  cardVariant: 'dialog',
  card: {
    background:   '#FAF6EC',
    border:       '1px solid #AAAAAA',
    borderRadius: '0px',
    boxShadow:    '2px 2px 6px rgba(0,0,0,0.08)',
  },
  cardText:  '#1a1a1a',
  cardDim:   '#555555',
  cardHover: {
    y:         -2,
    boxShadow: '2px 5px 12px rgba(0,0,0,0.18)',
  },

  typingCursor:  '|',
  glowAnimation: 'none',
  sectionLabel:  (_num, title) => title,
};
