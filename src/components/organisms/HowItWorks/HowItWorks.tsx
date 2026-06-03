import { useRevealAnimation } from '../../../hooks/useRevealAnimation';
import { StepItem } from '../../molecules/StepItem/StepItem';
import './HowItWorks.scss';

const STEPS = [
  {
    number: 1,
    title: 'Choisis ton forfait',
    description:
      'Découvre les formules adaptées à ton niveau et à ta disponibilité — du cours découverte à l\'abonnement semestriel.',
  },
  {
    number: 2,
    title: 'Sélectionne ton créneau',
    description:
      'Consulte le calendrier en ligne et réserve le jour et l\'heure qui te conviennent, sans engagement immédiat.',
  },
  {
    number: 3,
    title: 'Confirme et danse',
    description:
      'Reçois ta confirmation par email, présente-toi au studio et laisse la musique faire le reste.',
  },
];

export function HowItWorks() {
  const sectionRef = useRevealAnimation<HTMLElement>(0.15);

  return (
    <section className="how-it-works section" id="how-it-works" ref={sectionRef}>
      <div className="container">
        <div className="how-it-works__header section__header reveal">
          <p className="section__label">Processus</p>
          <h2 className="section__title">Comment ca marche</h2>
        </div>
        <div className="how-it-works__grid">
          {STEPS.map((step, i) => (
            <div key={step.number} className={`reveal reveal--delay-${i + 1}`}>
              <StepItem {...step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
