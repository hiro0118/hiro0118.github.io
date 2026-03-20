import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initStars() {
      if (!canvas) return;
      stars.length = 0;
      for (let i = 0; i < 200; i++) {
        stars.push({
          x:       Math.random() * canvas.width,
          y:       Math.random() * canvas.height,
          vx:      (Math.random() - 0.5) * 0.15,
          vy:      Math.random() * 0.2 + 0.05,
          size:    Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.7 + 0.3,
        });
      }
    }

    function spawnShootingStar() {
      if (!canvas) return;
      shootingStars.push({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height * 0.5,
        vx:      (Math.random() * 6 + 4),
        vy:      (Math.random() * 4 + 2),
        length:  Math.random() * 80 + 40,
        opacity: 1,
        life:    0,
        maxLife: 40 + Math.random() * 20,
      });
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(204, 232, 255, ${s.opacity})`;
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
      });

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        const alpha = ss.opacity * (1 - ss.life / ss.maxLife);
        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.length, ss.y - ss.length * 0.5);
        grad.addColorStop(0, `rgba(0, 212, 255, ${alpha})`);
        grad.addColorStop(1, 'rgba(0,212,255,0)');
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.length, ss.y - ss.length * 0.5);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();

        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;
        if (ss.life >= ss.maxLife) shootingStars.splice(i, 1);
      }

      // Randomly spawn shooting stars
      if (Math.random() < 0.005) spawnShootingStar();

      animId = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    draw();

    const handleResize = () => { resize(); initStars(); };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
