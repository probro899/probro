import React from 'react';

export function SwitchButton({ checked, onChange }) {
    return (
        <div className="switch-container">
            <label className="switch">
                <input type="checkbox" checked={checked} onChange={onChange} />
                <span className="slider round"></span>
            </label>
        </div>
    );
}