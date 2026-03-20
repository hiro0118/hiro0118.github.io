import { PortfolioTheme } from './themes/types';

interface Props {
  theme: PortfolioTheme;
  size?: number;
}

/** Renders HUD-style corner brackets. Renders nothing for pixel-variant themes. */
export function CardFrame({ theme, size = 12 }: Props) {
  if (theme.cardVariant !== 'corners') return null;

  return (
    <>
      {[
        { top: -1, left:  -1, borderTop:    `2px solid ${theme.primary}`, borderLeft:   `2px solid ${theme.primary}` },
        { top: -1, right: -1, borderTop:    `2px solid ${theme.primary}`, borderRight:  `2px solid ${theme.primary}` },
        { bottom: -1, left:  -1, borderBottom: `2px solid ${theme.primary}`, borderLeft:   `2px solid ${theme.primary}` },
        { bottom: -1, right: -1, borderBottom: `2px solid ${theme.primary}`, borderRight:  `2px solid ${theme.primary}` },
      ].map((style, i) => (
        <div key={i} style={{ position: 'absolute', width: `${size}px`, height: `${size}px`, ...style }} />
      ))}
    </>
  );
}
