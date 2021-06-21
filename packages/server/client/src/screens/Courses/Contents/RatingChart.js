import React from 'react';

const RatingChart = ({ ratings, totalReviews }) => {
    return (
        <ul className="indi-star-stat">
            {
                Object.keys(ratings).filter(o => o !== '0').map((r) => (
                    <li className="graph-item" key={`list-${r}`}>
                        <div className="star-bar-label">
                            <span>{r} stars</span>
                        </div>
                        <div className="bar-graph-bar">
                            <div className="bar" style={{ width: `${(ratings[r] / totalReviews).toFixed(2) * 100}%`}}></div>
                        </div>
                        <div className="num-rating">
                            <span>
                                <span>
                                    {(ratings[r] / totalReviews * 100).toFixed(0)}%
                                </span>
                            </span>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default RatingChart;
