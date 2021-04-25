import React from 'react';
import PropTypes from 'prop-types';

export const FormTextInput = ({
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    label,
    isRequired,
    leftIcon,
    rightElement,
    hasError
}) => {

    return (
        <label className="formLabel" htmlFor={name}>
            <p className="label-text">{label} {isRequired && <span style={{ color: 'red' }}> *</span>} </p>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`pc-input-group ${hasError ? 'has-error' : ''}`}
            />
            <p className="right-icon">{rightElement}</p>
        </label>
    )
}

FormTextInput.defaultProps = {
    type: "text",
    hasError: false
}

FormTextInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}