import { useEffect, useRef, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import './BookingModal.scss';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledPackage?: string;
}

const PACKAGE_SLUGS: Record<string, string> = {
  'Cours Découverte':   import.meta.env.VITE_CAL_DECOUVERTE,
  'Forfait Mensuel':    import.meta.env.VITE_CAL_MENSUEL,
  'Forfait Semestriel': import.meta.env.VITE_CAL_SEMESTRIEL,
};

const DEFAULT_SLUG = import.meta.env.VITE_CAL_DECOUVERTE;

export function BookingModal({ isOpen, onClose, prefilledPackage }: BookingModalProps) {
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const [calReady, setCalReady] = useState(false);

  const calLink = (prefilledPackage
    ? (PACKAGE_SLUGS[prefilledPackage] ?? DEFAULT_SLUG)
    : DEFAULT_SLUG) + '?locale=fr';

  useEffect(() => {
    getCalApi().then((cal) => {
      cal('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#f5e642' } },
        hideEventTypeDetails: false,
      });
      setCalReady(true);
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstFocusRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="booking-modal booking-modal--open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-modal="true"
      aria-label="Réservation de cours"
      role="dialog"
    >
      <div className="booking-modal__panel">
        <div className="booking-modal__top">
          <div className="booking-modal__top-text">
            <p className="booking-modal__kicker">Sofia Marchand Studio</p>
            <h2 className="booking-modal__title">Réserver un cours</h2>
          </div>
          <button
            className="booking-modal__close"
            onClick={onClose}
            aria-label="Fermer"
            ref={firstFocusRef}
          >
            <span className="booking-modal__close-icon" />
          </button>
        </div>

        <div className="booking-modal__embed">
          {calReady && (
            <Cal
              key={calLink}
              calLink={calLink}
              style={{ width: '100%', height: '100%', overflow: 'auto' }}
              config={{ layout: 'month_view' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}