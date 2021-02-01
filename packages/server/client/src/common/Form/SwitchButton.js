import React from 'react';

export function SwitchButton({ checked, onChange }) {
    return (
        <div className="switch-container">
            {/* <label>
                <input checked={checked} onChange={onChange} className="switch" type="checkbox" />
                <div>
                    <div></div>
                </div>
            </label> */}
            <label class="switch">
                <input type="checkbox" checked={checked} onChange={onChange} />
                <span class="slider round"></span>
            </label>
        </div>
    );
}