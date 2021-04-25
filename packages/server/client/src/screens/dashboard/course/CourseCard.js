import React from 'react';
import { Link } from 'react-router-dom';
import { PublishedBadge } from '../../../common/PublishedBadge.js';
import { MoreButton } from '../../../components';
import StarRating from '../../Courses/components/StarRating';
import CourseStatus from './CourseStatus';
import { getName } from '../../../common/utility-functions';
import { ENDPOINT } from '../../../config';

const CourseCard = ({ course, onMore, publicListing }) => {
    const { id, title, rating, creator, logo, status, createdBy } = course;
    const thumbnail = logo ? `${ENDPOINT}/assets/user/${10000000 + parseInt(createdBy, 10)}/course/${logo}` : '/assets/graphics/course.png';
    return (
        <div className="course-card-container">
            <div className="course-card">
                {!publicListing && status === 'publish' && <PublishedBadge />}
                <div className="card-content-wrapper">
                    <div className="card-top-section">
                        <MoreButton onMore={onMore} id={id} />
                        <figure className="course-thumbnail">
                            <img src={thumbnail} alt={title} className="thumbnail-img" />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="card-title-wrapper">
                            <Link to={status === 'publish' ? `/course/${id}/about` : `/edit-course/${publicListing ? creator.slug : creator.user.slug}/${course.id}/about`}><h2 className="card-title">{title}</h2></Link>
                            <p className="author">{getName(publicListing ? creator : creator.user)}</p>
                        </div>
                        <div className="course-rating">
                            <span className="rating-number">{rating.avgRating}</span>
                            <StarRating />
                            <span className="total-rating">({rating.noOfRating})</span>
                        </div>
                        <div className="course-price">
                            <span className="discound-price">$ 500</span>
                            <span className="original-price">$ 1000</span>
                        </div>
                        <div className="badge">
                            <CourseStatus status="bestseller" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;
