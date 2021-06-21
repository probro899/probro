import React from 'react';
import ReviewStat from './ReviewStat';
import CourseMentor from './CourseMentor';

const Cover = ({ course }) => {
    return (
        <div className="pc-course-cover-wrapper">
            <div className="pc-course-cover-container">
                <div className="pc-course-content">
                    <div className="pc-content-left">
                        <div className="pc-content-left-wrapper">
                            <h1 className="course-title">{course.title}</h1>
                            <ReviewStat ratingPoint={course.rating.avgRating} totalRating={course.noOfRating} ratingPercentage="97" />
                            <CourseMentor creator={course.creator} />
                            <p className="course-objective">{course.subTitle}</p>
                        </div>
                    </div>
                    <div className="pc-content-right"></div>
                </div>
            </div>
        </div>
    )
}

export default Cover;
