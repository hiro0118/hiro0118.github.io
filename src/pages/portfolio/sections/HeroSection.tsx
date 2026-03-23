import { useEffect, useState, useMemo } from "react";
import { StarField } from "../StarField";
import { usePortfolioTheme } from "../ThemeContext";
import { PortfolioTheme } from "../themes/types";

const LINES = [
  "Hello! My name is Hiroshi.",
  "I'm a software engineer.",
  "Nice to meet you!",
  "Based in Tokyo, Japan.",
];

// Fixed positions so they don't shift on re-render
const FLOAT_ITEMS = [
  { char: "✿", left: "4%", top: "18%", dur: 4.2, delay: 0, size: 1.4 },
  { char: "✦", left: "12%", top: "70%", dur: 5.1, delay: 0.6, size: 1.0 },
  { char: "♪", left: "22%", top: "42%", dur: 3.8, delay: 1.2, size: 1.2 },
  { char: "✿", left: "78%", top: "22%", dur: 4.6, delay: 0.3, size: 1.1 },
  { char: "★", left: "88%", top: "58%", dur: 3.4, delay: 0.9, size: 1.3 },
  { char: "✦", left: "92%", top: "80%", dur: 5.5, delay: 1.8, size: 0.9 },
  { char: "♪", left: "52%", top: "8%", dur: 4.0, delay: 2.1, size: 1.0 },
  { char: "✿", left: "65%", top: "78%", dur: 3.6, delay: 0.5, size: 1.2 },
  { char: "★", left: "38%", top: "88%", dur: 4.8, delay: 1.4, size: 0.9 },
  { char: "✦", left: "45%", top: "15%", dur: 3.9, delay: 0.7, size: 1.1 },
];

const COMIC_BURSTS = [
  {
    word: "POW!",
    top: "12%",
    left: "6%",
    rotate: "-12deg",
    delay: "0s",
    size: "4.5rem",
  },
  {
    word: "ZAP!",
    top: "10%",
    right: "5%",
    rotate: "8deg",
    delay: "0.3s",
    size: "4rem",
  },
  {
    word: "WHAM!",
    top: "65%",
    left: "3%",
    rotate: "-6deg",
    delay: "0.6s",
    size: "3.5rem",
  },
];

function TypewriterText({ theme }: { theme: PortfolioTheme }) {
  const isComic = theme.id === "comic";
  const isCrossing = theme.id === "crossing";

  const lines = LINES;

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex];
    let timer: ReturnType<typeof setTimeout>;
    if (!erasing) {
      if (charIndex < current.length) {
        timer = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 55);
      } else {
        timer = setTimeout(() => setErasing(true), 2200);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 20);
      } else {
        setErasing(false);
        setLineIndex((l) => (l + 1) % lines.length);
      }
    }
    return () => clearTimeout(timer);
  }, [charIndex, erasing, lineIndex, lines]);

  /* ── Comic speech bubble ── */
  if (isComic) {
    return (
      <div style={{ position: "relative", maxWidth: "min(400px, 88vw)" }}>
        <div
          style={{
            background: "white",
            border: "2px solid #1a1a1a",
            borderRadius: "12px",
            boxShadow: "3px 3px 0 #1a1a1a",
            padding: "1rem 1.4rem",
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: theme.fontBody,
              fontWeight: 700,
              fontSize: "1.05rem",
              color: "#1a1a1a",
              minHeight: "1.5em",
            }}
          >
            {displayed}
            <span
              style={{
                animation: "blink-cursor 0.8s step-end infinite",
                color: theme.primary,
              }}
            >
              {theme.typingCursor}
            </span>
          </span>
          {/* Bubble tail */}
          <div
            style={{
              position: "absolute",
              bottom: "-14px",
              left: "28px",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "14px solid #1a1a1a",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "30px",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "12px solid white",
            }}
          />
        </div>
      </div>
    );
  }

  /* ── Animal Crossing dialog box ── */
  if (isCrossing) {
    return (
      <div
        style={{
          ...theme.card,
          background: theme.card.background,
          padding: "1.2rem 1.8rem 1.2rem 1.5rem",
          minWidth: "min(380px, 88vw)",
          position: "relative",
          animation: "ac-pop 0.5s ease-out both",
          animationDelay: "0.3s",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            fontSize: "1.1rem",
            color: theme.secondary,
            flexShrink: 0,
          }}
        >
          {theme.typingCursor}
        </span>
        <span
          style={{
            fontFamily: theme.fontBody,
            fontWeight: 600,
            fontSize: "1.15rem",
            color: theme.cardText,
            minHeight: "1.5em",
            flex: 1,
          }}
        >
          {displayed}
          <span
            style={{
              animation: "blink-cursor 0.8s step-end infinite",
              color: theme.secondary,
              marginLeft: "2px",
            }}
          >
            |
          </span>
        </span>
      </div>
    );
  }

  /* ── HUD terminal text ── */
  return (
    <div
      style={{
        fontFamily: theme.fontBody,
        fontSize: "clamp(0.8rem, 2vw, 1rem)",
        color: theme.secondary,
        minHeight: "1.5em",
        letterSpacing: "0.08em",
      }}
    >
      {displayed}
      <span
        style={{
          animation: "blink-cursor 1s step-end infinite",
          color: theme.primary,
        }}
      >
        {theme.typingCursor}
      </span>
    </div>
  );
}

export function HeroSection() {
  const { theme } = usePortfolioTheme();
  const isCrossing = theme.id === "crossing";
  const isComic = theme.id === "comic";

  const floatColors = useMemo(
    () => [theme.accent, theme.secondary, theme.primary],
    [theme.accent, theme.secondary, theme.primary],
  );

  /* ── Comic hero ── */
  if (isComic) {
    return (
      <section
        id="hero"
        style={{
          position: "relative",
          height: "100vh",
          paddingTop: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: `repeating-conic-gradient(#FFD700 0deg 12deg, #FFF5A0 12deg 24deg)`,
        }}
      >
        {/* Ben-Day halftone dots overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage: `radial-gradient(circle, #E6332940 1.5px, transparent 1.5px)`,
            backgroundSize: "16px 16px",
            opacity: 0.4,
          }}
        />

        {/* Action burst decorations */}
        {COMIC_BURSTS.map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: b.top,
              left: (b as any).left,
              right: (b as any).right,
              width: b.size,
              height: b.size,
              background: i % 2 === 0 ? "#FFD700" : "#E63329",
              border: "3px solid #1a1a1a",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(${b.rotate})`,
              zIndex: 2,
              animation: `comic-shake 3s ease-in-out infinite`,
              animationDelay: b.delay,
              boxShadow: "3px 3px 0 #1a1a1a",
            }}
          >
            <span
              style={{
                fontFamily: theme.fontHeading,
                fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                color: i % 2 === 0 ? "#1a1a1a" : "white",
                fontWeight: 400,
                textAlign: "center",
                lineHeight: 1,
              }}
            >
              {b.word}
            </span>
          </div>
        ))}

        {/* Center panel */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            padding: "2rem",
          }}
        >
          {/* Main title box */}
          <div
            style={{
              background: theme.accent,
              border: "4px solid #1a1a1a",
              boxShadow: "8px 8px 0 #1a1a1a",
              padding: "2rem 3rem",
              position: "relative",
            }}
          >
            <h1
              style={{
                fontFamily: theme.fontHeading,
                fontSize: "clamp(3rem, 10vw, 5rem)",
                fontWeight: 400,
                margin: 0,
                color: theme.primary,
                letterSpacing: "0.04em",
                lineHeight: 1,
                textShadow:
                  "-2px -2px 0 #1a1a1a, 2px -2px 0 #1a1a1a, -2px 2px 0 #1a1a1a, 2px 2px 0 #1a1a1a",
              }}
            >
              HIROSHI FUJI
            </h1>
            <div
              style={{
                display: "inline-block",
                marginTop: "1rem",
                background: theme.secondary,
                color: "white",
                fontFamily: theme.fontHeading,
                fontWeight: 400,
                fontSize: "clamp(1rem, 3vw, 1.4rem)",
                padding: "0.3rem 1.2rem",
                border: "2px solid #1a1a1a",
                boxShadow: "3px 3px 0 #1a1a1a",
                letterSpacing: "0.06em",
              }}
            >
              SOFTWARE ENGINEER
            </div>
          </div>

          <TypewriterText theme={theme} />
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 4,
            fontFamily: theme.fontHeading,
            fontSize: "1rem",
            color: "#1a1a1a",
            letterSpacing: "0.1em",
            cursor: "pointer",
            background: "#FFD700",
            border: "2px solid #1a1a1a",
            boxShadow: "2px 2px 0 #1a1a1a",
            padding: "4px 16px",
            animation: "scroll-bounce 2s ease-in-out infinite",
          }}
          onClick={() =>
            document
              .getElementById("bio")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          ▼ READ ON!
        </div>
      </section>
    );
  }

  /* ── Animal Crossing / HUD hero ── */
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        paddingTop: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: isCrossing
          ? `linear-gradient(175deg, #a8d8f0 0%, #c2dff0 45%, #d4ecc4 100%)`
          : theme.bg,
        transition: "background 0.5s",
      }}
    >
      {/* Backgrounds */}
      {isCrossing ? (
        <>
          {/* Soft cloud wisps */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            {[
              { top: "12%", left: "8%", w: 120, opacity: 0.45 },
              { top: "22%", left: "55%", w: 180, opacity: 0.35 },
              { top: "8%", left: "72%", w: 100, opacity: 0.4 },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: c.top,
                  left: c.left,
                  width: c.w,
                  height: c.w * 0.45,
                  background: "white",
                  borderRadius: "50%",
                  opacity: c.opacity,
                  filter: "blur(8px)",
                }}
              />
            ))}
          </div>

          {/* Floating nature items */}
          {FLOAT_ITEMS.map((item, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: item.left,
                top: item.top,
                fontSize: `${item.size}rem`,
                color: floatColors[i % 3],
                opacity: 0.6,
                zIndex: 1,
                pointerEvents: "none",
                animation: `float-ac ${item.dur}s ease-in-out infinite`,
                animationDelay: `${item.delay}s`,
              }}
            >
              {item.char}
            </span>
          ))}

          {/* Grass strip at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "80px",
              background: "linear-gradient(to top, #8dc870, #aad890)",
              zIndex: 1,
              borderTop: "3px solid #6ab050",
            }}
          >
            {/* small flowers on grass */}
            {["12%", "25%", "38%", "52%", "67%", "80%", "91%"].map((l, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: l,
                  top: "-10px",
                  fontSize: "1.2rem",
                  animation: `float-ac ${3 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                {["🌸", "🌼", "🌺", "🍀", "🌻", "🌸", "🌼"][i]}
              </span>
            ))}
          </div>
        </>
      ) : (
        <>
          <StarField />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "120px",
                background:
                  "linear-gradient(to bottom, transparent, rgba(0,212,255,0.04), transparent)",
                animation: "scanline 3s linear infinite",
              }}
            />
          </div>
        </>
      )}

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isCrossing ? "1.8rem" : "1.5rem",
          padding: "2rem",
        }}
      >
        {isCrossing ? (
          /* ── Animal Crossing title card ── */
          <div
            style={{
              ...theme.card,
              background: theme.card.background,
              padding: "2.5rem 3.5rem",
              position: "relative",
              animation: "ac-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) both",
              textAlign: "center",
              minWidth: "min(360px, 85vw)",
            }}
          >
            {/* corner leaf ornaments */}
            {[
              { top: 10, left: 14 },
              { top: 10, right: 14 },
              { bottom: 10, left: 14 },
              { bottom: 10, right: 14 },
            ].map((pos, i) => (
              <span
                key={i}
                style={{ position: "absolute", fontSize: "1rem", ...pos }}
              >
                ✿
              </span>
            ))}

            <div
              style={{
                fontFamily: theme.fontHeading,
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
                color: theme.cardText,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Hiroshi Fuji
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.8rem",
                background: theme.secondary,
                color: "white",
                fontFamily: theme.fontHeading,
                fontWeight: 700,
                fontSize: "clamp(0.8rem, 2vw, 1rem)",
                padding: "0.3rem 1.1rem",
                borderRadius: "20px",
                boxShadow: `0 3px 0 #3a7e32`,
              }}
            >
              🌿 Software Engineer
            </div>
          </div>
        ) : (
          /* ── HUD title frame ── */
          <div
            style={{
              position: "relative",
              display: "inline-block",
              padding: "2rem 3rem",
            }}
          >
            {[
              {
                top: 0,
                left: 0,
                borderTop: `2px solid ${theme.primary}`,
                borderLeft: `2px solid ${theme.primary}`,
              },
              {
                top: 0,
                right: 0,
                borderTop: `2px solid ${theme.primary}`,
                borderRight: `2px solid ${theme.primary}`,
              },
              {
                bottom: 0,
                left: 0,
                borderBottom: `2px solid ${theme.primary}`,
                borderLeft: `2px solid ${theme.primary}`,
              },
              {
                bottom: 0,
                right: 0,
                borderBottom: `2px solid ${theme.primary}`,
                borderRight: `2px solid ${theme.primary}`,
              },
            ].map((style, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  ...style,
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                inset: "-20px",
                border: `1px solid ${theme.border}`,
                borderRadius: "50%",
                animation: "targeting-spin 12s linear infinite",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "-4px",
                  width: "8px",
                  height: "2px",
                  background: theme.primary,
                  transform: "translateY(-50%)",
                }}
              />
            </div>
            <h1
              style={{
                fontFamily: theme.fontHeading,
                fontSize: "clamp(2rem, 6vw, 4rem)",
                fontWeight: 900,
                margin: 0,
                color: theme.primary,
                letterSpacing: "0.1em",
                animation: theme.glowAnimation,
              }}
            >
              HIROSHI FUJI
            </h1>
            <div
              style={{
                fontFamily: theme.fontBody,
                fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                color: theme.text,
                letterSpacing: "0.3em",
                marginTop: "0.5rem",
              }}
            >
              SOFTWARE ENGINEER
            </div>
          </div>
        )}

        <TypewriterText theme={theme} />
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: isCrossing ? "95px" : "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          fontFamily: theme.fontBody,
          fontWeight: isCrossing ? 700 : 400,
          fontSize: isCrossing ? "0.95rem" : "0.75rem",
          color: isCrossing ? theme.secondary : theme.dim,
          letterSpacing: "0.15em",
          animation: isCrossing
            ? "ac-bounce 1.8s ease-in-out infinite"
            : "scroll-bounce 2s ease-in-out infinite",
          cursor: "pointer",
        }}
        onClick={() =>
          document.getElementById("bio")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        {isCrossing ? "▼  Keep scrolling!" : "▼ SCROLL"}
      </div>
    </section>
  );
}
