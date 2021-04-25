import React from 'react';

const OverviewDescription = ({ title, content }) => {
    return (
        <div className="course-overview-row description">
            <div className="row-title">{title}</div>
            <div className="row-detail" dangerouslySetInnerHTML={{ __html: content }}>
            </div>
        </div>
    )
}

export default OverviewDescription;
