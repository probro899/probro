import React from 'react';

const ContentContainer = ({ children }) => {
    return (
        <div className="dashboard-content-wrapper">
            {children}
        </div>
    )
}

export default ContentContainer;
