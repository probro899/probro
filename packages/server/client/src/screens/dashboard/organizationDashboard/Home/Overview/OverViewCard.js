import React from 'react';

const OverViewCard = ({ title, number }) => {
    return (
        <div className="pc-card-container">
            <div className="pc-card-wrapper">
                <p className="pc-card-title">{title}</p>
                <h2 className="pc-card-stat">{number}</h2>
            </div>
        </div>
    )
}

export default OverViewCard;
