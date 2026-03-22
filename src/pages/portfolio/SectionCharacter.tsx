import { usePortfolioTheme } from "./ThemeContext";

const CHARS: Record<string, { walk: string; orbit: string; hop: string }> = {
  hud: { walk: "🤖", orbit: "👾", hop: "🚀" },
  crossing: { walk: "🐱", orbit: "🦋", hop: "🦝" },
  comic: { walk: "🦸", orbit: "💥", hop: "🏃" },
};

/** Bio section — character walks left → right across bottom of section */
export function WalkCharacter() {
  const { theme } = usePortfolioTheme();
  const char = CHARS[theme.id]?.walk ?? "✨";
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "900px",
        height: "64px",
        marginTop: "2.5rem",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          animation: "char-walk-x 14s linear infinite",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "2.2rem",
            animation: "char-bob 0.5s ease-in-out infinite",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          {char}
        </span>
      </div>
    </div>
  );
}

/** Skills section — character floats in an orbital loop near the heading */
export function OrbitCharacter() {
  const { theme } = usePortfolioTheme();
  const char = CHARS[theme.id]?.orbit ?? "✨";
  return (
    <div
      style={{
        position: "absolute",
        top: "5.5rem",
        right: "max(calc(50% - 480px), 1.5rem)",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontSize: "2.4rem",
          animation: "char-orbit 6s ease-in-out infinite",
          userSelect: "none",
          opacity: 0.8,
        }}
      >
        {char}
      </span>
    </div>
  );
}

/** Projects section — character hops in arcs left → right across bottom */
export function HopCharacter() {
  const { theme } = usePortfolioTheme();
  const char = CHARS[theme.id]?.hop ?? "✨";
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "960px",
        height: "72px",
        marginTop: "2.5rem",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          animation: "char-hop-move 10s linear infinite",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "2.2rem",
            animation: "char-hop-y 1.3s ease-in-out infinite",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          {char}
        </span>
      </div>
    </div>
  );
}
