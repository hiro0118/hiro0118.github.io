import { PortfolioTheme } from "./themes/types";

export function SectionHeading({
  label,
  theme,
  maxWidth = "900px",
  emoji = "🌿",
}: {
  label: string;
  theme: PortfolioTheme;
  maxWidth?: string;
  emoji?: string;
}) {
  if (theme.id === "comic") {
    return (
      <div style={{ width: "100%", maxWidth, marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-block",
            background: theme.accent,
            border: `3px solid ${theme.border}`,
            boxShadow: `4px 4px 0 ${theme.border}`,
            padding: "0.4rem 1.2rem",
          }}
        >
          <span
            style={{
              fontFamily: theme.fontHeading,
              fontWeight: 400,
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              color: theme.primary,
              letterSpacing: "0.04em",
            }}
          >
            {label}
          </span>
        </div>
      </div>
    );
  }

  if (theme.id === "crossing") {
    return (
      <div
        style={{
          width: "100%",
          maxWidth,
          marginBottom: "2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
        }}
      >
        <span style={{ fontSize: "1.6rem" }}>{emoji}</span>
        <span
          style={{
            fontFamily: theme.fontHeading,
            fontWeight: 800,
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            color: theme.text,
          }}
        >
          {label.replace("✿  ", "")}
        </span>
        <div
          style={{
            flex: 1,
            height: "3px",
            background: `${theme.secondary}55`,
            borderRadius: "2px",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: theme.fontHeading,
        fontSize: "clamp(1rem, 2vw, 1.2rem)",
        color: theme.primary,
        letterSpacing: "0.2em",
        marginBottom: "3rem",
        borderBottom: `1px solid ${theme.border}`,
        paddingBottom: "0.5rem",
        width: "100%",
        maxWidth,
      }}
    >
      {label}
    </div>
  );
}
