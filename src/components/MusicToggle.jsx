import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const FRIENDLY_ERROR = "The music isn't available right now, but the card is all yours 💗";

function MusicIcon({ on }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        d="M9 18V6l10-2v12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.500" cy="18" r="2.500" fill="currentColor" />
      <circle cx="16.500" cy="16" r="2.500" fill="currentColor" />
      {!on && (
        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" />
      )}
    </svg>
  );
}

/** Background music. Only ever starts from a user tap (envelope or the music button). */
const MusicToggle = forwardRef(function MusicToggle({ src }, ref) {
  const audioRef = useRef(null);
  const timerRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState('');

  const flash = (text) => {
    setMessage(text);
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setMessage(''), 4000);
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      clearTimeout(timerRef.current);
      if (audio) {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
      }
    };
  }, []);

  // Lets the parent start the music from inside a user tap (the envelope tap).
  // Failures are silent here; the visible button still lets her start it herself.
  useImperativeHandle(ref, () => ({
    start() {
      const audio = audioRef.current;
      if (!audio || !audio.paused) return;
      const p = audio.play();
      if (p && p.catch) p.catch(() => setPlaying(false));
    },
  }));

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setPlaying(false);
      flash(FRIENDLY_ERROR);
    }
  };

  return (
    <div className="music">
      <button
        type="button"
        className={`music-btn${playing ? ' on' : ''}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
      >
        <MusicIcon on={playing} />
        <span>{playing ? 'Music on' : 'Music off'}</span>
      </button>
      <p className="music-msg" role="status" aria-live="polite">
        {message}
      </p>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          flash(FRIENDLY_ERROR);
        }}
      />
    </div>
  );
});

export default MusicToggle;
