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
    rightElement
}) => {

    return (
        <>
            <label className="formLabel" htmlFor={name}>
                <p className="label-text">{label} {isRequired && <span style={{ color: 'red' }}> *</span>} </p>
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    className={className}
                
                />
                <p className="right-icon">{rightElement}</p>
            </label>
        </>
    )
}

FormTextInput.defaultProps = {
    type: "text",
    className: ""
}

FormTextInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}