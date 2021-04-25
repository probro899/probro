import React from 'react';

export default ({ label, id, name, value, onChange }) => {
    let ReactQuill = null;
    if (typeof document === 'object') {
        ReactQuill = require('react-quill');
    }
    return (
        <label className="formLabel" htmlFor={name}>
            <p className="label-text">{label}</p>
          {ReactQuill && <ReactQuill
                name={name}
                value={value}
                onChange={(e) => onChange(id, e)}
            />
          }
        </label>
    )
}
