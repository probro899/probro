import React, { useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import AddNewSectionForm from './AddNewSectionForm';

const SectionHeader = ({ title, section, sectionObj, updateSection, startDeletion }) => {
    const [showIcon, setShowIcon] = useState(false);
    const [editSection,  toggleEditSection] = useState(false);
    
    const callback = (data) => {
        updateSection([data, { id: sectionObj.id }]);
        toggleEditSection(false);
    }

    if (editSection) {
        return (
            <AddNewSectionForm
                callback={callback}
                id={sectionObj.id}
                title={sectionObj.title}
                objective={sectionObj.objective}
                onClose={() => toggleEditSection(false)}
            />
        )
    }

    return (
        <div className="section-editor" onMouseEnter={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}>
            <div className="item-bar-section">
                <div className="item-bar-wrapper">
                    <div className="item-bar-left">
                        <div className="item-bar-left-wrap">
                            <span className="item-bar-heading">Section {section}: </span>
                            <span className="item-bar-title">
                                <span className="sec-title">{title}</span>
                            </span>
                            <span onClick={() => toggleEditSection(true)} className={`sec-icon edit ${showIcon ? 'show-icon' : 'hidden-icon'} `}>
                                <MdEdit size="15" />
                            </span>
                            <span onClick={startDeletion} className={`sec-icon delete ${showIcon ? 'show-icon' : 'hidden-icon'} `}>
                                <MdDelete size="15"  />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionHeader;
