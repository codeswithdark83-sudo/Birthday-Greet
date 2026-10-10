import { useCallback, useEffect, useRef, useState } from 'react';
import birthdayConfig from './config/birthdayConfig.js';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion.js';
import { AmbientBackground } from './components/Decor.jsx';
import Envelope from './components/Envelope.jsx';
import BirthdayCard from './components/BirthdayCard.jsx';
import MusicToggle from './components/MusicToggle.jsx';

// Timings (ms). Must roughly match the CSS transitions in Envelope.css.
const OPEN_DURATION = 2300; // flap opens, letter slides out
const OPEN_DURATION_REDUCED = 400;
const FADE_DURATION = 600; // envelope scene fades while the card appears

const THEME_VARS = {
  blush: '--blush',
  softPink: '--soft-pink',
  cream: '--cream',
  lavender: '--lavender',
  rose: '--rose',
  roseDeep: '--rose-deep',
  brown: '--brown',
};

export default function App() {
  const reduced = usePrefersReducedMotion();
  const [stage, setStage] = useState('sealed'); // 'sealed' | 'opening' | 'revealed'
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [round, setRound] = useState(0);
  const timers = useRef([]);
  const musicRef = useRef(null);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn, ms) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  // Apply theme colours from the config file.
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(THEME_VARS).forEach(([key, cssVar]) => {
      const value = birthdayConfig.theme[key];
      if (value) root.style.setProperty(cssVar, value);
    });
  }, []);

  useEffect(() => clearTimers, []);

  const handleOpen = () => {
    if (stage !== 'sealed') return; // ignore repeated taps during the animation
    musicRef.current?.start(); // her tap is the user gesture browsers require
    setStage('opening');
    later(() => {
      setStage('revealed');
      window.scrollTo(0, 0);
      later(() => setShowEnvelope(false), reduced ? 50 : FADE_DURATION);
    }, reduced ? OPEN_DURATION_REDUCED : OPEN_DURATION);
  };

  const handleReplay = useCallback(() => {
    clearTimers();
    setStage('sealed');
    setShowEnvelope(true);
    setRound((n) => n + 1);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      <AmbientBackground />
      <MusicToggle ref={musicRef} src={birthdayConfig.musicPath} />

      {stage === 'revealed' && (
        <BirthdayCard
          config={birthdayConfig}
          reducedMotion={reduced}
          onReplay={handleReplay}
        />
      )}

      {showEnvelope && (
        <Envelope
          key={round}
          config={birthdayConfig}
          stage={stage}
          onOpen={handleOpen}
        />
      )}
    </div>
  );
}
