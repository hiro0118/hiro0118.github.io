import { usePortfolioTheme } from "./ThemeContext";

/**
 * Section 4 (Projects) ambient animation — expanding pulse rings, styled per theme:
 *  HUD     → sharp cyan sonar rings, anchored bottom-right
 *  Crossing → soft green ripples, centered
 *  Comic    → bold red rotated-square burst, centered
 */
export function ProjectsAnimation() {
  const { theme } = usePortfolioTheme();

  const isHud = theme.id === "hud";
  const isCrossing = theme.id === "crossing";
  const isComic = theme.id === "comic";

  const config = isHud
    ? {
        color: "rgba(0,212,255,",
        size: 70,
        left: "82%",
        top: "65%",
        dur: 2.8,
        count: 3,
        sq: false,
      }
    : isCrossing
      ? {
          color: "rgba(90,158,82,",
          size: 90,
          left: "50%",
          top: "55%",
          dur: 4.2,
          count: 4,
          sq: false,
        }
      : {
          color: "rgba(230,51,41,",
          size: 80,
          left: "50%",
          top: "50%",
          dur: 2.2,
          count: 4,
          sq: true,
        };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {Array.from({ length: config.count }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: config.left,
            top: config.top,
            width: `${config.size}px`,
            height: `${config.size}px`,
            border: `${isComic ? 3 : 1.5}px solid ${config.color}0.75)`,
            borderRadius: config.sq ? "8%" : "50%",
            animation: `${config.sq ? "pulse-ring-sq" : "pulse-ring"} ${config.dur}s ease-out ${
              i * (config.dur / config.count)
            }s infinite`,
          }}
        />
      ))}
    </div>
  );
}
