import React from 'react';

const OverviewDescription = ({ title, children }) => {
    return (
        <div className="course-overview-row description">
            <div className="row-title">{title}</div>
            <div className="row-detail">
                {children}
            </div>
        </div>
    )
}

export default OverviewDescription;
