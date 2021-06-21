import React from 'react';

const ProgressBar = ({ width }) => {
    return (
        <div className="main-progress-bar" style={{ width: width + '%' }}></div>
    )
}

ProgressBar.defaultProps = {
    width: '100'
}

export default ProgressBar;
