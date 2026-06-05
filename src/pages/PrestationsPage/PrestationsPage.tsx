import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Button } from '../../components/atoms/Button/Button';
import { useRevealAnimation } from '../../hooks/useRevealAnimation';
import './PrestationsPage.scss';

interface Course {
  kicker: string;
  name: string;
  schedule: string;
  levelBadge: string;
  levelMod: string;
  publicBadge: string;
  description: string;
  list: [string, string, string];
  image: string;
  imageAlt: string;
  courseName: string;
}

const COURSES: Course[] = [
  {
    kicker: 'HIP-HOP',
    name: 'HIP-HOP DÉBUTANTS',
    schedule: 'Lundi 18h00 – 18h45',
    levelBadge: 'Débutant',
    levelMod: 'debutant',
    publicBadge: 'Adultes 18+',
    description:
      'Une introduction complète aux fondamentaux du hip-hop. Rythme, coordination, placement — tout est abordé progressivement. Aucune expérience requise.',
    list: [
      'Apprentissage des bases : groove, bounce, isolation',
      'Chorégraphies courtes pour ancrer les acquis',
      'Ambiance bienveillante, ouvert à tous',
    ],
    image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&q=80',
    imageAlt: 'Cours hip-hop débutants',
    courseName: 'Hip-Hop Débutants — Lundi 18h00',
  },
  {
    kicker: 'HIP-HOP',
    name: 'HIP-HOP INTERMÉDIAIRE',
    schedule: 'Lundi 19h00 – 19h45',
    levelBadge: 'Intermédiaire',
    levelMod: 'intermediaire',
    publicBadge: 'Adultes 18+',
    description:
      'Pour les danseurs ayant déjà les bases. Travail technique approfondi, enchaînements plus longs et musicalité poussée.',
    list: [
      'Technique : footwork, transitions, musicality',
      'Chorégraphies complètes sur des morceaux actuels',
      'Travail en groupe et en solo',
    ],
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80',
    imageAlt: 'Cours hip-hop intermédiaire',
    courseName: 'Hip-Hop Intermédiaire — Lundi 19h00',
  },
  {
    kicker: 'HIP-HOP',
    name: 'HIP-HOP AVANCÉ',
    schedule: 'Samedi 11h00 – 11h45',
    levelBadge: 'Avancé',
    levelMod: 'avance',
    publicBadge: 'Adultes 18+',
    description:
      'Un cours exigeant pour les danseurs confirmés. Performance, improvisation et développement du style personnel.',
    list: [
      'Improvisation et développement du style personnel',
      'Travail de performance scénique',
      'Préparation aux battles et showcases',
    ],
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80',
    imageAlt: 'Cours hip-hop avancé',
    courseName: 'Hip-Hop Avancé — Samedi 11h00',
  },
  {
    kicker: 'URBAN DANCE',
    name: 'URBAN DANCE ADULTES',
    schedule: 'Samedi 10h00 – 10h45',
    levelBadge: 'Débutant',
    levelMod: 'debutant',
    publicBadge: 'Adultes 18+',
    description:
      'Un mélange de styles urbains — new style, waacking, dancehall — dans une ambiance décontractée et bienveillante.',
    list: [
      'Exploration de plusieurs styles urbains',
      "Travail sur l'énergie, le style et la présence",
      'Cours festif et accessible à tous',
    ],
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
    imageAlt: 'Cours urban dance adultes',
    courseName: 'Urban Dance Adultes — Samedi 10h00',
  },
  {
    kicker: 'URBAN DANCE',
    name: 'URBAN DANCE ADOS',
    schedule: 'Mercredi 17h00 – 17h45',
    levelBadge: 'Débutant',
    levelMod: 'debutant',
    publicBadge: 'Ados 12–17 ans',
    description:
      'Un cours spécialement conçu pour les ados. Énergie, créativité et bonne humeur garanties.',
    list: [
      'Styles urbains adaptés aux ados',
      'Développement de la confiance en soi',
      'Ambiance fun et bienveillante',
    ],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    imageAlt: 'Cours urban dance ados',
    courseName: 'Urban Dance Ados — Mercredi 17h00',
  },
];

function CourseSection({ course, reverse }: { course: Course; reverse: boolean }) {
  const ref = useRevealAnimation<HTMLDivElement>();

  return (
    <div
      className={`prestations__course${reverse ? ' prestations__course--reverse' : ''}`}
      ref={ref}
    >
      <div className="prestations__course-image reveal">
        <img src={course.image} alt={course.imageAlt} loading="lazy" />
      </div>
      <div className="prestations__course-content reveal reveal--delay-1">
        <p className="prestations__course-kicker">{course.kicker}</p>
        <h2 className="prestations__course-name">{course.name}</h2>
        <p className="prestations__course-schedule">
          <Clock size={14} aria-hidden="true" />
          {course.schedule}
        </p>
        <div className="prestations__course-badges">
          <span className={`prestations__badge prestations__badge--${course.levelMod}`}>
            {course.levelBadge}
          </span>
          <span className="prestations__badge prestations__badge--public">
            {course.publicBadge}
          </span>
        </div>
        <p className="prestations__course-description">{course.description}</p>
        <ul className="prestations__course-list">
          {course.list.map((item) => (
            <li key={item} className="prestations__course-list-item">{item}</li>
          ))}
        </ul>
        <Link
          to={`/inscription?cours=${encodeURIComponent(course.courseName)}`}
          className="prestations__course-cta"
        >
          <Button variant="primary" size="md">
            S'inscrire à ce cours
          </Button>
        </Link>
      </div>
    </div>
  );
}

function CtaBanner() {
  const ref = useRevealAnimation<HTMLDivElement>();
  return (
    <div className="prestations__cta-banner" ref={ref}>
      <div className="reveal">
        <h2 className="prestations__cta-banner-heading">PRÊT À COMMENCER ?</h2>
        <p className="prestations__cta-banner-sub">Inscrivez-vous en ligne en quelques minutes.</p>
        <Link to="/inscription">
          <Button variant="primary" size="lg">
            Voir les inscriptions
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function PrestationsPage() {
  const headerRef = useRevealAnimation<HTMLDivElement>();

  return (
    <main className="prestations-page">
      <div className="prestations__header container" ref={headerRef}>
        <Link to="/" className="prestations__back reveal">
          &larr; Accueil
        </Link>
        <p className="prestations__kicker reveal reveal--delay-1">NOS COURS</p>
        <h1 className="prestations__heading reveal reveal--delay-2">LES PRESTATIONS</h1>
        <p className="prestations__subheading reveal reveal--delay-3">
          Découvrez nos cours de hip-hop et urban dance, ouverts à tous les niveaux et tous les âges.
        </p>
      </div>

      <div className="prestations__courses container">
        {COURSES.map((course, i) => (
          <div key={course.courseName}>
            <CourseSection course={course} reverse={i % 2 !== 0} />
            {i < COURSES.length - 1 && <hr className="prestations__divider" />}
          </div>
        ))}
      </div>

      <CtaBanner />
    </main>
  );
}
