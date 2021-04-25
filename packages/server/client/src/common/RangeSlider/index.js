import React from 'react';

const RangeSlider = ({ onChange, max, min, stepSize, value }) => {
    const changeCallback = (e) => {
        onChange(e.target.value);
      }
    return (
        <>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                step={stepSize}
                onChange={changeCallback}
            />
        </>
    )
}

export default RangeSlider
