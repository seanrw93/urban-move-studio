import { useState, useEffect } from 'react';
import { Button } from '../../atoms/Button/Button';
import './Hero.scss';

interface HeroProps {
  onBooking: () => void;
}

const REEL_IMAGES = [
  { webp: '/hero-bg.webp',      alt: 'Danse hip-hop',          animated: false },
  { webp: '/gallery-2.webp',    alt: 'Danseur en mouvement',   animated: true  },
  { webp: '/gallery-5.webp',    alt: 'Cours de danse urbaine', animated: false },
  { webp: '/gallery-4.webp',    alt: 'Performance hip-hop',    animated: true  },
];

const INTERVAL = 3500;

export function Hero({ onBooking }: HeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % REEL_IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Image reel — all images stacked, active one fades in */}
      <div className="hero__reel">
        {REEL_IMAGES.map((img, i) => (
          <div
            key={img.webp}
            className={`hero__reel-slide${i === current ? ' hero__reel-slide--active' : ''}`}
            style={img.animated ? undefined : { backgroundImage: `url(${img.webp})` }}
            aria-hidden={i !== current}
          >
            {img.animated && (
              <img
                src={img.webp}
                alt={img.alt}
                className="hero__reel-slide-img"
              />
            )}
          </div>
        ))}
      </div>

      <div className="hero__grain" />
      <div className="hero__overlay" />

      <div className="hero__content container">
        <div className="hero__text-block">
          <p className="hero__label">Hip-Hop & Urban Dance</p>
          <h1 className="hero__headline">
            <span className="hero__headline-line">Danse.</span>
            <span className="hero__headline-line hero__headline-line--accent">Évolue.</span>
            <span className="hero__headline-line">Performe.</span>
          </h1>
          <p className="hero__subheading">
            Cours de hip-hop & urban dance à Puteaux
          </p>
          <div className="hero__cta">
            <Button variant="primary" size="lg" onClick={onBooking}>
              Réserver un cours
            </Button>
          </div>
        </div>

        {/* Reel indicator dots */}
        <div className="hero__reel-dots">
          {REEL_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`hero__reel-dot${i === current ? ' hero__reel-dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span className="hero__scroll-hint-line" />
        <span className="hero__scroll-hint-text">Scroll</span>
      </div>
    </section>
  );
}
