import React from 'react';
import PropTypes from 'prop-types';

const HeaderBanner = ({ title, subTitle, bgColor }) => {
    return (
        <div className="intro-banner" style={{ backgroundColor: bgColor }}>
            <h2 className="intro-banner__title">{title}</h2>
            <p className="intro-banner__subTitle">{subTitle}</p>
        </div>
    )
}

HeaderBanner.defaultProps = {
    bgColor: '#009be8'
}

HeaderBanner.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
};

export default HeaderBanner;
