import React from 'react';
import { Navbar } from '../home/component';
import Accordion from '../../common/Accordion';
import CourseContents from './sidebar/CourseContents';
import { ContentDisplay, ContentDashboard } from './content';

const EnrolledCourse = () => {
    return (
        <>
            <Navbar />
            <div className="enrolled-course-container">
                <div className="course-content-column">
                    <div className="course-sidebar">
                        <div className="sidebar-contents">
                            <h2 className="sidebar-header">JS Fundamentals</h2>
                            <Accordion
                                title="Introduction"
                                content={<CourseContents />}
                            />
                            <Accordion
                                title="Introduction"
                                content={<CourseContents />}
                            />
                        </div>
                    </div>
                    <div className="course-content-wrapper">
                        <div className="content-output">
                            <ContentDisplay />
                        </div>
                        <div className="course-details">
                            <ContentDashboard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnrolledCourse;
