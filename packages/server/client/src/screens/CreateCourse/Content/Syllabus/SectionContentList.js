import React from 'react';
import { Button } from '../../../../common/utility-functions/Button/Button';
import { MdAddBox } from "react-icons/md";

const SectionContentList = ({ toggleLecture }) => {
    return (
        <div className="syllabus-section-list-wrap">
            <div className="sslw-container">
                <div className="sslw-wrapper">
                    <div className="add-item-menu">
                        <button className="btn-tertiary" onClick={() => toggleLecture('third')}>
                            <span>
                                <MdAddBox size={15} />
                            </span> Description
                        </button>
                        <button className="btn-tertiary" disabled>
                            <span>
                                <MdAddBox size={15} />
                            </span> Video
                        </button>
                        <button className="btn-tertiary" disabled>
                            <span>
                                <MdAddBox size={15} />
                            </span> Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionContentList;
