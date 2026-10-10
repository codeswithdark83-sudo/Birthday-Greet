import { memo } from 'react';

const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

export function HeartIcon({ className = '', style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d={HEART_PATH} fill="currentColor" />
    </svg>
  );
}

export function Flower({ className = '', petal = '#F3BFD2', center = '#FFD9A8' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="24"
          cy="12"
          rx="6.5"
          ry="10"
          transform={`rotate(${a} 24 24)`}
          fill={petal}
          fillOpacity="0.9"
        />
      ))}
      <circle cx="24" cy="24" r="5" fill={center} />
    </svg>
  );
}

// A small, fixed set so layout never changes between renders.
const HEARTS = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 37 + 8) % 96,
  size: 14 + ((i * 7) % 5) * 5,
  duration: 16 + ((i * 5) % 9),
  delay: -((i * 3.1) % 16),
  opacity: 0.18 + ((i * 3) % 4) * 0.07,
}));

// A few drifting cakes among the hearts (kept sparse so the page stays calm).
const CAKES = Array.from({ length: 5 }, (_, i) => ({
  left: (i * 41 + 20) % 90,
  size: 24 + (i % 3) * 6,
  duration: 20 + ((i * 4) % 8),
  delay: -((i * 5.3) % 20),
  opacity: 0.35 + (i % 3) * 0.08,
}));

const SPARKLES = Array.from({ length: 8 }, (_, i) => ({
  left: (i * 53 + 11) % 92,
  top: (i * 29 + 7) % 88,
  size: 6 + (i % 3) * 3,
  delay: -(i * 0.8),
}));

// Decorative background: drifting hearts + twinkling sparkles.
function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      {HEARTS.map((h, i) => (
        <HeartIcon
          key={`h${i}`}
          className="ambient-heart"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        />
      ))}
      {CAKES.map((c, i) => (
        <span
          key={`c${i}`}
          className="ambient-cake"
          style={{
            left: `${c.left}%`,
            fontSize: c.size,
            opacity: c.opacity,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          🎂
        </span>
      ))}
      {SPARKLES.map((s, i) => (
        <span
          key={`s${i}`}
          className="ambient-sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export const AmbientBackground = memo(Ambient);
