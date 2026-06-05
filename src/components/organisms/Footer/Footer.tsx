import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import './Footer.scss';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__logo">Sofia Marchand</span>
            <p className="footer__tagline">
              Hip-Hop & Urban Dance Studio
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <p className="footer__col-title">Adresse</p>
              <address className="footer__address">
                <p>Studio Urban Move</p>
                <p>12 Rue de la République</p>
                <p>92800 Puteaux</p>
                <p>Hauts-de-Seine, France</p>
              </address>
            </div>

            <div className="footer__col">
              <p className="footer__col-title">Contact</p>
              <ul className="footer__contact-list">
                <li className="footer__contact-item">
                  <Mail size={14} color="#f5e642" className="footer__contact-icon" />
                  <a
                    href="mailto:contact@sofiamarchand.fr"
                    className="footer__contact-link"
                  >
                    contact@sofiamarchand.fr
                  </a>
                </li>
                <li className="footer__contact-item">
                  <FaInstagram size={14} color="#f5e642" className="footer__contact-icon" />
                  <a
                    href="https://instagram.com/sofiamarchand.dance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__contact-link"
                  >
                    @sofiamarchand.dance
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__col">
              <p className="footer__col-title">Navigation</p>
              <ul className="footer__nav-list">
                <li>
                  <Link to="/" className="footer__nav-link">Accueil</Link>
                </li>
                <li>
                  <Link to="/prestations" className="footer__nav-link">Prestations</Link>
                </li>
                <li>
                  <Link to="/inscription" className="footer__nav-link">Inscriptions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; 2025 Sofia Marchand &mdash; Tous droits réservés
          </p>
          <p className="footer__legal">
            Cours collectifs de danse &bull; Puteaux, Hauts-de-Seine
          </p>
          <p className="footer__built">
            Site réalisé par srw-dev —{' '}
            <a
              href="https://srwdev.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__srwdev"
            >
              srwdev.fr
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
