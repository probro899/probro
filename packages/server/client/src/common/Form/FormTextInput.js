import React from 'react';
import PropTypes from 'prop-types';

export const FormTextInput = ({
    name,
    type,
    placeholder,
    onChange,
    value,
    label,
    isRequired,
    rightElement,
    leftElement,
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
                className={`pc-input-group ${hasError ? 'has-error' : ''} ${leftElement ? 'left-icon' : ''} `}
            />
            <p className="icon left">{leftElement}</p>
            <p className="icon right">{rightElement}</p>
        </label>
    )
}

FormTextInput.defaultProps = {
    type: "text",
    hasError: false,
    placeholder: '',
}

FormTextInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}
