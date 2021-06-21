import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const StarRating = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i < rating) {
            stars.push(<BsStarFill size={15} />);
        }
        else if (i - 1 < rating) {
            stars.push(<BsStarHalf size={15} />);
        }
        else {
            stars.push(<BsStar size={15} />);
        }
    }

    return (
        <div className="rating-star">
            {
                stars.map((star) => <span className="star">{star}</span>)
            }
        </div>
    )
}

export default StarRating;