import React from 'react';

const OverViewCard = ({ title, number, icon, className }) => {
    return (
        <div className="pc-card-container">
            <div className={`pc-card-body ${className}`}>
                <div className="pc-card-header">
                    <span className="card-icon">
                        {icon}
                    </span>
                    <div className="card-count">
                        <h2 className="pc-card-stat">{number}</h2>
                    </div>
                </div>
                <div className="pc-card-info">
                    <p className="pc-card-title">{title}</p>
                    <div className="card-progress">
                        <div className="pc-progress-bar">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverViewCard;
