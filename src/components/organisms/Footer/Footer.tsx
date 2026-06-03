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
                {['Cours', 'Tarifs', 'Réserver', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="footer__nav-link">
                      {item}
                    </a>
                  </li>
                ))}
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
        </div>
      </div>
    </footer>
  );
}
