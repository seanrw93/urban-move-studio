import { StarRating } from '../../atoms/StarRating/StarRating';
import './TestimonialCard.scss';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export function TestimonialCard({ name, role, quote, rating }: TestimonialCardProps) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-card__stars">
        <StarRating rating={rating} />
      </div>
      <blockquote className="testimonial-card__quote">
        <p className="testimonial-card__text">{quote}</p>
      </blockquote>
      <div className="testimonial-card__author">
        <span className="testimonial-card__name">{name}</span>
        <span className="testimonial-card__role">{role}</span>
      </div>
    </div>
  );
}
