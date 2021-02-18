import React from 'react'

const RadioGroup = ({onChange, selectedValue, children, className}) => {
    return (
        <div className={className} onClick={onChange} selectedValue={selectedValue} >
            {children}
        </div>
    )
}

export default RadioGroup
