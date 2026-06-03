import './StarRating.scss';

interface StarRatingProps {
  rating: number;
  max?: number;
}

export function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div className="star-rating" aria-label={`${rating} sur ${max} étoiles`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`star-rating__star${i < rating ? ' star-rating__star--filled' : ''}`}
        />
      ))}
    </div>
  );
}
