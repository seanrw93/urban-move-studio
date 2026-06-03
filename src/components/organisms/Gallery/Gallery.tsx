import { useRevealAnimation } from '../../../hooks/useRevealAnimation';
import './Gallery.scss';

const INSTAGRAM_URL = 'https://instagram.com/sofiamarchand.dance';

const ITEMS = [
  { webp: 'gallery-2.webp', fallback: 'gallery-2.gif',  alt: 'Hip-hop en mouvement', span: 'wide'   },
  { webp: 'gallery-4.webp', fallback: 'gallery-4.gif',  alt: 'Danse urbaine',        span: 'tall'   },
  { webp: 'gallery-1.webp', fallback: 'gallery-1.webp', alt: 'Cours de hip-hop',     span: 'normal' },
  { webp: 'gallery-3.webp', fallback: 'gallery-3.webp', alt: 'Session au studio',    span: 'normal' },
  { webp: 'gallery-5.webp', fallback: 'gallery-5.webp', alt: 'Préparation scène',    span: 'normal' },
] as const;

export function Gallery() {
  const sectionRef = useRevealAnimation<HTMLElement>(0.08);

  return (
    <section className="gallery section" ref={sectionRef}>
      <div className="container">
        <div className="gallery__header section__header reveal">
          <div className="gallery__header-left">
            <p className="section__label">Galerie</p>
            <h2 className="section__title">Sur le vif</h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery__ig-link"
          >
            <span className="gallery__ig-icon" />
            <span className="gallery__ig-handle">@sofiamarchand.dance</span>
          </a>
        </div>

        <div className="gallery__grid reveal reveal--delay-1">
          {ITEMS.map((item) => (
            <a
              key={item.webp}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`gallery__item gallery__item--${item.span}`}
              aria-label={`Voir sur Instagram — ${item.alt}`}
            >
              <picture>
                <source srcSet={`/${item.webp}`} type="image/webp" />
                <img
                  src={`/${item.fallback}`}
                  alt={item.alt}
                  className="gallery__img"
                  loading="lazy"
                />
              </picture>
              <div className="gallery__overlay">
                <span className="gallery__overlay-icon" />
                <span className="gallery__overlay-text">@sofiamarchand.dance</span>
              </div>
            </a>
          ))}

          {/* CTA tile */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery__item gallery__item--cta"
            aria-label="Suivre sur Instagram"
          >
            <div className="gallery__cta-tile">
              <span className="gallery__cta-icon" />
              <p className="gallery__cta-title">Follow the journey</p>
              <p className="gallery__cta-handle">@sofiamarchand.dance</p>
            </div>
          </a>
        </div>

        <div className="gallery__footer reveal reveal--delay-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery__footer-link"
          >
            <span className="gallery__footer-text">Voir tout sur Instagram</span>
            <span className="gallery__footer-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
