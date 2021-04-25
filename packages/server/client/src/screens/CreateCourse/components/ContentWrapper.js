import React from 'react';

const ContentWrapper = ({ children }) => {
    return (
        <>
            <div className="main-content-wrapper">
                {children}
            </div>
        </>
    )
}

export default ContentWrapper;
