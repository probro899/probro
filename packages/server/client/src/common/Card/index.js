import React, { Children } from 'react';

const Card = ({ children }) => {
    return (
        <div className="pc-card">
            {children}
        </div>
    )
}

export default Card;
