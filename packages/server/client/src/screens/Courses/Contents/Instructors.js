import React from 'react';
import TopInstructorBadge from '../components/TopInstructorBadge';
import { BsFillPeopleFill } from "react-icons/bs";
import { GoBook } from "react-icons/go";

const Instructors = () => {
    return (
        <div className="instructor-container" id="instructors">
            <h2 className="instructor-heading">Instructor</h2>
            <span>
                <strong>Instructor rating</strong> 4.93/5
                (22,919 Ratings)
            </span>
            <div className="instructor-details">
                <figure className="img-wrapper">
                    <img src="https://properclass.com/assets/user/10000066/profile/image-1611537258246.jpg" alt="instructor image" />
                </figure>
                <div className="detail-content">
                    <div className="name-badge">
                        <h3 className="instructor-name">Bikal Shrestha</h3>
                        <TopInstructorBadge title="top instructor" content="top instructor" />
                    </div>
                    <span className="instructor-title">Instructor</span>
                    <div className="instructor-department">
                        Web Developer
                    </div>
                    <div className="instructor-expertise">
                        <div className="learners-count">
                            <BsFillPeopleFill size={15} />
                            <span><strong>4,847,539</strong> Learners</span>
                        </div>
                        <div className="courses-count">
                            <GoBook size={15} />
                            <span><strong>16</strong> Courses</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Instructors;
