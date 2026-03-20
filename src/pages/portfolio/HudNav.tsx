import { useEffect, useState } from 'react';
import { usePortfolioTheme, THEMES } from './ThemeContext';
import { ThemeId } from './themes/types';

const NAV_ITEMS = ['HERO', 'BIO', 'PROJECTS', 'SKILLS'] as const;

const NAV_LABELS_AC: Record<string, string> = {
  HERO: 'Home', BIO: 'About', PROJECTS: 'Projects', SKILLS: 'Skills',
};
const NAV_LABELS_COMIC: Record<string, string> = {
  HERO: 'HERO!', BIO: 'ORIGIN', PROJECTS: 'MISSIONS', SKILLS: 'POWERS',
};
const NAV_LABELS_NEWS: Record<string, string> = {
  HERO: 'Front Page', BIO: 'Profile', PROJECTS: 'Reports', SKILLS: 'Expertise',
};

export function HudNav() {
  const { theme, setThemeId } = usePortfolioTheme();
  const [active, setActive] = useState<string>('HERO');
  const isCrossing  = theme.id === 'crossing';
  const isComic     = theme.id === 'comic';
  const isNewspaper = theme.id === 'newspaper';

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(id => {
      const el = document.getElementById(id.toLowerCase());
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });

  /* ── nav bar container style ── */
  let navBg: string;
  let navBorder: string;
  let navShadow: string;
  if (isComic) {
    navBg     = '#FFD700';
    navBorder = '3px solid #1a1a1a';
    navShadow = '0 3px 0 #1a1a1a';
  } else if (isNewspaper) {
    navBg     = '#F4EFE0';
    navBorder = '2px solid #1a1a1a';
    navShadow = '0 1px 0 #AAAAAA';
  } else {
    navBg     = isCrossing ? 'rgba(194,223,240,0.92)' : `${theme.bg}dd`;
    navBorder = isCrossing ? `2px solid ${theme.secondary}55` : `1px solid ${theme.border}`;
    navShadow = isCrossing ? `0 2px 12px rgba(90,158,82,0.15)` : `0 1px 12px ${theme.border}66`;
  }

  /* ── logo label ── */
  let logoText: string;
  if (isComic)     logoText = '★ HIROSHI FUJI';
  else if (isNewspaper) logoText = 'The Hiroshi Gazette';
  else if (isCrossing)  logoText = '🌿 Hiroshi Fuji';
  else             logoText = '◈ HIROSHI FUJI';

  /* ── logo style ── */
  let logoColor: string;
  let logoSize: string;
  let logoSpacing: string;
  let logoWeight: number;
  if (isComic) {
    logoColor   = '#1a1a1a';
    logoSize    = '1.1rem';
    logoSpacing = '0.03em';
    logoWeight  = 400;
  } else if (isNewspaper) {
    logoColor   = '#1a1a1a';
    logoSize    = '1rem';
    logoSpacing = '0.02em';
    logoWeight  = 700;
  } else {
    logoColor   = isCrossing ? theme.secondary : theme.primary;
    logoSize    = isCrossing ? '1rem' : '0.85rem';
    logoSpacing = isCrossing ? '0.01em' : '0.15em';
    logoWeight  = 800;
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2rem', height: '56px',
      background: navBg,
      backdropFilter: (isComic || isNewspaper) ? 'none' : 'blur(10px)',
      borderBottom: navBorder,
      boxShadow: navShadow,
      transition: 'background 0.4s, border-color 0.4s',
    }}>

      {/* Logo */}
      <span style={{
        fontFamily: theme.fontHeading,
        fontWeight: logoWeight,
        fontSize: logoSize,
        color: logoColor,
        letterSpacing: logoSpacing,
        fontStyle: isNewspaper ? 'italic' : 'normal',
        animation: theme.glowAnimation === 'none' ? undefined : theme.glowAnimation,
        userSelect: 'none',
      }}>
        {logoText}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: isComic ? '0.2rem' : isCrossing ? '0.25rem' : '0.5rem' }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item;
          let label: string;
          if (isComic)     label = NAV_LABELS_COMIC[item];
          else if (isNewspaper) label = NAV_LABELS_NEWS[item];
          else if (isCrossing)  label = NAV_LABELS_AC[item];
          else             label = `[${item}]`;

          /* ── per-theme button style ── */
          let btnBg: string;
          let btnBorder: string;
          let btnColor: string;
          let btnRadius: string;
          let btnWeight: number;
          let btnShadow: string;
          let btnPadding: string;
          let btnFontSize: string;
          let btnLetterSpacing: string;
          let btnBorderBottom: string;
          let btnTextShadow: string;

          if (isComic) {
            btnBg           = isActive ? '#1a1a1a' : 'none';
            btnBorder       = isActive ? '2px solid #1a1a1a' : '2px solid transparent';
            btnColor        = isActive ? '#FFD700' : '#1a1a1a';
            btnRadius       = '3px';
            btnWeight       = 400;
            btnShadow       = isActive ? '2px 2px 0 #555' : 'none';
            btnPadding      = '5px 14px';
            btnFontSize     = '0.95rem';
            btnLetterSpacing = '0.04em';
            btnBorderBottom = 'none';
            btnTextShadow   = 'none';
          } else if (isNewspaper) {
            btnBg           = 'none';
            btnBorder       = 'none';
            btnColor        = isActive ? '#8B0000' : '#1a1a1a';
            btnRadius       = '0';
            btnWeight       = isActive ? 700 : 400;
            btnShadow       = 'none';
            btnPadding      = '4px 12px';
            btnFontSize     = '0.82rem';
            btnLetterSpacing = '0.01em';
            btnBorderBottom = isActive ? '2px solid #8B0000' : '2px solid transparent';
            btnTextShadow   = 'none';
          } else if (isCrossing) {
            btnBg           = isActive ? theme.secondary : 'none';
            btnBorder       = 'none';
            btnColor        = isActive ? 'white' : theme.text;
            btnRadius       = '20px';
            btnWeight       = 700;
            btnShadow       = isActive ? `0 3px 0 #3a7e32` : 'none';
            btnPadding      = '5px 14px';
            btnFontSize     = '0.82rem';
            btnLetterSpacing = '0.01em';
            btnBorderBottom = 'none';
            btnTextShadow   = 'none';
          } else {
            btnBg           = 'none';
            btnBorder       = 'none';
            btnColor        = isActive ? theme.primary : theme.dim;
            btnRadius       = '0';
            btnWeight       = 400;
            btnShadow       = 'none';
            btnPadding      = '4px 10px';
            btnFontSize     = '0.75rem';
            btnLetterSpacing = '0.1em';
            btnBorderBottom = isActive ? `2px solid ${theme.primary}` : '2px solid transparent';
            btnTextShadow   = isActive ? `0 0 8px ${theme.primary}` : 'none';
          }

          return (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              style={{
                background: btnBg,
                border: btnBorder,
                borderRadius: btnRadius,
                cursor: 'pointer',
                fontFamily: theme.fontHeading,
                fontWeight: btnWeight,
                fontSize: btnFontSize,
                letterSpacing: btnLetterSpacing,
                color: btnColor,
                padding: btnPadding,
                transition: 'all 0.2s',
                textShadow: btnTextShadow,
                borderBottom: btnBorderBottom,
                boxShadow: btnShadow,
              }}
            >
              {label}
            </button>
          );
        })}

        {/* Theme selector */}
        <select
          value={theme.id}
          onChange={e => setThemeId(e.target.value as ThemeId)}
          style={{
            marginLeft: '0.75rem',
            background: isComic
              ? '#FFFFFF'
              : isNewspaper
                ? '#FAF6EC'
                : isCrossing
                  ? theme.card.background
                  : theme.surface,
            border: isComic
              ? '2px solid #1a1a1a'
              : isNewspaper
                ? '1px solid #AAAAAA'
                : isCrossing
                  ? `2px solid ${theme.secondary}`
                  : `1px solid ${theme.border}`,
            color: isComic
              ? '#1a1a1a'
              : isNewspaper
                ? '#1a1a1a'
                : isCrossing
                  ? theme.secondary
                  : theme.primary,
            fontFamily: theme.fontHeading,
            fontWeight: (isCrossing || isComic) ? 700 : 400,
            fontSize: isComic ? '0.85rem' : isCrossing ? '0.8rem' : '0.72rem',
            padding: isCrossing ? '5px 10px' : '4px 8px',
            cursor: 'pointer',
            borderRadius: isComic ? '3px' : isCrossing ? '12px' : '2px',
            outline: 'none',
            boxShadow: isComic ? '2px 2px 0 #1a1a1a' : isCrossing ? `0 3px 0 #3a7e32` : 'none',
          }}
        >
          {THEMES.map(t => (
            <option key={t.id} value={t.id}>{t.displayName}</option>
          ))}
        </select>
      </div>
    </nav>
  );
}
