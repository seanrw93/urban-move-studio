import { useRevealAnimation } from '../../../hooks/useRevealAnimation';
import './About.scss';

const STATS = [
  { value: '12', label: 'Ans de scène' },
  { value: '400+', label: 'Élèves formés' },
  { value: '8', label: 'Villes en tournée' },
  { value: '3', label: 'Compagnies' },
];

export function About() {
  const sectionRef = useRevealAnimation<HTMLElement>(0.12);

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about__grid">
          <div className="about__photo-col reveal">
            <div className="about__photo-wrap">
              <img
                src="/about-sofia.webp"
                alt="Sofia Marchand, professeure de hip-hop"
                className="about__photo"
                loading="lazy"
              />
              <div className="about__photo-grain" />
              <div className="about__photo-tag">
                <span className="about__photo-tag-text">Puteaux, France</span>
              </div>
            </div>
          </div>

          <div className="about__content-col">
            <div className="about__text-block reveal">
              <p className="section__label">À propos</p>
              <h2 className="about__headline">
                <span className="about__headline-line">Née pour</span>
                <span className="about__headline-line about__headline-line--accent">la scène</span>
              </h2>
            </div>

            <div className="about__body reveal reveal--delay-1">
              <p className="about__para">
                Sofia Marchand danse depuis l'âge de huit ans. Formée à Paris et à New York,
                elle a collaboré avec des compagnies de renom avant de revenir en région
                parisienne pour transmettre sa passion. Son approche mêle technique hip-hop
                authentique, sensibilité musicale et exigence artistique.
              </p>
              <p className="about__para">
                Au studio, Sofia enseigne à tous les niveaux — des débutants complets aux
                danseurs confirmés cherchant à affiner leur style. Ses cours combinent
                fondamentaux du mouvement, travail de flow et liberté d'expression, dans une
                atmosphère exigeante mais bienveillante.
              </p>
              <p className="about__para">
                Chaque séance est pensée pour que vous repartiez avec quelque chose de concret :
                une combinaison maîtrisée, un rythme intégré, une confiance gagnée.
              </p>
            </div>

            <div className="about__stats reveal reveal--delay-2">
              <div className="about__stats-rule" />
              <div className="about__stats-grid">
                {STATS.map((stat) => (
                  <div key={stat.label} className="about__stat">
                    <span className="about__stat-value">{stat.value}</span>
                    <span className="about__stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
