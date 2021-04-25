import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../../../../Courses/components/StarRating';

const CourseSection = () => {
    return (
        <>
            <h3 className="p-title">Courses by Bikal</h3>
            <div className="popular-blog">
                <figure className="blog-thumbnail">
                    <img
                        className="landscape"
                        src='/assets/graphics/python.jpg'
                    />
                </figure>
                <div className="blog-description">
                    <Link className="blog-title" target="_blank" to="/">
                        Course Title
                    </Link>
                    <a href="#">Bikal Shrestha</a>
                    <div className="course-rating">
                        <StarRating />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseSection;
