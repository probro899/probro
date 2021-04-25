import React from 'react';
import Accordion from '../../../common/Accordion';
import { AiFillPlayCircle } from "react-icons/ai";

const SyllabusContent = () => (
    <ul className="content-list">
        <li>
            <div className="preview-item">
                <div className="item-content">
                    <div className="item-content-title">
                        <AiFillPlayCircle size={20} /><span>Introduction To The Course</span>
                    </div>
                    <span className="content-time">
                        11:14
                    </span>
                </div>
            </div>
        </li>
        <li>
            <div className="preview-item">
                <div className="item-content">
                    <div className="item-content-title">
                        <AiFillPlayCircle size={20} /><span>Introduction To The Course</span>
                    </div>
                    <span className="content-time">
                        11:14
                    </span>
                </div>
            </div>
        </li>
        <li>
            <div className="preview-item">
                <div className="item-content">
                    <div className="item-content-title">
                        <AiFillPlayCircle size={20} /><span>Introduction To The Course</span>
                    </div>
                    <span className="content-time">
                        11:14
                    </span>
                </div>
            </div>
        </li>
        <li>
            <div className="preview-item">
                <div className="item-content">
                    <div className="item-content-title">
                        <AiFillPlayCircle size={20} /><span>Introduction To The Course</span>
                    </div>
                    <span className="content-time">
                        11:14
                    </span>
                </div>
            </div>
        </li>
        <li>
            <div className="preview-item">
                <div className="item-content">
                    <div className="item-content-title">
                        <AiFillPlayCircle size={20} /><span>Introduction To The Course</span>
                    </div>
                    <span className="content-time">
                        11:14
                    </span>
                </div>
            </div>
        </li>
    </ul>
)


const Syllabus = () => {
    return (
        <div className="syllabus-container" id="syllabus">
            <h2 className="syllabus-heading">Course content</h2>
            <div className="syllabus-subhead">
                <div className="subhead-left">
                    <span className="syllabus-content-length">15 sections • 76 lectures • <span><span>15h&nbsp;39m</span> total length</span></span>
                </div>
                <div className="syllabus-expand-collapse">
                    <span>Expand all sections</span>
                </div>
            </div>
            <div>
                <Accordion
                    title="Introduction"
                    content={<SyllabusContent />}
                />
                <Accordion
                    title="1 Machine Learning Libraries"
                    content={<SyllabusContent />}
                />
                <Accordion
                    title="2 Simple Linear Regression"
                    content={<SyllabusContent />}
                />
                <Accordion
                    title="3 Multiple Linear Regression"
                    content={<SyllabusContent />}
                />
                <Accordion
                    title="4 Polynomial Regression"
                    content={<SyllabusContent />}
                />
                <Accordion
                    title="5 Multi-variate Regression"
                    content={<SyllabusContent />}
                />

            </div>
        </div>
    )
}

export default Syllabus;
