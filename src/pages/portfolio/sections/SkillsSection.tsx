import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { usePortfolioTheme, useThemeVariant } from "../ThemeContext";
import { CardFrame } from "../CardFrame";
import { SkillsAnimation } from "../SkillsAnimation";
import { SectionHeading } from "../SectionHeading";
import { tagContainer, tagItem } from "../animations";
import { PortfolioTheme } from "../themes/types";

interface SkillGroup {
  category: string;
  skills: string[];
  power: number;
  emoji: string;
  acColor: string;
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "FRONTEND",
    skills: ["React", "TypeScript", "HTML/CSS", "Material-UI", "Framer Motion"],
    power: 90,
    emoji: "🎨",
    acColor: "#7bc8f0",
  },
  {
    category: "BACKEND",
    skills: ["Node.js", "Python", "REST APIs", "PostgreSQL", "Redis"],
    power: 80,
    emoji: "⚙️",
    acColor: "#f0a870",
  },
  {
    category: "TOOLS & OPS",
    skills: ["Git", "GitHub Actions", "Docker", "AWS", "Linux"],
    power: 75,
    emoji: "🛠️",
    acColor: "#90d878",
  },
];

function ComicSkillCard({
  group,
  delay,
  theme,
}: {
  group: SkillGroup;
  delay: number;
  theme: PortfolioTheme;
}) {
  return (
    <>
      <div
        style={{
          background: group.acColor,
          padding: "0.9rem 1.2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          borderBottom: `2px solid ${theme.border}`,
        }}
      >
        <motion.span
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 12,
            delay: delay + 0.15,
          }}
          viewport={{ once: true }}
          style={{ fontSize: "1.8rem", display: "inline-block" }}
        >
          {group.emoji}
        </motion.span>
        <span
          style={{
            fontFamily: theme.fontHeading,
            fontWeight: 400,
            fontSize: "1.4rem",
            color: theme.text,
            textShadow: "1px 1px 0 rgba(255,255,255,0.4)",
            letterSpacing: "0.04em",
          }}
        >
          {group.category}
        </span>
      </div>

      <div style={{ padding: "1rem 1.2rem 1.2rem" }}>
        <motion.div
          variants={tagContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
            marginBottom: "1rem",
          }}
        >
          {group.skills.map((skill) => (
            <motion.span
              key={skill}
              variants={tagItem}
              style={{
                fontFamily: theme.fontBody,
                fontWeight: 700,
                fontSize: "0.82rem",
                color: theme.text,
                background: "white",
                border: `2px solid ${theme.border}`,
                boxShadow: `2px 2px 0 ${theme.border}`,
                padding: "2px 10px",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        <div>
          <div
            style={{
              fontFamily: theme.fontBody,
              fontWeight: 700,
              fontSize: "0.8rem",
              color: theme.cardDim,
              marginBottom: "6px",
              textTransform: "uppercase",
            }}
          >
            Power Level
          </div>
          <div
            style={{
              width: "100%",
              height: "18px",
              border: `2px solid ${theme.border}`,
              background: "#e0e0e0",
              position: "relative",
              boxShadow: `2px 2px 0 ${theme.border}`,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: `${group.power}%` }}
              transition={{
                duration: 1.0,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.4,
              }}
              viewport={{ once: true, amount: 0.8 }}
              style={{
                height: "100%",
                background: group.acColor,
                borderRight:
                  group.power < 100 ? `2px solid ${theme.border}` : "none",
              }}
            />
          </div>
          <div
            style={{
              fontFamily: theme.fontBody,
              fontWeight: 700,
              fontSize: "0.78rem",
              color: theme.text,
              marginTop: "4px",
              textAlign: "right",
            }}
          >
            {group.power}%
          </div>
        </div>
      </div>
    </>
  );
}

function CrossingSkillCard({
  group,
  delay,
  theme,
}: {
  group: SkillGroup;
  delay: number;
  theme: PortfolioTheme;
}) {
  const filled = Math.round(group.power / 10);

  return (
    <>
      <div
        style={{
          background: group.acColor,
          padding: "1rem 1.2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <motion.span
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 12,
            delay: delay + 0.15,
          }}
          viewport={{ once: true }}
          style={{ fontSize: "1.8rem", display: "inline-block" }}
        >
          {group.emoji}
        </motion.span>
        <span
          style={{
            fontFamily: theme.fontHeading,
            fontWeight: 800,
            fontSize: "1rem",
            color: "white",
            textShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        >
          {group.category}
        </span>
      </div>

      <div style={{ padding: "1rem 1.2rem 1.2rem" }}>
        <motion.div
          variants={tagContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
            marginBottom: "1rem",
          }}
        >
          {group.skills.map((skill) => (
            <motion.span
              key={skill}
              variants={tagItem}
              style={{
                fontFamily: theme.fontBody,
                fontWeight: 600,
                fontSize: "0.82rem",
                color: theme.cardText,
                background: `${group.acColor}40`,
                border: `1.5px solid ${group.acColor}`,
                padding: "3px 10px",
                borderRadius: "12px",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        <div>
          <div
            style={{
              fontFamily: theme.fontBody,
              fontWeight: 600,
              fontSize: "0.8rem",
              color: theme.cardDim,
              marginBottom: "4px",
            }}
          >
            Proficiency
          </div>
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            {Array.from({ length: 5 }).map((_, i) => {
              const isFilled = i < Math.round(filled / 2);
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{
                    opacity: isFilled ? 1 : 0.2,
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 12,
                    delay: 0.3 + i * 0.1,
                  }}
                  viewport={{ once: true }}
                  style={{
                    fontSize: "1.2rem",
                    display: "inline-block",
                    filter: isFilled ? "none" : "grayscale(1)",
                  }}
                >
                  ⭐
                </motion.span>
              );
            })}
            <span
              style={{
                fontFamily: theme.fontBody,
                fontWeight: 700,
                fontSize: "0.8rem",
                color: theme.cardDim,
                marginLeft: "4px",
              }}
            >
              {group.power}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function HudSkillCard({
  group,
  delay,
  theme,
  hudCount,
}: {
  group: SkillGroup;
  delay: number;
  theme: PortfolioTheme;
  hudCount: number;
}) {
  return (
    <div style={{ padding: "1.5rem" }}>
      <div
        style={{
          fontFamily: theme.fontHeading,
          fontSize: "0.8rem",
          color: theme.primary,
          letterSpacing: "0.2em",
          marginBottom: "1rem",
          borderBottom: `1px solid ${theme.border}`,
          paddingBottom: "0.5rem",
        }}
      >
        {group.category}
      </div>
      <motion.div
        variants={tagContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginBottom: "1.2rem",
        }}
      >
        {group.skills.map((skill) => (
          <motion.span
            key={skill}
            variants={tagItem}
            style={{
              fontFamily: theme.fontBody,
              fontSize: "0.82rem",
              color: theme.cardText,
              letterSpacing: "0.05em",
            }}
          >
            ◆ {skill}
          </motion.span>
        ))}
      </motion.div>
      <div
        style={{
          fontFamily: theme.fontBody,
          fontSize: "0.75rem",
          color: theme.cardDim,
          marginBottom: "4px",
          letterSpacing: "0.1em",
        }}
      >
        POWER LEVEL
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true }}
        style={{
          fontFamily: theme.fontBody,
          fontSize: "0.85rem",
          color: theme.secondary,
          letterSpacing: "3px",
        }}
      >
        {`[${"█".repeat(Math.round(hudCount / 10))}${"░".repeat(10 - Math.round(hudCount / 10))}] ${hudCount}%`}
      </motion.div>
    </div>
  );
}

function SkillGroupCard({
  group,
  index,
  delay,
  theme,
}: {
  group: SkillGroup;
  index: number;
  delay: number;
  theme: PortfolioTheme;
}) {
  const { isCrossing, isComic } = useThemeVariant();

  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.4 });
  const [hudCount, setHudCount] = useState(0);

  useEffect(() => {
    if (!inView || isCrossing || isComic) return;
    let startTime: number | null = null;
    const target = group.power;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / 1400, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setHudCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView, group.power, isCrossing, isComic]);

  return (
    <motion.div
      ref={cardRef}
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
      viewport={{ once: true, amount: 0.3 }}
      style={{
        ...theme.card,
        background: theme.card.background ?? theme.surface,
        borderRadius: theme.card.borderRadius ?? "4px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        height: "100%",
      }}
    >
      <CardFrame theme={theme} size={10} />

      {isComic ? (
        <ComicSkillCard group={group} delay={delay} theme={theme} />
      ) : isCrossing ? (
        <CrossingSkillCard group={group} delay={delay} theme={theme} />
      ) : (
        <HudSkillCard
          group={group}
          delay={delay}
          theme={theme}
          hudCount={hudCount}
        />
      )}
    </motion.div>
  );
}

export function SkillsSection() {
  const { theme } = usePortfolioTheme();
  const { isCrossing, isComic } = useThemeVariant();

  let sectionBg: string;
  if (isComic) sectionBg = "#FFE8E8";
  else if (isCrossing)
    sectionBg = "linear-gradient(180deg, #e8f5e0 0%, #d4ecc4 100%)";
  else sectionBg = theme.bg;

  return (
    <section
      id="skills"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem 6rem",
        background: sectionBg,
        transition: "background 0.5s",
      }}
    >
      {/* Canvas ambient animation */}
      <SkillsAnimation />

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <SectionHeading
          label={theme.sectionLabel("02", "Skills")}
          theme={theme}
          emoji="⭐"
        />
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
          gap: isCrossing || isComic ? "2rem" : "1.5rem",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {SKILL_GROUPS.map((g, i) => (
          <SkillGroupCard
            key={g.category}
            group={g}
            index={i}
            delay={i * 0.12}
            theme={theme}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.4 }}
        viewport={{ once: true }}
        style={{
          marginTop: "3.5rem",
          fontFamily: isComic ? theme.fontHeading : theme.fontBody,
          fontWeight: isCrossing || isComic ? 700 : 400,
          fontSize: isComic ? "1.2rem" : isCrossing ? "1rem" : "0.82rem",
          color: isComic
            ? theme.text
            : isCrossing
              ? theme.secondary
              : theme.dim,
          letterSpacing: isComic ? "0.05em" : isCrossing ? "0.02em" : "0.15em",
          textAlign: "center",
        }}
      >
        Hiroshi Fuji · Software Engineer · Tokyo, Japan
      </motion.div>
    </section>
  );
}
