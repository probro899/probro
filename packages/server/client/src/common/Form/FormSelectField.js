import React from 'react';

export function FormSelectField({ onChange, value, options, name, isRequired, type }) {
    return (
        <label className="formLabel" htmlFor={name}>
            <p className="label-text">{name} {isRequired && <span style={{ color: 'red' }}> *</span>} </p>
            <select
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className="pc-select-field"
            >
                {
                    options.map(option => {
                        return (
                            <option value={option.value} >{option.label}</option>
                        )
                    })
                }
            </select>
        </label>
    )
}
