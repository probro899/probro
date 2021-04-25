import React from 'react';
import PropTypes from 'prop-types';

export const FormFileInput = ({
    name,
    onInputChange,
    type,
    text,
    label,
    value,
    isRequired
}) => {
    return (
        <label className="formLabel" htmlFor={name}>
            <p className="label-text">{label} {isRequired && <span style={{ color: 'red' }}> *</span>} </p>
            <div className="pc-file-wrap">
                <input type={type} id={name} onChange={onInputChange} style={{display:'none'}} />
                <span className="pc-file-upload">{text}</span>
            </div>
        </label>
    )
}

FormFileInput.defaultProps = {
    name:'file',
    type: "file",
    className: ""
}

FormFileInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}