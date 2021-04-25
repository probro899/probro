import React, { useState } from 'react';
import { GrFormAdd, GrFormClose } from "react-icons/gr";

const AddNewSectionButton = ({ toggleContent, showContent }) => {

    const [showButton, setShowButton] = useState(false);
    const toggleButtonEnter = () => setShowButton(true);
    const toggleButtonLeave = () => setShowButton(false);
    const showCrossButton = () => setShowButton(true);

    return (
        <>
            <div className={`syllabus-list-wrapper-section ${showContent ? 'content-shown' : 'content-hidden'}`} onMouseEnter={toggleButtonEnter} onMouseLeave={showContent ? showCrossButton : toggleButtonLeave}>
                {showButton && <button type="button" className={`syllabus-add-item-section ${showContent ? 'cross-btn' : 'add-btn'}`} onClick={toggleContent}>
                    <span>
                        <GrFormAdd size="20" />
                    </span>
                </button>}
            </div>
        </>
    )
}

export default AddNewSectionButton;
