import { Button } from '../../atoms/Button/Button';
import './PricingCard.scss';

interface PricingCardProps {
  title: string;
  forfaitSlug: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  recommended?: boolean;
  onBook: (forfaitSlug: string) => void;
}

export function PricingCard({
  title,
  forfaitSlug,
  price,
  priceNote,
  description,
  features,
  recommended = false,
  onBook,
}: PricingCardProps) {
  return (
    <div className={`pricing-card${recommended ? ' pricing-card--recommended' : ''}`}>
      {recommended && (
        <div className="pricing-card__badge">Recommandé</div>
      )}
      <div className="pricing-card__header">
        <span className="pricing-card__title">{title}</span>
        <div className="pricing-card__price-wrap">
          <span className="pricing-card__price">{price}</span>
          {priceNote && (
            <span className="pricing-card__price-note">{priceNote}</span>
          )}
        </div>
      </div>
      <p className="pricing-card__description">{description}</p>
      <ul className="pricing-card__features">
        {features.map((f, i) => (
          <li key={i} className="pricing-card__feature">
            <span className="pricing-card__feature-icon" />
            {f}
          </li>
        ))}
      </ul>
      <div className="pricing-card__cta">
        <Button
          variant={recommended ? 'primary' : 'outline'}
          size="md"
          fullWidth
          onClick={() => onBook(forfaitSlug)}
        >
          Réserver
        </Button>
      </div>
    </div>
  );
}
