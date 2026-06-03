import { useState, useEffect } from 'react';
import { NavLink } from '../../molecules/NavLink/NavLink';
import './Navbar.scss';

const NAV_ITEMS = [
  { label: 'Cours', href: '#how-it-works' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Réserver', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}>
          Sofia Marchand
        </a>

        <nav className="navbar__nav" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span className="navbar__burger-line" />
          <span className="navbar__burger-line" />
          <span className="navbar__burger-line" />
        </button>
      </div>

      <div className={`navbar__overlay${menuOpen ? ' navbar__overlay--open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="navbar__overlay-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              variant="overlay"
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="navbar__overlay-footer">
          <span className="navbar__overlay-tagline">Puteaux, Hauts-de-Seine</span>
        </div>
      </div>
    </header>
  );
}
