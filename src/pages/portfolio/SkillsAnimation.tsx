import { useEffect, useRef } from "react";
import { usePortfolioTheme } from "./ThemeContext";

export function SkillsAnimation() {
  const { theme } = usePortfolioTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth || 300;
      canvas.height = canvas.offsetHeight || 200;
    };
    resize();

    // --- HUD: horizontal data streams with glowing trails ---
    if (theme.id === "hud") {
      type Stream = {
        x: number;
        y: number;
        speed: number;
        tail: number;
        opacity: number;
        thick: number;
      };
      const streams: Stream[] = [];

      const init = () => {
        streams.length = 0;
        for (let i = 0; i < 22; i++) {
          streams.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: Math.random() * 1.8 + 0.5,
            tail: Math.random() * 90 + 30,
            opacity: Math.random() * 0.3 + 0.06,
            thick: Math.random() * 1.5 + 0.4,
          });
        }
      };

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const s of streams) {
          const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.tail, s.y);
          grad.addColorStop(0, `rgba(0,212,255,${s.opacity})`);
          grad.addColorStop(1, "rgba(0,212,255,0)");
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.tail, s.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = s.thick;
          ctx.stroke();
          s.x += s.speed;
          if (s.x > canvas.width + s.tail) {
            s.x = -s.tail;
            s.y = Math.random() * canvas.height;
          }
        }
        animId = requestAnimationFrame(draw);
      };

      init();
      draw();
      const onResize = () => {
        resize();
        init();
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
      };
    }

    // --- Animal Crossing: floating pollen drifting upward ---
    if (theme.id === "crossing") {
      type Pollen = {
        x: number;
        y: number;
        vx: number;
        vy: number;
        r: number;
        opacity: number;
        opDir: number;
      };
      const pollen: Pollen[] = [];

      const init = () => {
        pollen.length = 0;
        for (let i = 0; i < 45; i++) {
          pollen.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: -(Math.random() * 0.5 + 0.15),
            r: Math.random() * 3.5 + 1.5,
            opacity: Math.random() * 0.45 + 0.15,
            opDir: 1,
          });
        }
      };

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of pollen) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(248,200,48,${p.opacity})`;
          ctx.fill();
          p.x += p.vx;
          p.y += p.vy;
          p.opacity += p.opDir * 0.004;
          if (p.opacity > 0.65 || p.opacity < 0.1) p.opDir *= -1;
          if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
        }
        animId = requestAnimationFrame(draw);
      };

      init();
      draw();
      const onResize = () => {
        resize();
        init();
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
      };
    }

    // --- Comic: colorful confetti raining down ---
    {
      const COLORS = ["#E63329", "#FFD700", "#1565C0", "#34A853", "#FF6B35"];
      type Piece = {
        x: number;
        y: number;
        vx: number;
        vy: number;
        w: number;
        h: number;
        color: string;
        rot: number;
        rotV: number;
      };
      const pieces: Piece[] = [];

      const init = () => {
        pieces.length = 0;
        for (let i = 0; i < 30; i++) {
          pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: Math.random() * 0.7 + 0.3,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            rot: Math.random() * Math.PI * 2,
            rotV: (Math.random() - 0.5) * 0.07,
          });
        }
      };

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of pieces) {
          ctx.save();
          ctx.globalAlpha = 0.4;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.rotV;
          if (p.y > canvas.height + 10) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
        }
        animId = requestAnimationFrame(draw);
      };

      init();
      draw();
      const onResize = () => {
        resize();
        init();
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
      };
    }
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
      }}
    />
  );
}
