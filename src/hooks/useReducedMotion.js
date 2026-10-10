import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

// Tracks the visitor's "reduce motion" OS setting and updates live if it changes.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(QUERY).matches
      : false
  );

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mql = window.matchMedia(QUERY);
    const onChange = (e) => setReduced(e.matches);
    setReduced(mql.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
    mql.addListener(onChange); // older Safari
    return () => mql.removeListener(onChange);
  }, []);

  return reduced;
}
