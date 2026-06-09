import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Clock } from 'lucide-react';
import { Button } from '../../components/atoms/Button/Button';
import { JotformModal } from '../../components/organisms/JotformModal/JotformModal';
import { useRevealAnimation } from '../../hooks/useRevealAnimation';
import './InscriptionPage.scss';

interface Course {
  name: string;
  displayName: string;
  schedule: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  public: 'Adultes' | 'Ados';
  seats: number;
  category: string;
  description: string;
}

const ALL_COURSES: Course[] = [
  {
    name: 'Hip-Hop Débutants — Lundi 18h00',
    displayName: 'Hip-Hop Débutants',
    schedule: 'Lundi 18h00 – 18h45',
    level: 'Débutant',
    public: 'Adultes',
    seats: 10,
    category: 'HIP-HOP',
    description: 'Une introduction complète aux fondamentaux du hip-hop. Aucune expérience requise.',
  },
  {
    name: 'Hip-Hop Intermédiaire — Lundi 19h00',
    displayName: 'Hip-Hop Intermédiaire',
    schedule: 'Lundi 19h00 – 19h45',
    level: 'Intermédiaire',
    public: 'Adultes',
    seats: 8,
    category: 'HIP-HOP',
    description: 'Travail technique approfondi, enchaînements plus longs et musicalité poussée.',
  },
  {
    name: 'Hip-Hop Avancé — Samedi 11h00',
    displayName: 'Hip-Hop Avancé',
    schedule: 'Samedi 11h00 – 11h45',
    level: 'Avancé',
    public: 'Adultes',
    seats: 6,
    category: 'HIP-HOP',
    description: 'Performance, improvisation et développement du style personnel.',
  },
  {
    name: 'Urban Dance Adultes — Samedi 10h00',
    displayName: 'Urban Dance Adultes',
    schedule: 'Samedi 10h00 – 10h45',
    level: 'Débutant',
    public: 'Adultes',
    seats: 10,
    category: 'URBAN DANCE',
    description: 'New style, waacking, dancehall — dans une ambiance décontractée et bienveillante.',
  },
  {
    name: 'Urban Dance Ados — Mercredi 17h00',
    displayName: 'Urban Dance Ados',
    schedule: 'Mercredi 17h00 – 17h45',
    level: 'Débutant',
    public: 'Ados',
    seats: 12,
    category: 'URBAN DANCE',
    description: 'Un cours spécialement conçu pour les ados. Énergie, créativité et bonne humeur.',
  },
];

const LEVEL_MOD: Record<string, string> = {
  'Débutant': 'debutant',
  'Intermédiaire': 'intermediaire',
  'Avancé': 'avance',
};

function CourseCard({
  course,
  onInscrire,
  highlighted,
  cardRef,
}: {
  course: Course;
  onInscrire: (name: string) => void;
  highlighted: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const lowSeats = course.seats <= 2;

  return (
    <div
      ref={cardRef}
      className={`course-card${highlighted ? ' course-card--highlighted' : ''}`}
    >
      <p className="course-card__category">{course.category}</p>
      <h3 className="course-card__name">{course.displayName}</h3>
      <p className="course-card__schedule">
        <Clock size={13} aria-hidden="true" />
        {course.schedule}
      </p>
      <div className="course-card__badges">
        <span className={`course-card__badge course-card__badge--${LEVEL_MOD[course.level]}`}>
          {course.level}
        </span>
        <span className="course-card__badge course-card__badge--public">
          {course.public === 'Ados' ? 'Ados 12–17 ans' : 'Adultes 18+'}
        </span>
      </div>
      <p className="course-card__description">{course.description}</p>
      <p className={`course-card__seats${lowSeats ? ' course-card__seats--urgent' : ''}`}>
        {lowSeats
          ? `Plus que ${course.seats} place${course.seats > 1 ? 's' : ''} !`
          : `${course.seats} places disponibles`}
      </p>
      <div className="course-card__cta">
        <Button variant="primary" size="md" fullWidth onClick={() => onInscrire(course.name)}>
          S'inscrire à ce cours
        </Button>
      </div>
    </div>
  );
}

export default function InscriptionPage() {
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const [age, setAge] = useState('all');
  const [highlightedName, setHighlightedName] = useState<string | null>(null);

  const headerRef = useRevealAnimation<HTMLDivElement>();
  const catalogRef = useRevealAnimation<HTMLDivElement>();
  const pricingRef = useRevealAnimation<HTMLDivElement>();

  const cardRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>(
    Object.fromEntries(ALL_COURSES.map((c) => [c.name, { current: null }]))
  );

  useEffect(() => {
    const cours = searchParams.get('cours');
    if (!cours) return;

    const decoded = decodeURIComponent(cours);
    const match = ALL_COURSES.find((c) => c.name === decoded);
    if (!match) return;

    setHighlightedName(match.name);

    const el = cardRefs.current[match.name]?.current;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const timer = setTimeout(() => {
      setSelectedCourse(match.name);
      setIsModalOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleInscrire = (name: string) => {
    setSelectedCourse(name);
    setIsModalOpen(true);
  };

  const filtered = useMemo(() => {
    return ALL_COURSES.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = level === 'all' || course.level === level;
      const matchesAge = age === 'all' || course.public === age;
      return matchesSearch && matchesLevel && matchesAge;
    });
  }, [search, level, age]);

  const categories = [...new Set(filtered.map((c) => c.category))];

  return (
    <>
      <div className="inscription-page">
        <div className="inscription__header container" ref={headerRef}>
          <Link to="/" className="inscription__back reveal">
            &larr; Accueil
          </Link>
          <p className="inscription__kicker reveal reveal--delay-1">URBAN MOVE STUDIO</p>
          <h1 className="inscription__heading reveal reveal--delay-2">INSCRIPTIONS 2025 – 2026</h1>
          <p className="inscription__subheading reveal reveal--delay-3">
            Choisissez votre cours et remplissez le formulaire d'inscription en ligne.
          </p>
        </div>

        <div className="inscription__filter-bar-wrap">
          <div className="inscription__filter-bar container">
            <div className="inscription__search">
              <Search size={16} className="inscription__search-icon" aria-hidden="true" />
              <input
                type="text"
                className="inscription__search-input"
                placeholder="Rechercher un cours..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Rechercher un cours"
              />
            </div>
            <select
              className="inscription__select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              aria-label="Filtrer par niveau"
            >
              <option value="all">Tous les niveaux</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
            </select>
            <select
              className="inscription__select"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              aria-label="Filtrer par public"
            >
              <option value="all">Tous</option>
              <option value="Ados">Ados (12–17 ans)</option>
              <option value="Adultes">Adultes</option>
            </select>
          </div>
        </div>

        <div className="inscription__catalog container" ref={catalogRef}>
          {filtered.length === 0 && (
            <p className="inscription__empty">Aucun cours ne correspond à votre recherche.</p>
          )}
          {categories.map((cat) => (
            <div key={cat} className="inscription__category reveal">
              <h2 className="inscription__category-heading">{cat}</h2>
              <div className="inscription__grid">
                {filtered
                  .filter((c) => c.category === cat)
                  .map((course) => (
                    <CourseCard
                      key={course.name}
                      course={course}
                      onInscrire={handleInscrire}
                      highlighted={highlightedName === course.name}
                      cardRef={cardRefs.current[course.name] as React.RefObject<HTMLDivElement | null>}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="inscription__pricing section" ref={pricingRef}>
          <div className="container">
            <div className="inscription__pricing-header reveal">
              <p className="section__label">Tarifs</p>
              <h2 className="section__title">Nos Forfaits</h2>
            </div>
            <div className="inscription__pricing-grid">
              <div className="inscription__forfait reveal reveal--delay-1">
                <p className="inscription__forfait-title">Cours Découverte</p>
                <p className="inscription__forfait-price">25€ <span>la séance</span></p>
              </div>
              <div className="inscription__forfait reveal reveal--delay-2">
                <p className="inscription__forfait-title">Forfait Mensuel</p>
                <p className="inscription__forfait-price">80€ <span>/ mois (4 cours)</span></p>
              </div>
              <div className="inscription__forfait reveal reveal--delay-3">
                <p className="inscription__forfait-title">Forfait Semestriel</p>
                <p className="inscription__forfait-price">280€ <span>/ semestre (20 cours)</span></p>
              </div>
            </div>
            <div className="inscription__pricing-notes reveal">
              <p className="inscription__pricing-note">
                Règlement par virement bancaire, chèque ou espèces.
                Paiement en 3 fois par chèque possible pour le forfait semestriel.
                Cotisation annuelle&nbsp;: 20€ (adhésion obligatoire).
                Certificat médical de moins de 3 mois requis.
              </p>
            </div>
          </div>
        </div>
      </div>

      <JotformModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCourse(undefined);
        }}
        selectedCourse={selectedCourse}
      />
    </>
  );
}
