import React from 'react'

const Radio = ({ value, label}) => {
    return (
        <>
            <label className="pc-radio-wrapper">
                <input name="pc-radio-group" type="radio" value={value}/>
                <span className="pc-radio-indicator">
                </span>
                {label}
            </label>
        </>
    )
}

export default Radio
