import { useEffect, useRef } from 'react';
import './JotformModal.scss';

interface JotformModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse?: string;
  selectedForfait?: string;
}

const FORM_ID = import.meta.env.VITE_JOTFORM_FORM_ID ?? 'JOTFORM_FORM_ID_HERE';

const buildUrl = (selectedCourse?: string, selectedForfait?: string): string => {
  const base = `https://form.jotform.com/${FORM_ID}`;
  const params = new URLSearchParams();
  if (selectedCourse) params.set('q14_dropdown12', selectedCourse);
  if (selectedForfait) params.set('q15_dropdown13', selectedForfait);
  const query = params.toString();
  return query ? `${base}?${query}` : base;
};

export function JotformModal({ isOpen, onClose, selectedCourse, selectedForfait }: JotformModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const src = buildUrl(selectedCourse, selectedForfait);

  return (
    <div
      className="jotform-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      aria-label="Fiche d'inscription"
      role="dialog"
    >
      <div className="jotform-modal__panel">
        <div className="jotform-modal__top">
          <div className="jotform-modal__top-text">
            <p className="jotform-modal__kicker">Sofia Marchand Studio</p>
            <h2 className="jotform-modal__title">Fiche d'inscription</h2>
          </div>
          <button
            className="jotform-modal__close"
            onClick={onClose}
            aria-label="Fermer"
            ref={closeRef}
          >
            <span className="jotform-modal__close-icon" />
          </button>
        </div>
        <div className="jotform-modal__embed">
          <iframe
            key={src}
            src={src}
            width="100%"
            height="100%"
            className="jotform-modal__iframe"
            title="Fiche d'inscription Urban Move Studio"
          />
        </div>
      </div>
    </div>
  );
}
