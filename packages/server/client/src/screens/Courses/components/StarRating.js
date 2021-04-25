import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const StarRating = () => {
    return (
        <div className="rating-star">
            <span className="star"><BsStarFill size={15} /></span>
            <span className="star"><BsStarFill size={15} /></span>
            <span className="star"><BsStarFill size={15} /></span>
            <span className="star"><BsStarHalf size={15} /></span>
            <span className="star"><BsStar size={15} /></span>
        </div>
    )
}

export default StarRating;
