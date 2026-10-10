import { useEffect, useRef } from 'react';
import { Flower } from './Decor.jsx';

/** "One More Surprise" – an accessible modal that unfolds like a small letter. */
export default function SurpriseMessage({ open, onClose, message, nickname }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll('button');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-letter"
        role="dialog"
        aria-modal="true"
        aria-labelledby="surprise-title"
        ref={dialogRef}
      >
        <button
          type="button"
          className="modal-x"
          onClick={onClose}
          ref={closeRef}
          aria-label="Close the letter"
        >
          ×
        </button>
        <Flower className="modal-flower" petal="#E8DFF5" />
        <h2 id="surprise-title" className="modal-title">
          One more thing, {nickname} 💌
        </h2>
        <p className="modal-text">{message}</p>
        <button type="button" className="btn btn-soft" onClick={onClose}>
          Back to the card
        </button>
      </div>
    </div>
  );
}
