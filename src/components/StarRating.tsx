import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

export function StarRating({ rating, onChange, readonly = false, size = 20 }: StarRatingProps) {
  const handleClick = (value: number) => {
    if (!readonly && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={size}
          className={`star ${value <= rating ? 'filled' : 'empty'} ${!readonly ? 'cursor-pointer' : ''}`}
          onClick={() => handleClick(value)}
          fill={value <= rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}
