import React from 'react';


const CardSkeleton = ({ children, title }) => {
    return (
        <div className="pc-card">
            <h3 className="pc-card-title">{title}</h3>
            <div className="pc-card-details">
                {children}
            </div>
        </div>
    )
}

export default CardSkeleton;
