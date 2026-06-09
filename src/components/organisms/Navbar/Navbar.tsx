import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '../../atoms/Button/Button';
import './Navbar.scss';

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
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const scrollToContact = () => {
    closeMenu();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          Sofia Marchand
        </Link>

        <nav className="navbar__nav" aria-label="Navigation principale">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar__nav-link${isActive ? ' navbar__nav-link--active' : ''}`
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/prestations"
            className={({ isActive }) =>
              `navbar__nav-link${isActive ? ' navbar__nav-link--active' : ''}`
            }
          >
            Prestations
          </NavLink>
          <NavLink
            to="/inscription"
            className={({ isActive }) =>
              `navbar__nav-link${isActive ? ' navbar__nav-link--active' : ''}`
            }
          >
            Tarifs &amp; Inscriptions
          </NavLink>
          <button onClick={scrollToContact} className="navbar__nav-link navbar__nav-link--btn">
            Contact
          </button>
          <Link to="/inscription" className="navbar__cta">
            <Button variant="primary" size="sm">
              S'inscrire
            </Button>
          </Link>
        </nav>

        <button
          className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
        >
          <span className="navbar__burger-line" />
          <span className="navbar__burger-line" />
          <span className="navbar__burger-line" />
        </button>
      </div>

      <div
        id="navbar-menu"
        className={`navbar__overlay${menuOpen ? ' navbar__overlay--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="navbar__overlay-nav" aria-label="Navigation mobile">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar__overlay-link${isActive ? ' navbar__overlay-link--active' : ''}`
            }
            onClick={closeMenu}
          >
            Accueil
          </NavLink>
          <NavLink
            to="/prestations"
            className={({ isActive }) =>
              `navbar__overlay-link${isActive ? ' navbar__overlay-link--active' : ''}`
            }
            onClick={closeMenu}
          >
            Prestations
          </NavLink>
          <NavLink
            to="/inscription"
            className={({ isActive }) =>
              `navbar__overlay-link${isActive ? ' navbar__overlay-link--active' : ''}`
            }
            onClick={closeMenu}
          >
            Tarifs &amp; Inscriptions
          </NavLink>
          <button onClick={scrollToContact} className="navbar__overlay-link navbar__overlay-link--btn">
            Contact
          </button>
          <div className="navbar__overlay-cta">
            <Link to="/inscription" onClick={closeMenu}>
              <Button variant="primary" size="md" fullWidth>
                S'inscrire
              </Button>
            </Link>
          </div>
        </nav>
        <div className="navbar__overlay-footer">
          <span className="navbar__overlay-tagline">Puteaux, Hauts-de-Seine</span>
        </div>
      </div>
    </header>
  );
}
