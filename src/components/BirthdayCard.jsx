import { useCallback, useEffect, useRef, useState } from 'react';
import { Flower, HeartIcon } from './Decor.jsx';
import SurpriseMessage from './SurpriseMessage.jsx';
import Confetti from './Confetti.jsx';

const SPARK_COUNT = 14;
const SPARKS = Array.from({ length: SPARK_COUNT }, (_, i) => {
  const angle = (i / SPARK_COUNT) * Math.PI * 2;
  const dist = 46 + (i % 3) * 16;
  return {
    dx: Math.round(Math.cos(angle) * dist),
    dy: Math.round(Math.sin(angle) * dist),
    delay: (i % 4) * 40,
  };
});

/** Polaroid-style portrait with a graceful fallback when the photo is missing. */
function PhotoFrame({ src, alt, nickname }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="polaroid">
      <span className="tape" aria-hidden="true" />
      <div className="polaroid-photo">
        {failed ? (
          <div className="photo-fallback" role="img" aria-label={`A pink flower for ${nickname}`}>
            <Flower className="fallback-flower" />
            <span className="fallback-text">{nickname}</span>
          </div>
        ) : (
          <img
            className="polaroid-img"
            src={src}
            alt={alt}
            decoding="async"
            onError={() => {
              if (import.meta.env.DEV) {
                console.info(`[birthday] Photo not found at ${src} – showing the fallback frame.`);
              }
              setFailed(true);
            }}
          />
        )}
      </div>
      <figcaption className="polaroid-caption">{nickname} 💗</figcaption>
      <Flower className="flower-accent fa-1" />
      <Flower className="flower-accent fa-2" petal="#E8DFF5" />
    </figure>
  );
}

export default function BirthdayCard({ config, reducedMotion, onReplay }) {
  const headingRef = useRef(null);
  const surpriseBtnRef = useRef(null);
  const sparkTimer = useRef(0);
  const [note, setNote] = useState('');
  const [sparkId, setSparkId] = useState(0);
  const [showSparks, setShowSparks] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [burstId, setBurstId] = useState(0);

  // Move focus to the new screen so keyboard / screen-reader users land on it.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    return () => clearTimeout(sparkTimer.current);
  }, []);

  const makeWish = () => {
    setNote(config.wishMessage);
    if (reducedMotion) return;
    clearTimeout(sparkTimer.current);
    setSparkId((n) => n + 1);
    setShowSparks(true);
    sparkTimer.current = window.setTimeout(() => setShowSparks(false), 1200);
  };

  const celebrate = () => {
    setBurstId((n) => n + 1);
    if (reducedMotion) setNote(`Happy Birthday, ${config.friendName}! 🎉`);
  };

  const closeSurprise = useCallback(() => {
    setSurpriseOpen(false);
    surpriseBtnRef.current?.focus();
  }, []);

  return (
    <main className="card-screen">
      <article className="card">
        <Flower className="corner corner-tl" />
        <Flower className="corner corner-tr" petal="#E8DFF5" />
        <HeartIcon className="card-heart ch-1" />
        <HeartIcon className="card-heart ch-2" />

        <header className="card-head">
          <h1 className="card-title" tabIndex={-1} ref={headingRef}>
            {config.cardHeading}
          </h1>
          <h2 className="card-subtitle">{config.cardSubheading}</h2>
        </header>

        <PhotoFrame src={config.friendPhotoPath} alt={config.photoAlt} nickname={config.nickname} />

        <section className="message" aria-label="Your birthday message">
          {config.birthdayMessage.map((para, i) => (
            <p key={i} className="message-p" style={{ '--i': i }}>
              {para}
            </p>
          ))}
          <p className="signature" style={{ '--i': config.birthdayMessage.length }}>
            <span className="sig-lead">{config.signatureLead}</span>
            <span className="sig-name">{config.signatureName}</span>
          </p>
        </section>

        <section className="actions" aria-label="Surprises">
          <div className="actions-row">
            <div className="wish-wrap">
              <button type="button" className="btn btn-primary" onClick={makeWish}>
                Make a Wish ✨
              </button>
              {showSparks && (
                <span className="sparks" key={sparkId} aria-hidden="true">
                  {SPARKS.map((s, i) => (
                    <i
                      key={i}
                      style={{
                        '--dx': `${s.dx}px`,
                        '--dy': `${s.dy}px`,
                        animationDelay: `${s.delay}ms`,
                      }}
                    />
                  ))}
                </span>
              )}
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setSurpriseOpen(true)}
              ref={surpriseBtnRef}
              aria-haspopup="dialog"
            >
              One More Surprise 💌
            </button>

            <button type="button" className="btn btn-primary" onClick={celebrate}>
              Let&apos;s Celebrate! 🎉
            </button>
          </div>

          <p className="note" role="status" aria-live="polite">
            {note}
          </p>

          <button type="button" className="btn btn-soft replay" onClick={onReplay}>
            Open the Letter Again ↺
          </button>
        </section>
      </article>

      <SurpriseMessage
        open={surpriseOpen}
        onClose={closeSurprise}
        message={config.additionalSurpriseMessage}
        nickname={config.nickname}
      />
      <Confetti burstId={burstId} reducedMotion={reducedMotion} />
    </main>
  );
}
