import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../common/utility-functions/Button/Button';

const EnrolledCourseCard = ({ title, chapterNo, chapterTitle }) => {
    return (
        <>
            <div className="enrolled-courses">
                <div className="course">
                    <div className="course-preview">
                        <h6>Course</h6>
                        <h2>{title}</h2>
                        <Link to="/enrolled/hello">View all chapters <i className="fas fa-chevron-right"></i></Link>
                    </div>
                    <div className="course-info">
                        <h6>Chapter {chapterNo}</h6>
                        <h2>{chapterTitle}</h2>
                        <div className="continue-btn">
                            <Link to="/enrolled/hello">
                                <Button type="button" buttonStyle="btn--primary--solid" buttonSize="btn--medium" title="Continue" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EnrolledCourseCard;
