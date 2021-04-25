import React from 'react';
import ReviewStat from './ReviewStat';
import CourseMentor from './CourseMentor';
import { Button } from '../../../common/utility-functions/Button/Button';

const Cover = () => {
    return (
        <div className="pc-course-cover-wrapper">
            <div className="pc-course-cover-container">
                <div className="pc-course-content">
                    <div className="pc-content-left">
                        <div className="pc-content-left-wrapper">
                            <h1 className="course-title">Machine Learning</h1>
                            <ReviewStat ratingPoint="3.5" totalRating="100" ratingPercentage="97" />
                            <CourseMentor />
                            <div className="join-course-btn">
                                <Button
                                    onClick={() => { }}
                                    type="button"
                                    buttonStyle="btn--primary--solid"
                                    buttonSize="btn--medium"
                                    title="Go To Course"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pc-content-right">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cover;
