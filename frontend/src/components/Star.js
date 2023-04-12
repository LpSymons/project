import React from 'react';

export const Star = ({ rating, reviews }) => {
  const starRating = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <i key={index}>
        {rating >= index + 1 ? (
          <span className="fas fa-star"></span>
        ) : rating >= number ? (
          <span className="fas fa-star-half-alt"></span>
        ) : (
          <span className="far fa-star"></span>
        )}
      </i>
    );
  });

  return (
    <div className="starRating">
      <span className="icon-style">
        {starRating}
        <span>{reviews} reviews</span>
      </span>
    </div>
  );
};
