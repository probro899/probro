import React from 'react';
import { FiThumbsUp } from "react-icons/fi";
import { StarDisplay } from '../../../common/StarRating';

const ReviewStat = ({ ratingPoint, totalRating, ratingPercentage }) => {
    return (
        <div className="course-rating">
            <div className="review-stat-wrapper" >
                <div className="review-rating">
                    <StarDisplay star={Number(ratingPoint)} />
                    <div className="rating-number">{ratingPoint}</div>
                    <div className="rating-count">{totalRating} ratings</div>
                </div>
                <div className="satisfaction-rating">
                    <span className="ratings-separator">|</span>
                    <div className="satisfaction-rating-content">
                        <span className="rate-icon">
                            <FiThumbsUp />
                        </span>
                        <span className="sat-percentage">{ratingPercentage}%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewStat;
