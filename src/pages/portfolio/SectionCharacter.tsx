import { useEffect, useRef } from "react";
import { usePortfolioTheme } from "./ThemeContext";

/** Bio section — small themed shapes drift gently within a bounded pane */
export function FloatCharacter() {
  const { theme } = usePortfolioTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;

    const syncSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || 900;
      canvas.height = rect.height || 80;
    };
    syncSize();

    const ro = new ResizeObserver(() => syncSize());
    ro.observe(canvas);

    type Shape = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rot: number;
      rotV: number;
      opacity: number;
      opDir: number;
      kind: number; // shape variant index
      color: string;
    };

    const shapes: Shape[] = [];

    // ── HUD: diamonds + plus-signs in cyan/green ──────────────────────────
    if (theme.id === "hud") {
      const COLORS = ["#00d4ff", "#00ff88", "#ffaa00"];
      const COUNT = 14;
      for (let i = 0; i < COUNT; i++) {
        shapes.push({
          x: 20 + Math.random() * Math.max(1, canvas.width - 40),
          y: 20 + Math.random() * Math.max(1, canvas.height - 40),
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 7 + 4,
          rot: Math.random() * Math.PI,
          rotV: (Math.random() - 0.5) * 0.012,
          opacity: Math.random() * 0.35 + 0.12,
          opDir: 1,
          kind: i % 2, // 0 = diamond, 1 = crosshair
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const s of shapes) {
          ctx.save();
          ctx.globalAlpha = s.opacity;
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 1.2;
          ctx.translate(s.x, s.y);
          ctx.rotate(s.rot);

          if (s.kind === 0) {
            // diamond (rotated square)
            ctx.beginPath();
            ctx.moveTo(0, -s.size);
            ctx.lineTo(s.size, 0);
            ctx.lineTo(0, s.size);
            ctx.lineTo(-s.size, 0);
            ctx.closePath();
            ctx.stroke();
          } else {
            // small crosshair / plus
            const arm = s.size * 1.1;
            ctx.beginPath();
            ctx.moveTo(-arm, 0);
            ctx.lineTo(arm, 0);
            ctx.moveTo(0, -arm);
            ctx.lineTo(0, arm);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, s.size * 0.35, 0, Math.PI * 2);
            ctx.stroke();
          }

          ctx.restore();

          s.x += s.vx;
          s.y += s.vy;
          s.rot += s.rotV;
          s.opacity += s.opDir * 0.003;
          if (s.opacity > 0.5 || s.opacity < 0.08) s.opDir *= -1;
          if (s.x < s.size) {
            s.x = s.size;
            s.vx = Math.abs(s.vx);
          }
          if (s.x > canvas.width - s.size) {
            s.x = canvas.width - s.size;
            s.vx = -Math.abs(s.vx);
          }
          if (s.y < s.size) {
            s.y = s.size;
            s.vy = Math.abs(s.vy);
          }
          if (s.y > canvas.height - s.size) {
            s.y = canvas.height - s.size;
            s.vy = -Math.abs(s.vy);
          }
        }
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    // ── Crossing: soft circles + small leaf-stars in green/gold ──────────
    else if (theme.id === "crossing") {
      const COLORS = ["#5a9e52", "#f8c830", "#4878c0", "#3a7e32"];
      const COUNT = 16;
      for (let i = 0; i < COUNT; i++) {
        shapes.push({
          x: 20 + Math.random() * Math.max(1, canvas.width - 40),
          y: 20 + Math.random() * Math.max(1, canvas.height - 40),
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 6 + 4,
          rot: Math.random() * Math.PI * 2,
          rotV: (Math.random() - 0.5) * 0.01,
          opacity: Math.random() * 0.45 + 0.2,
          opDir: 1,
          kind: i % 3, // 0 = circle, 1 = 4-petal flower, 2 = star
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }

      const drawFlower = (r: number) => {
        // 4 petal blob = 4 small circles offset from center
        for (let p = 0; p < 4; p++) {
          const angle = (p * Math.PI) / 2;
          ctx.beginPath();
          ctx.arc(
            Math.cos(angle) * r * 0.55,
            Math.sin(angle) * r * 0.55,
            r * 0.55,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      };

      const drawStar = (r: number, points: number) => {
        ctx.beginPath();
        for (let p = 0; p < points * 2; p++) {
          const angle = (p * Math.PI) / points - Math.PI / 2;
          const len = p % 2 === 0 ? r : r * 0.45;
          if (p === 0) ctx.moveTo(Math.cos(angle) * len, Math.sin(angle) * len);
          else ctx.lineTo(Math.cos(angle) * len, Math.sin(angle) * len);
        }
        ctx.closePath();
        ctx.fill();
      };

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const s of shapes) {
          ctx.save();
          ctx.globalAlpha = s.opacity;
          ctx.fillStyle = s.color;
          ctx.translate(s.x, s.y);
          ctx.rotate(s.rot);

          if (s.kind === 0) {
            ctx.beginPath();
            ctx.arc(0, 0, s.size, 0, Math.PI * 2);
            ctx.fill();
          } else if (s.kind === 1) {
            drawFlower(s.size);
          } else {
            drawStar(s.size, 5);
          }

          ctx.restore();

          s.x += s.vx;
          s.y += s.vy;
          s.rot += s.rotV;
          s.opacity += s.opDir * 0.004;
          if (s.opacity > 0.7 || s.opacity < 0.12) s.opDir *= -1;
          if (s.x < s.size) {
            s.x = s.size;
            s.vx = Math.abs(s.vx);
          }
          if (s.x > canvas.width - s.size) {
            s.x = canvas.width - s.size;
            s.vx = -Math.abs(s.vx);
          }
          if (s.y < s.size) {
            s.y = s.size;
            s.vy = Math.abs(s.vy);
          }
          if (s.y > canvas.height - s.size) {
            s.y = canvas.height - s.size;
            s.vy = -Math.abs(s.vy);
          }
        }
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    // ── Comic: bold outlined polygons in red/blue/yellow ─────────────────
    else {
      const FILLS = ["#E63329", "#1565C0", "#FFD700"];
      const COUNT = 12;
      for (let i = 0; i < COUNT; i++) {
        shapes.push({
          x: 20 + Math.random() * Math.max(1, canvas.width - 40),
          y: 20 + Math.random() * Math.max(1, canvas.height - 40),
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 8 + 6,
          rot: Math.random() * Math.PI * 2,
          rotV: (Math.random() - 0.5) * 0.018,
          opacity: Math.random() * 0.35 + 0.2,
          opDir: 1,
          kind: i % 3, // 0 = triangle, 1 = square, 2 = 6-point star
          color: FILLS[i % FILLS.length],
        });
      }

      const drawNgon = (r: number, n: number) => {
        ctx.beginPath();
        for (let p = 0; p < n; p++) {
          const angle = (p * 2 * Math.PI) / n - Math.PI / 2;
          if (p === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
          else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        }
        ctx.closePath();
      };

      const drawStar6 = (r: number) => {
        ctx.beginPath();
        for (let p = 0; p < 12; p++) {
          const angle = (p * Math.PI) / 6 - Math.PI / 2;
          const len = p % 2 === 0 ? r : r * 0.45;
          if (p === 0) ctx.moveTo(Math.cos(angle) * len, Math.sin(angle) * len);
          else ctx.lineTo(Math.cos(angle) * len, Math.sin(angle) * len);
        }
        ctx.closePath();
      };

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const s of shapes) {
          ctx.save();
          ctx.globalAlpha = s.opacity;
          ctx.fillStyle = s.color;
          ctx.strokeStyle = "#1a1a1a";
          ctx.lineWidth = 1.5;
          ctx.translate(s.x, s.y);
          ctx.rotate(s.rot);

          if (s.kind === 0) drawNgon(s.size, 3);
          else if (s.kind === 1) drawNgon(s.size, 4);
          else drawStar6(s.size);

          ctx.fill();
          ctx.stroke();
          ctx.restore();

          s.x += s.vx;
          s.y += s.vy;
          s.rot += s.rotV;
          s.opacity += s.opDir * 0.003;
          if (s.opacity > 0.58 || s.opacity < 0.12) s.opDir *= -1;
          if (s.x < s.size) {
            s.x = s.size;
            s.vx = Math.abs(s.vx);
          }
          if (s.x > canvas.width - s.size) {
            s.x = canvas.width - s.size;
            s.vx = -Math.abs(s.vx);
          }
          if (s.y < s.size) {
            s.y = s.size;
            s.vy = Math.abs(s.vy);
          }
          if (s.y > canvas.height - s.size) {
            s.y = canvas.height - s.size;
            s.vy = -Math.abs(s.vy);
          }
        }
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [theme.id]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
