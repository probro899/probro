import React from 'react';

export function FormDateField({
    name,
    label,
    className,
    placeholder,
    maxDate,
    onChange,
    value,
    type,
    rightElement,
    isRequired,
    error
}) {
    return (
        <>
            <label className="formLabel" htmlFor={name}>
                <p className="label-text">{label} {isRequired && <span style={{ color: 'red' }}> *</span>} </p>
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    max={maxDate}
                    onChange={onChange}
                    value={value}
                    className={className}
                    style={error && { border: 'solid 1px red' }}
                />
                {error && <p className="error-message">{error}</p>}
                <p className="right-icon">{rightElement}</p>
            </label>
        </>
    )
}