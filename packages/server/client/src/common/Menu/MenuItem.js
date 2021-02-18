import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ icon, text, active, onClick, disabled, intent }) => {
    return (
        <li>
            <Link to="#" onClick={onClick}  className={`pc-menu-item ${active ? 'active' : ''} ${intent} ${disabled ? 'disabled':''}`} >
                <span className="pc-menuitem-icon">
                    {icon}
                </span>
                <div className="pc-menuitem-text">{text}</div>
            </Link>
        </li>
    )
}

export default MenuItem;
