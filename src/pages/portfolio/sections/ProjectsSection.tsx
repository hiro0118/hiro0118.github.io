import { motion } from "framer-motion";
import { usePortfolioTheme } from "../ThemeContext";
import { CardFrame } from "../CardFrame";
import { ProjectsAnimation } from "../ProjectsAnimation";
import { PortfolioTheme } from "../themes/types";

interface Mission {
  id: string;
  title: string;
  description: string;
  status: "COMPLETED" | "ACTIVE";
  tags: string[];
  emoji: string;
  url?: string;
}

const MISSIONS: Mission[] = [
  {
    id: "MISSION-001",
    title: "Portfolio HUD",
    description:
      "Cinematic spaceship-HUD personal portfolio built with React, TypeScript, and Framer Motion.",
    status: "ACTIVE",
    emoji: "🚀",
    tags: ["React", "TypeScript", "Framer Motion"],
  },
  {
    id: "MISSION-002",
    title: "Tokyo Tennis Finder",
    description:
      "SPA for filtering and sorting Tokyo municipal tennis court availability from a large static dataset.",
    status: "COMPLETED",
    emoji: "🎾",
    tags: ["React", "TypeScript", "MUI v5"],
  },
  {
    id: "MISSION-003",
    title: "Data Pipeline",
    description:
      "Automated ETL pipeline for ingesting and transforming court reservation data into JSON bundles.",
    status: "COMPLETED",
    emoji: "⚙️",
    tags: ["Python", "Node.js", "JSON"],
  },
];

const tagContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const tagItem = {
  hidden: { opacity: 0, scale: 0.5, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 20 },
  },
};

function SectionHeading({
  label,
  theme,
  maxWidth = "960px",
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
        <span style={{ fontSize: "1.6rem" }}>🗒️</span>
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

function MissionCard({
  mission,
  index,
  delay,
  theme,
}: {
  mission: Mission;
  index: number;
  delay: number;
  theme: PortfolioTheme;
}) {
  const isCrossing = theme.id === "crossing";
  const isComic = theme.id === "comic";
  const statusColor =
    mission.status === "COMPLETED" ? theme.secondary : theme.accent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={theme.cardHover}
      transition={{
        duration: 0.55,
        delay,
        type: "spring",
        stiffness: 80,
        damping: 16,
      }}
      viewport={{ once: true, amount: 0.25 }}
      style={{
        ...theme.card,
        background: theme.card.background ?? theme.surface,
        borderRadius: theme.card.borderRadius ?? "4px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "default",
        height: "100%",
      }}
    >
      <CardFrame theme={theme} size={10} />

      {isComic ? (
        <>
          <div
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              padding: "1rem 1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 12,
                delay: delay + 0.2,
              }}
              viewport={{ once: true }}
              style={{ fontSize: "2rem", display: "inline-block" }}
            >
              {mission.emoji}
            </motion.span>
            <div>
              <div
                style={{
                  fontFamily: theme.fontHeading,
                  fontWeight: 400,
                  fontSize: "1.3rem",
                  color: "white",
                  textShadow: "1px 1px 0 #1a1a1a",
                  lineHeight: 1.1,
                }}
              >
                {mission.title}
              </div>
              <div
                style={{
                  display: "inline-block",
                  marginTop: "4px",
                  background:
                    mission.status === "COMPLETED" ? "#FFD700" : "#E63329",
                  color: "#1a1a1a",
                  fontFamily: theme.fontBody,
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  padding: "1px 8px",
                  border: "1.5px solid #1a1a1a",
                  boxShadow: "1px 1px 0 #1a1a1a",
                  transform: "rotate(-2deg)",
                }}
              >
                {mission.status === "COMPLETED" ? "✓ DONE" : "★ ACTIVE"}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "1rem 1.2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              flex: 1,
            }}
          >
            <p
              style={{
                fontFamily: theme.fontBody,
                fontSize: "0.95rem",
                fontWeight: 500,
                color: theme.cardText,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {mission.description}
            </p>

            <motion.div
              variants={tagContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}
            >
              {mission.tags.map((tag) => (
                <motion.span
                  key={tag}
                  variants={tagItem}
                  style={{
                    fontFamily: theme.fontBody,
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    color: "#1a1a1a",
                    background: "white",
                    border: "2px solid #1a1a1a",
                    boxShadow: "2px 2px 0 #1a1a1a",
                    padding: "2px 10px",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <button
              onClick={() => mission.url && window.open(mission.url, "_blank")}
              disabled={!mission.url}
              style={{
                alignSelf: "flex-start",
                marginTop: "auto",
                background: mission.url ? theme.accent : "#e0e0e0",
                border: "2px solid #1a1a1a",
                boxShadow: mission.url ? "3px 3px 0 #1a1a1a" : "none",
                color: "#1a1a1a",
                fontFamily: theme.fontHeading,
                fontWeight: 400,
                fontSize: "1rem",
                padding: "6px 18px",
                cursor: mission.url ? "pointer" : "not-allowed",
                transition: "all 0.1s",
                opacity: mission.url ? 1 : 0.5,
              }}
              onMouseDown={(e) => {
                if (!mission.url) return;
                (e.target as HTMLButtonElement).style.transform =
                  "translate(2px,2px)";
                (e.target as HTMLButtonElement).style.boxShadow =
                  "1px 1px 0 #1a1a1a";
              }}
              onMouseUp={(e) => {
                (e.target as HTMLButtonElement).style.transform = "none";
                (e.target as HTMLButtonElement).style.boxShadow = mission.url
                  ? "3px 3px 0 #1a1a1a"
                  : "none";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.transform = "none";
                (e.target as HTMLButtonElement).style.boxShadow = mission.url
                  ? "3px 3px 0 #1a1a1a"
                  : "none";
              }}
            >
              OPEN →
            </button>
          </div>
        </>
      ) : isCrossing ? (
        <>
          <div
            style={{
              background: `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`,
              padding: "1rem 1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 12,
                delay: delay + 0.2,
              }}
              viewport={{ once: true }}
              style={{ fontSize: "2rem", display: "inline-block" }}
            >
              {mission.emoji}
            </motion.span>
            <div>
              <div
                style={{
                  fontFamily: theme.fontHeading,
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "white",
                }}
              >
                {mission.title}
              </div>
              <div
                style={{
                  display: "inline-block",
                  marginTop: "3px",
                  background:
                    mission.status === "COMPLETED"
                      ? "rgba(255,255,255,0.3)"
                      : theme.accent,
                  color: "white",
                  fontFamily: theme.fontBody,
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  padding: "1px 8px",
                  borderRadius: "10px",
                }}
              >
                {mission.status === "COMPLETED" ? "✓ Done" : "★ Active"}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "1rem 1.2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              flex: 1,
            }}
          >
            <p
              style={{
                fontFamily: theme.fontBody,
                fontSize: "0.95rem",
                fontWeight: 500,
                color: theme.cardText,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {mission.description}
            </p>

            <motion.div
              variants={tagContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}
            >
              {mission.tags.map((tag) => (
                <motion.span
                  key={tag}
                  variants={tagItem}
                  style={{
                    fontFamily: theme.fontBody,
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    color: theme.secondary,
                    background: `${theme.secondary}18`,
                    border: `1.5px solid ${theme.secondary}55`,
                    padding: "2px 10px",
                    borderRadius: "12px",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <button
              onClick={() => mission.url && window.open(mission.url, "_blank")}
              disabled={!mission.url}
              style={{
                alignSelf: "flex-start",
                marginTop: "auto",
                background: mission.url ? theme.accent : "#ccc",
                border: "none",
                borderRadius: "20px",
                color: mission.url ? theme.text : "#888",
                fontFamily: theme.fontHeading,
                fontWeight: 800,
                fontSize: "0.85rem",
                padding: "8px 20px",
                cursor: mission.url ? "pointer" : "not-allowed",
                boxShadow: mission.url ? `0 4px 0 #c8a010` : "none",
                transition: "all 0.1s",
                opacity: mission.url ? 1 : 0.5,
              }}
              onMouseEnter={(e) => {
                if (!mission.url) return;
                (e.target as HTMLButtonElement).style.transform =
                  "translateY(2px)";
                (e.target as HTMLButtonElement).style.boxShadow =
                  "0 2px 0 #c8a010";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.transform = "none";
                (e.target as HTMLButtonElement).style.boxShadow = mission.url
                  ? "0 4px 0 #c8a010"
                  : "none";
              }}
            >
              Open →
            </button>
          </div>
        </>
      ) : (
        /* ── HUD mission card ── */
        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: theme.fontBody,
                fontSize: "0.78rem",
                color: theme.cardDim,
                letterSpacing: "0.15em",
              }}
            >
              {mission.id}
            </span>
            <motion.span
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: delay + 0.3 }}
              viewport={{ once: true }}
              style={{
                fontFamily: theme.fontBody,
                fontSize: "0.75rem",
                color: statusColor,
                border: `1px solid ${statusColor}`,
                padding: "2px 8px",
                borderRadius: "2px",
                letterSpacing: "0.1em",
              }}
            >
              {mission.status}
            </motion.span>
          </div>
          <div
            style={{
              fontFamily: theme.fontHeading,
              fontSize: "0.9rem",
              color: theme.cardText,
              letterSpacing: "0.08em",
            }}
          >
            {mission.title}
          </div>
          <div
            style={{
              fontFamily: theme.fontBody,
              fontSize: "0.88rem",
              color: theme.cardText,
              lineHeight: 1.65,
            }}
          >
            {mission.description}
          </div>
          <motion.div
            variants={tagContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
          >
            {mission.tags.map((tag) => (
              <motion.span
                key={tag}
                variants={tagItem}
                style={{
                  fontFamily: theme.fontBody,
                  fontSize: "0.78rem",
                  color: theme.primary,
                  border: `1px solid ${theme.border}`,
                  padding: "2px 8px",
                  borderRadius: "2px",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
          <button
            onClick={() => mission.url && window.open(mission.url, "_blank")}
            disabled={!mission.url}
            style={{
              alignSelf: "flex-start",
              background: "none",
              border: `1px solid ${mission.url ? theme.primary : theme.dim}`,
              color: mission.url ? theme.primary : theme.dim,
              fontFamily: theme.fontBody,
              fontSize: "0.75rem",
              padding: "6px 14px",
              cursor: mission.url ? "pointer" : "not-allowed",
              letterSpacing: "0.1em",
              borderRadius: "2px",
              opacity: mission.url ? 1 : 0.5,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!mission.url) return;
              (e.target as HTMLButtonElement).style.background =
                `${theme.primary}22`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = "none";
            }}
          >
            [ LAUNCH &gt; ]
          </button>
        </div>
      )}
    </motion.div>
  );
}

export function ProjectsSection() {
  const { theme } = usePortfolioTheme();
  const isCrossing = theme.id === "crossing";
  const isComic = theme.id === "comic";

  let sectionBg: string;
  if (isComic) sectionBg = "#E8F0FF";
  else if (isCrossing)
    sectionBg = "linear-gradient(180deg, #dff0d0 0%, #e8f5e0 100%)";
  else
    sectionBg = `linear-gradient(180deg, ${theme.bg} 0%, ${theme.surface}44 50%, ${theme.bg} 100%)`;

  return (
    <section
      id="projects"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem 4rem",
        background: sectionBg,
        transition: "background 0.5s",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <SectionHeading
          label={theme.sectionLabel("03", "Projects")}
          theme={theme}
          maxWidth="960px"
        />
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: isCrossing || isComic ? "2rem" : "1.5rem",
          maxWidth: "960px",
          width: "100%",
        }}
      >
        {MISSIONS.map((m, i) => (
          <MissionCard
            key={m.id}
            mission={m}
            index={i}
            delay={i * 0.12}
            theme={theme}
          />
        ))}
      </div>

      {/* Pulse animation */}
      <ProjectsAnimation />
    </section>
  );
}
