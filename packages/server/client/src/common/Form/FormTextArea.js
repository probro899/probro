import React from 'react';
import PropTypes from 'prop-types';

export const FormTextArea = ({
    name,
    placeholder,
    onChange,
    className,
    value,
    label,
    resizable,
    onKeyPress,
    rows,
    onFocus,
    onBlur,
    disabled
}) => {
    // console.log(rows)
    return (
        <>
            <label className="formLabel" htmlFor={name}>
                <p className="label-text">{label}</p>
                <textarea
                    id={name}
                    name={name}
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    value={value}
                    rows={rows}
                    className={className}
                    style={resizable ? {
                        resize: 'vertical',
                    } : {
                            resize: 'none',
                        }}
                />
            </label>
        </>
    )
}

FormTextArea.defaultProps = {
    className: "",
}

FormTextArea.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}