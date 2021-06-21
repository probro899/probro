import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../common/utility-functions/Button/Button';

const EnrolledCourseCard = ({ course }) => {
    const currentLecture = course.courseCompleteHistory.lastLectureDetail;
    const currentSection = course.courseCompleteHistory.lastSectionDetail;
    return (
        <div className="enrolled-courses">
            <div className="course">
                <div className="course-preview">
                    <h6>Course</h6>
                    <h2>{course.title}</h2>
                    <Link to={`/enrolled/${course.id}?lecture=${currentLecture.id}`}>View all chapters <i className="fas fa-chevron-right"></i></Link>
                </div>
                <div className="course-info">
                    <h6>{currentSection.title}</h6>
                    <h2>{currentLecture.title}</h2>
                    <div className="continue-btn">
                        <Link to={`/enrolled/${course.id}?lecture=${currentLecture.id}`}>
                            <Button type="button" buttonStyle="btn--primary--solid" buttonSize="btn--medium" title="Continue" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnrolledCourseCard;
