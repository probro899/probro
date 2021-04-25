import React, { useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { GrNotes } from 'react-icons/gr';
import AddResources from './AddResources';

const LectureHeader = ({ item, index }) => {
    const [showIcon, setShowIcon] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const toggleShowItem = () => {
        setShowIcon(!showIcon);
    }

    const toggleShowContent = () => {
        setShowContent(!showContent);
    }

    return (
        <>
            <div className="section-editor lecture-header">
                <div className="item-bar-section" onMouseEnter={toggleShowItem} onMouseLeave={toggleShowItem}>
                    <div className="item-bar-wrapper">
                        <div className="item-bar-left">
                            <div className="item-bar-left-wrap">
                                <span className="item-bar-heading">
                                    Lecture {index}:
                            </span>
                                <span className="item-bar-title">
                                    {/* <span>
                                        <GrNotes size="15" />
                                    </span> */}
                                    <span className="sec-title">{item.title}</span>
                                </span>
                                <span className={`sec-icon edit ${showIcon ? 'show-icon' : 'hidden-icon'} `}>
                                    <MdEdit size="15" />
                                </span>
                                <span className={`sec-icon delete ${showIcon ? 'show-icon' : 'hidden-icon'} `}>
                                    <MdDelete size="15" />
                                </span>
                            </div>
                        </div>
                        <div className="item-bar-right">
                            <span className="sec-icon" onClick={toggleShowContent}>
                                {
                                    showContent ? <FiChevronUp size="15" /> : <FiChevronDown size="15" />
                                }
                            </span>
                            {/* <span className={`sec-icon ${showIcon ? 'show-icon' : 'hidden-icon'} `}>
                                <GiHamburgerMenu size="15" />
                            </span> */}
                        </div>
                    </div>
                </div>
                <AddResources showContent={showContent} />
            </div>
        </>
    )
}

export default LectureHeader;