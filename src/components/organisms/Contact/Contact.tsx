import { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { useRevealAnimation } from '../../../hooks/useRevealAnimation';
import './Contact.scss';

type IconComponent = React.ComponentType<{ size?: number; color?: string; className?: string }>;

const CONTACT_INFO: { icon: IconComponent; value: string; href: string; external: boolean }[] = [
  {
    icon: Mail,
    value: 'contact@sofiamarchand.fr',
    href: 'mailto:contact@sofiamarchand.fr',
    external: false,
  },
  {
    icon: FaInstagram as IconComponent,
    value: '@sofiamarchand.dance',
    href: 'https://instagram.com/sofiamarchand.dance',
    external: true,
  },
  {
    icon: MapPin,
    value: '12 Rue de la République, 92800 Puteaux',
    href: 'https://maps.google.com/?q=12+Rue+de+la+République+92800+Puteaux',
    external: true,
  },
];

type FormState = 'idle' | 'submitting' | 'sent' | 'error';

export function Contact() {
  const sectionRef = useRevealAnimation<HTMLElement>(0.1);
  const [formState, setFormState] = useState<FormState>('idle');
  const [fields, setFields] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    await new Promise((res) => setTimeout(res, 1000));
    setFormState('sent');
  };

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="contact__grain" aria-hidden="true" />
      <div className="container">
        <div className="contact__header section__header reveal">
          <p className="section__label">Contact</p>
          <h2 className="section__title">Écrivez-nous</h2>
        </div>

        <div className="contact__body">
          <div className="contact__info reveal reveal--delay-1">
            <p className="contact__intro">
              Une question sur les cours, les horaires ou les tarifs ? Envoyez-nous un message
              et nous vous répondrons dans les 24 heures.
            </p>
            <div className="contact__info-block">
              <ul className="contact__info-list">
                {CONTACT_INFO.map((item) => (
                  <li key={item.href} className="contact__info-item">
                    <span className="contact__info-icon">
                      <item.icon size={18} color="#f5e642" />
                    </span>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="contact__info-value"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="contact__form-wrap reveal reveal--delay-2">
            {formState === 'sent' ? (
              <div className="contact__success">
                <p className="contact__success-title">Message envoyé !</p>
                <p className="contact__success-body">
                  Merci de nous avoir contactés. Nous vous répondrons très bientôt.
                </p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="contact__field">
                  <label className="contact__label" htmlFor="contact-name">Nom</label>
                  <input
                    id="contact-name"
                    className="contact__input"
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="contact__field">
                  <label className="contact__label" htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    className="contact__input"
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="contact__field">
                  <label className="contact__label" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    className="contact__textarea"
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Comment pouvons-nous vous aider ?"
                    rows={5}
                    required
                  />
                </div>

                {formState === 'error' && (
                  <p className="contact__error">
                    Une erreur s'est produite. Veuillez réessayer.
                  </p>
                )}

                <div className="contact__submit-wrap">
                  <button
                    className="contact__submit"
                    type="submit"
                    disabled={formState === 'submitting'}
                  >
                    {formState === 'submitting' ? 'Envoi…' : 'Envoyer le message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
