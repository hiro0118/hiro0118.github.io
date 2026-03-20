import { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delta: number;
  color: string;
}

export function PixelSparkle({ colors }: { colors: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const sparkles: Sparkle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      if (!canvas) return;
      sparkles.length = 0;
      for (let i = 0; i < 80; i++) {
        sparkles.push({
          x:       Math.random() * canvas.width,
          y:       Math.random() * canvas.height,
          size:    Math.random() < 0.4 ? 4 : 2,
          opacity: Math.random(),
          delta:   (Math.random() * 0.015 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
          color:   colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of sparkles) {
        ctx.globalAlpha = Math.max(0, Math.min(1, s.opacity));
        ctx.fillStyle = s.color;
        ctx.fillRect(s.x, s.y, s.size, s.size);

        s.opacity += s.delta;
        if (s.opacity <= 0) {
          s.delta = Math.abs(s.delta);
          s.x = Math.random() * canvas.width;
          s.y = Math.random() * canvas.height;
          s.color = colors[Math.floor(Math.random() * colors.length)];
        } else if (s.opacity >= 1) {
          s.delta = -Math.abs(s.delta);
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
