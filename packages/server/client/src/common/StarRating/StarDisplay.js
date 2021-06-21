import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const StarRating = ({ star }) => {
  const ratings = [1, 2, 3, 4, 5];
  const getIcon = (obj) => {
    if (star >= obj) {
      return <BsStarFill size={15} />;
    }
    if (obj > 0 && star > obj - 1) {
      return <BsStarHalf size={15} />;
    }
    return <BsStar size={15} />;
  };

  return (
    <div className="rating-star">
      {
        ratings.map((obj, idx) => <span key={`star-${idx}`} className="star">{getIcon(obj)}</span>)
      }
    </div>
  );
};

export default StarRating;
