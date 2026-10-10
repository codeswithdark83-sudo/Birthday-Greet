import { useEffect, useRef } from 'react';

const COLORS = ['#F3BFD2', '#E8DFF5', '#FFD9A8', '#BFE5D3', '#BFD9F3', '#F8DDE8', '#C65D83'];
const DURATION = 3200; // ms, then everything is cleared

/**
 * Pastel confetti on a fixed canvas. A new burst starts whenever `burstId`
 * changes. When it finishes (or the component unmounts) the animation frame is
 * cancelled and the canvas is cleared. Does nothing when reduced motion is on.
 */
export default function Confetti({ burstId, reducedMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!burstId || reducedMotion) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext('2d');
    if (!canvas || !ctx) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = w < 520 ? 90 : 140;
    const particles = Array.from({ length: count }, (_, i) => {
      const fromLeft = i % 2 === 0;
      const base = -Math.PI / 2 + (fromLeft ? 0.55 : -0.55);
      const angle = base + (Math.random() - 0.5) * 0.7;
      const speed = 11 + Math.random() * 9;
      return {
        x: fromLeft ? w * 0.08 : w * 0.92,
        y: h * 0.82,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 6 + Math.random() * 6,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.35,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        round: Math.random() < 0.3,
      };
    });

    let raf = 0;
    const start = performance.now();

    const tick = (now) => {
      const t = now - start;
      ctx.clearRect(0, 0, w, h);
      if (t >= DURATION) return; // finished: canvas stays clear

      const alpha = t > DURATION - 800 ? Math.max(0, (DURATION - t) / 800) : 1;
      ctx.globalAlpha = alpha;
      for (const p of particles) {
        p.vy += 0.26;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.round) {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, w, h);
    };
  }, [burstId, reducedMotion]);

  return <canvas ref={canvasRef} className="confetti" aria-hidden="true" data-testid="confetti" />;
}
