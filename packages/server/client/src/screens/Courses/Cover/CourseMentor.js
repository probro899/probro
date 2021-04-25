import React from 'react';
import TopInstructorBadge from '../components/TopInstructorBadge';

const CourseMentor = () => {
    return (
        <div className="pc-course-mentor">
            <figure className="mentor-img-wrapper">
                <img src="https://properclass.com/assets/user/10000066/profile/image-1611537258246.jpg" alt="course mentor" className="mentor-img" />
            </figure>
            <p className="mentor-name">Bikal Shrestha</p>
            <TopInstructorBadge title="top instructor" content="top instructor" />
        </div>
    )
}

export default CourseMentor;
