import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from 'prop-types';

const STYLES = [
    "btn--primary--solid",
    "btn--warning--solid",
    "btn--danger--solid",
    "btn--success--solid",
    "btn--primary--outline",
    "btn--warning--outline",
    "btn--danger--outline",
    "btn--success--outline",
    "btn-drawing-icon",
    "btn-drawing-icon-danger",
    "btn--circle-icons",
    "btn-circle",
];

const SIZES = ["btn--medium", "btn--small", "btn--large"];
const ICON_POSITION = ["left", "right"];

export const Button = ({
    type,
    onClick,
    buttonStyle,
    buttonSize,
    loading,
    disabled,
    title,
    icon,
    iconPosition,
    className
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const checkIconPosition = ICON_POSITION.includes(iconPosition) ? iconPosition : ICON_POSITION[0];
    return (
        <button
            className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkIconPosition} ${className}`}
            onClick={onClick}
            type={type}
            loading={loading}
            disabled={disabled || loading}
        >
            {
                loading && <div className="loader-wrapper">
                    <ClipLoader
                        size={15}
                        color={"#fff"}
                    />
                </div>
            }
            <span>{icon}{title}</span>
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    buttonStyle: PropTypes.string,
    buttonSize: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.any,
    iconPosition: PropTypes.string,
};
