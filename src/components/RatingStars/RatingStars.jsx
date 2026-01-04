import { useState } from 'react';
import styles from './styles.module.scss';

function RatingStars({ rating = 0, onRatingChange = null, size = 'medium', showText = false }) {
    const [hoverRating, setHoverRating] = useState(0);
    const isInteractive = onRatingChange !== null;

    const handleClick = (e, value) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInteractive) {
            onRatingChange(value);
        }
    };

    const handleMouseEnter = (value) => {
        if (isInteractive) {
            setHoverRating(value);
        }
    };

    const handleMouseLeave = () => {
        if (isInteractive) {
            setHoverRating(0);
        }
    };

    const displayRating = hoverRating || rating;

    return (
        <div className={`${styles.ratingStars} ${styles[size]}`}>
            <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`${styles.star} ${
                            star <= displayRating ? styles.filled : ''
                        } ${isInteractive ? styles.interactive : ''}`}
                        onClick={(e) => handleClick(e, star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        role={isInteractive ? 'button' : undefined}
                        tabIndex={isInteractive ? 0 : undefined}
                    >
                        ★
                    </span>
                ))}
            </div>
            {showText && (
                <span className={styles.ratingText}>
                    {rating > 0 ? `${rating.toFixed(1)} / 5` : 'Chưa có đánh giá'}
                </span>
            )}
        </div>
    );
}

export default RatingStars;
