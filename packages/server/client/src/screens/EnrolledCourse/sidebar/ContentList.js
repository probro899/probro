import React from 'react';
import { AiOutlineFile } from "react-icons/ai";

const ContentList = ({ lecture, toggleLectureCompletion, switchLecture, active, idx }) => {
    const toggleActive = () => switchLecture(lecture.sectionId, lecture.id);
    const completed = lecture.history && lecture.history.status === 'completed';
    return (
        <li className="course-list-item">
            <div className={`item-link ${active && 'active'}`}>
                <label className="item-progress-check">
                    <input checked={lecture.history && completed} onChange={() => toggleLectureCompletion(lecture.sectionId, lecture.id, lecture.history)} type="checkbox" className="item-checkbox" />
                </label>
                <div className="item-title-container" onClick={toggleActive}>
                    <div className="item-title-wrapper">
                        <span className="item-title">{idx}. {lecture.title}</span>
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
