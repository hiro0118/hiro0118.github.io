import { motion } from "framer-motion";
import { usePortfolioTheme } from "../ThemeContext";
import { CardFrame } from "../CardFrame";
import { FloatCharacter } from "../SectionCharacter";
import { PortfolioTheme } from "../themes/types";

const DOSSIER = [
  { label: "Name", value: "Hiroshi Fuji", icon: "🏷️" },
  { label: "Role", value: "Software Engineer", icon: "💼" },
  { label: "Location", value: "Tokyo, Japan", icon: "🗾" },
  { label: "Clearance", value: "████████ (LEVEL 7)", icon: "🔒" },
];

const SKILL_METERS = [
  { label: "Frontend Dev", pct: 90 },
  { label: "Backend Dev", pct: 80 },
  { label: "Architecture", pct: 75 },
  { label: "DevOps", pct: 65 },
];

function StatBar({
  label,
  pct,
  theme,
}: {
  label: string;
  pct: number;
  theme: PortfolioTheme;
}) {
  const isCrossing = theme.id === "crossing";
  const isComic = theme.id === "comic";

  /* ── Comic chunky bar ── */
  if (isComic) {
    const barColor =
      pct >= 85 ? theme.primary : pct >= 75 ? theme.accent : theme.secondary;
    return (
      <div style={{ marginBottom: "0.85rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: theme.fontBody,
            fontWeight: 700,
            fontSize: "0.9rem",
            color: theme.cardText,
            marginBottom: "4px",
          }}
        >
          <span>{label.toUpperCase()}</span>
          <span style={{ color: barColor }}>{pct}%</span>
        </div>
        <div
          style={{
            width: "100%",
            height: "18px",
            border: "2px solid #1a1a1a",
            background: "#e0e0e0",
            position: "relative",
            boxShadow: "2px 2px 0 #1a1a1a",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: barColor,
              borderRight: pct < 100 ? "2px solid #1a1a1a" : "none",
            }}
          />
        </div>
      </div>
    );
  }

  /* ── Animal Crossing hearts ── */
  if (isCrossing) {
    const total = 10;
    const filled = Math.round(pct / 10);
    return (
      <div style={{ marginBottom: "0.75rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: theme.fontBody,
            fontWeight: 600,
            fontSize: "0.9rem",
            color: theme.cardDim,
            marginBottom: "3px",
          }}
        >
          <span>{label}</span>
        </div>
        <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: "1.1rem",
                opacity: i < filled ? 1 : 0.2,
                filter: i < filled ? "none" : "grayscale(1)",
              }}
            >
              ♥
            </span>
          ))}
        </div>
      </div>
    );
  }

  /* ── HUD block bar ── */
  return (
    <div style={{ marginBottom: "0.6rem" }}>
      <div
        style={{
          fontFamily: theme.fontBody,
          fontSize: "0.78rem",
          color: theme.cardDim,
          marginBottom: "2px",
          letterSpacing: "0.05em",
        }}
      >
        {label.toUpperCase()}
      </div>
      <div
        style={{
          fontFamily: theme.fontBody,
          fontSize: "0.85rem",
          color: theme.secondary,
          letterSpacing: "2px",
        }}
      >
        [{"█".repeat(Math.round(pct / 10))}
        {"░".repeat(10 - Math.round(pct / 10))}] {pct}%
      </div>
    </div>
  );
}

function SectionHeading({
  label,
  theme,
  maxWidth = "900px",
}: {
  label: string;
  theme: PortfolioTheme;
  maxWidth?: string;
}) {
  if (theme.id === "comic") {
    return (
      <div style={{ width: "100%", maxWidth, marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-block",
            background: theme.accent,
            border: "3px solid #1a1a1a",
            boxShadow: "4px 4px 0 #1a1a1a",
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
        <span style={{ fontSize: "1.6rem" }}>🌿</span>
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

export function BioSection() {
  const { theme } = usePortfolioTheme();
  const isCrossing = theme.id === "crossing";
  const isComic = theme.id === "comic";

  let sectionBg: string;
  if (isComic) sectionBg = "#FFFFFF";
  else if (isCrossing)
    sectionBg = "linear-gradient(180deg, #d4ecc4 0%, #dff0d0 100%)";
  else sectionBg = theme.bg;

  return (
    <section
      id="bio"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem 4rem",
        overflow: "hidden",
        background: sectionBg,
        transition: "background 0.5s",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "900px",
        }}
      >
        <SectionHeading
          label={theme.sectionLabel("01", "About Me")}
          theme={theme}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          maxWidth: "900px",
          width: "100%",
          flexWrap: "wrap",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          style={{
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          {isComic ? (
            <>
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  background: theme.accent,
                  position: "relative",
                  overflow: "hidden",
                  border: "4px solid #1a1a1a",
                  boxShadow: "5px 5px 0 #1a1a1a",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `radial-gradient(circle, #E6332930 1.5px, transparent 1.5px)`,
                    backgroundSize: "14px 14px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "4.5rem",
                    lineHeight: 1,
                  }}
                >
                  ★
                </div>
              </div>
              <div
                style={{
                  fontFamily: theme.fontHeading,
                  fontWeight: 400,
                  fontSize: "1rem",
                  background: theme.primary,
                  color: "white",
                  border: "2px solid #1a1a1a",
                  boxShadow: "2px 2px 0 #1a1a1a",
                  padding: "2px 12px",
                  letterSpacing: "0.04em",
                }}
              >
                HERO PROFILE
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  background: theme.surface,
                  position: "relative",
                  overflow: "hidden",
                  ...(isCrossing
                    ? {
                        borderRadius: "50%",
                        border: `4px solid ${theme.secondary}`,
                        boxShadow: `0 5px 0 #3a7e32, 0 8px 20px rgba(90,158,76,0.2)`,
                      }
                    : {
                        clipPath:
                          "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                        border: `2px solid ${theme.border}`,
                      }),
                }}
              >
                {isCrossing ? (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `radial-gradient(circle at 40% 35%, ${theme.accent}88, transparent 50%),
                                   radial-gradient(circle at 70% 70%, ${theme.secondary}55, transparent 50%)`,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `radial-gradient(circle, ${theme.secondary}30 1px, transparent 1px)`,
                        backgroundSize: "18px 18px",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "4rem",
                        lineHeight: 1,
                      }}
                    >
                      🏡
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `conic-gradient(from 0deg, transparent, ${theme.primary}22 60deg, transparent 90deg)`,
                        animation: "radar-sweep 3s linear infinite",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `repeating-linear-gradient(0deg, ${theme.border}22 0px, transparent 1px, transparent 30px),
                                        repeating-linear-gradient(90deg, ${theme.border}22 0px, transparent 1px, transparent 30px)`,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "8px",
                        height: "8px",
                        background: theme.primary,
                        borderRadius: "50%",
                        transform: "translate(-50%,-50%)",
                        boxShadow: `0 0 12px ${theme.primary}`,
                      }}
                    />
                  </>
                )}
              </div>
              <div
                style={{
                  fontFamily: theme.fontBody,
                  fontWeight: 600,
                  fontSize: isCrossing ? "0.85rem" : "0.75rem",
                  color: isCrossing ? theme.secondary : theme.dim,
                  letterSpacing: isCrossing ? "0.02em" : "0.15em",
                }}
              >
                {isCrossing ? "🌟 Island Resident" : "◈ RADAR ACTIVE"}
              </div>
            </>
          )}
        </motion.div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.4 }}
          style={{
            flex: "1 1 300px",
            ...theme.card,
            background: theme.card.background ?? theme.surface,
            borderRadius: theme.card.borderRadius ?? "4px",
            padding: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <CardFrame theme={theme} />

          {/* Card header */}
          {isComic ? (
            <div
              style={{
                background: theme.primary,
                padding: "0.8rem 1.4rem",
                borderBottom: "3px solid #1a1a1a",
              }}
            >
              <div
                style={{
                  fontFamily: theme.fontHeading,
                  fontWeight: 400,
                  fontSize: "1.3rem",
                  color: "white",
                  letterSpacing: "0.04em",
                  textShadow: "1px 1px 0 #1a1a1a",
                }}
              >
                ORIGIN STORY
              </div>
            </div>
          ) : (
            <div
              style={{
                background: isCrossing ? theme.secondary : "transparent",
                padding: isCrossing ? "0.7rem 1.4rem" : "1.2rem 1.4rem 0.5rem",
                borderBottom: isCrossing ? "none" : `1px solid ${theme.border}`,
              }}
            >
              <div
                style={{
                  fontFamily: theme.fontHeading,
                  fontWeight: 800,
                  fontSize: isCrossing ? "1rem" : "0.7rem",
                  color: isCrossing ? "white" : theme.primary,
                  letterSpacing: isCrossing ? "0.02em" : "0.2em",
                }}
              >
                {isCrossing ? "🪪  Resident Info" : "PERSONNEL FILE"}
              </div>
            </div>
          )}

          <div style={{ padding: "1.2rem 1.4rem 0.5rem" }}>
            {DOSSIER.map(({ label, value, icon }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  marginBottom: "0.6rem",
                  fontFamily: theme.fontBody,
                  fontSize: isComic
                    ? "0.95rem"
                    : isCrossing
                      ? "0.95rem"
                      : "0.88rem",
                  fontWeight: isCrossing ? 500 : 400,
                  alignItems: "baseline",
                }}
              >
                {isCrossing && <span style={{ fontSize: "1rem" }}>{icon}</span>}
                <span
                  style={{
                    color: theme.cardDim,
                    minWidth: isCrossing ? "90px" : "120px",
                  }}
                >
                  {isComic
                    ? `${label.toUpperCase()}:`
                    : isCrossing
                      ? label
                      : `${label.toUpperCase().padEnd(10)} :`}
                </span>
                <span
                  style={{
                    color: theme.cardText,
                    fontWeight: isComic ? 700 : 400,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ padding: "0.25rem 1.4rem 1.4rem" }}>
            <div
              style={{
                fontFamily: theme.fontHeading,
                fontWeight: 800,
                fontSize: isComic ? "1rem" : isCrossing ? "0.9rem" : "0.75rem",
                color: isComic
                  ? theme.primary
                  : isCrossing
                    ? theme.secondary
                    : theme.primary,
                marginBottom: "0.75rem",
                letterSpacing: isComic
                  ? "0.04em"
                  : isCrossing
                    ? "0.02em"
                    : "0.15em",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              {isComic
                ? "SKILL LEVELS"
                : isCrossing
                  ? "⭐ Skill Levels"
                  : "SKILL LEVELS"}
            </div>
            {SKILL_METERS.map((m) => (
              <StatBar key={m.label} theme={theme} {...m} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating shapes */}
      <FloatCharacter />
    </section>
  );
}
