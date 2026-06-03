import { useRevealAnimation } from '../../../hooks/useRevealAnimation';
import { PricingCard } from '../../molecules/PricingCard/PricingCard';
import './Pricing.scss';

const PACKAGES = [
  {
    title: 'Cours Découverte',
    price: '€25',
    description:
      'Un seul cours pour découvrir l\'ambiance du studio, la pédagogie de Sofia et les fondamentaux du hip-hop.',
    features: [
      '1 séance de 75 minutes',
      'Tous niveaux acceptés',
      'Accès aux vestiaires',
      'Bilan personnalisé post-séance',
    ],
    recommended: false,
  },
  {
    title: 'Forfait Mensuel',
    price: '€80',
    priceNote: '/ mois',
    description:
      'La formule idéale pour progresser régulièrement. Quatre cours par mois avec accès prioritaire aux créneaux.',
    features: [
      '4 cours par mois',
      'Accès aux replays vidéo',
      'Réservation prioritaire',
      'Accès au groupe privé en ligne',
      'Séance de rattrapage incluse',
    ],
    recommended: true,
  },
  {
    title: 'Forfait Semestriel',
    price: '€280',
    priceNote: '/ semestre',
    description:
      'Six mois de danse intensive pour ceux qui veulent vraiment performer. La meilleure valeur pour une progression durable.',
    features: [
      'Cours illimités sur 6 mois',
      'Coaching individuel mensuel',
      'Accès aux workshops exclusifs',
      'Participation aux showcases',
      'Accès aux replays & ressources',
    ],
    recommended: false,
  },
];

interface PricingProps {
  onBook: (packageName: string) => void;
}

export function Pricing({ onBook }: PricingProps) {
  const sectionRef = useRevealAnimation<HTMLElement>();

  return (
    <section className="pricing section" id="pricing" ref={sectionRef}>
      <div className="container">
        <div className="pricing__header section__header reveal">
          <p className="section__label">Tarifs</p>
          <h2 className="section__title">Nos Formules</h2>
        </div>
        <div className="pricing__grid">
          {PACKAGES.map((pkg, i) => (
            <div key={pkg.title} className={`reveal reveal--delay-${i + 1}`}>
              <PricingCard {...pkg} onBook={onBook} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
