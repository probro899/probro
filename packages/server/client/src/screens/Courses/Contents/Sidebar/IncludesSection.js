import React from 'react';
import { AiOutlineFile } from 'react-icons/ai';
import { GiRank1 } from 'react-icons/gi';
import { IoIosInfinite } from 'react-icons/io';
import { BiSupport } from 'react-icons/bi';


const IncludesSection = ({ course }) => {
    const noOfLectures = course.courseSection.reduce((a, b) => a + b.lectures.length, 0);
    const noOfSections = course.courseSection.length;
    return (
        <div className="pcc-include-section">
            <h2 className="sec-heading">This course includes:</h2>
            <ul className="includes-list">
                <li className="list-item">
                    <div className="list-content">
                        <GiRank1 size={16} />
                        <span>{noOfSections} Sections</span>
                    </div>
                </li>
                <li className="list-item">
                    <div className="list-content">
                        <AiOutlineFile size={16} />
                        <span>{noOfLectures} Lectures</span>
                    </div>
                </li>
                <li className="list-item">
                    <div className="list-content">
                        <IoIosInfinite size={16} />
                        <span>Full lifetime access</span>
                    </div>
                </li>
                <li className="list-item">
                    <div className="list-content">
                        <BiSupport size={16} />
                        <span>Scheduled mentor support sessions</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default IncludesSection;
