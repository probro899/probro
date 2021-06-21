import React from 'react';

export function FormSelectField({ onChange, value, options, label, name, isRequired, type }) {
  return (
    <label className="formLabel" htmlFor={name}>
      <p className="label-text">{label} {isRequired && <span style={{ color: 'red' }}> *</span>} </p>
      <select
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="pc-select-field"
      >
        {options.map((option, idx) => <option key={`opt-${idx}`} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
};
