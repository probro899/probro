import React, { useState } from 'react';
import { AiOutlineFile } from "react-icons/ai";

const ContentList = () => {
    const [isActive, setIsActive] = useState(false);
    const toggleActive = () => setIsActive(true);
    return (
        <li className="course-list-item" onClick={toggleActive}>
            <div className={`item-link ${isActive && 'active'}`}>
                <label className="item-progress-check">
                    <input type="checkbox" className="item-checkbox" />
                </label>
                <div className="item-title-container">
                    <div className="item-title-wrapper">
                        <span className="item-title">1. Project Overview</span>
                    </div>
                    <div className="read-time-wrapper">
                        <span className="read-time"><AiOutlineFile size={15} /> <span>4 min</span></span>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ContentList;
