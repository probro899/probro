import React from 'react';

const ContentHeader = ({ title }) => {
    return (
        <>
            <div className="header-wrapper">
                <div className="header-wrapper-container">
                    <h2 className="header-title">{title}</h2>
                </div>
            </div>
        </>
    )
}

export default ContentHeader;
