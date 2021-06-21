import React from 'react';
import OverviewDescription from './OverviewDescription';

const Overview = ({ course }) => {
    return (
        <div className="course-overview-container">
            <div className="course-overview-heading">
                <div className="overview-heading">
                    About this course
                </div>
                <p className="overview-brief">
                    {course.subTitle}
                </p>
            </div>
            <OverviewDescription title="About Instructor">
                <p dangerouslySetInnerHTML={{ __html: course.creator.userDetail.bio || ''}} />
            </OverviewDescription>
            <OverviewDescription title="Description">
                <div dangerouslySetInnerHTML={{ __html: course.description }} />
            </OverviewDescription>
        </div>
    )
}

export default Overview;
