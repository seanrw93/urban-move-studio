import { useRevealAnimation } from '../../../hooks/useRevealAnimation';
import { TestimonialCard } from '../../molecules/TestimonialCard/TestimonialCard';
import './Testimonials.scss';

const TESTIMONIALS = [
  {
    name: 'Camille Renard',
    role: 'Élève depuis 2 ans',
    quote:
      'Sofia a une façon unique d\'enseigner qui met tout le monde à l\'aise, débutants comme confirmés. J\'ai progressé plus en six mois qu\'en trois ans ailleurs.',
    rating: 5,
  },
  {
    name: 'Kévin Mbaye',
    role: 'Forfait Semestriel',
    quote:
      'L\'ambiance du studio est incroyable. Les cours sont intenses, bien structurés, et Sofia repère immédiatement ce qu\'on doit travailler. Je recommande sans hésitation.',
    rating: 5,
  },
  {
    name: 'Inès Charpentier',
    role: 'Cours Découverte',
    quote:
      'J\'avais jamais dansé de ma vie. Après le premier cours découverte, je me suis abonnée directement. L\'atmosphère est pro mais jamais intimidante.',
    rating: 5,
  },
];

export function Testimonials() {
  const sectionRef = useRevealAnimation<HTMLElement>();

  return (
    <section className="testimonials section" ref={sectionRef}>
      <div className="container">
        <div className="testimonials__header section__header reveal">
          <p className="section__label">Avis</p>
          <h2 className="section__title">Ce qu'ils disent</h2>
        </div>
        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`reveal reveal--delay-${i + 1}`}>
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
