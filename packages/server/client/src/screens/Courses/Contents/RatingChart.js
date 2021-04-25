import React from 'react';

const RatingChart = ({ reviews }) => {
    return (
        <>
            <ul className="indi-star-stat">
                {
                    reviews.map((review) => (
                        <li className="graph-item">
                            <div className="star-bar-label">
                                <span>{review.star} stars</span>
                            </div>
                            <div className="bar-graph-bar">
                                <div className="bar" style={{width: review.rating + '%'}}></div>
                            </div>
                            <div className="num-rating">
                                <span>
                                    <span>
                                        {review.rating}%
                                        </span>
                                </span>
                            </div>
                        </li>
                    ))
                }

            </ul>
        </>
    )
}

export default RatingChart;
