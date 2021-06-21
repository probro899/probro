import React from 'react';
import { Link } from 'react-router-dom';
import { PublishedBadge } from '../../../common/PublishedBadge.js';
import { MoreButton } from '../../../components';
import CourseStatus from './CourseStatus';
import { getName } from '../../../common/utility-functions';
import Card from '../../../common/Card';
import { ENDPOINT } from '../../../config';
import { StarDisplay } from '../../../common/StarRating';
import { courseDomainConstant } from '../../../constants/courseConstants';

const PriceInfo = ({ priceDetails }) => {
  if (!priceDetails) return <div className="course-price"><span className="discound-price">Free</span></div>
  const { currency } = priceDetails;
  const subtotal = priceDetails.price;
  const total = priceDetails.price - priceDetails.discount;
  return (
    <div className="course-price">
      <span className="discound-price">{currency} {total}</span>
      <span className="original-price"><s>{currency} {subtotal}</s></span>
    </div>
  );
};

const CourseCard = ({ course, onMore, publicListing }) => {
  const { id, title, rating, creator, logo, status, createdBy, priceDetails, domain } = course;
  const thumbnail = logo ? `${ENDPOINT}/assets/user/${10000000 + parseInt(createdBy, 10)}/course/${logo}` : '/assets/graphics/course.png';
  return (
    <div className="course-card-container">
      <Card>
        <div className="course-card">
          {!publicListing && status === 'publish' && <PublishedBadge />}
          <div className="card-content-wrapper">
            <div className="card-top-section">
              {onMore && <MoreButton onMore={onMore} id={id} />}
              <figure className="course-thumbnail">
                <img src={thumbnail} alt={title} className="thumbnail-img" />
              </figure>
            </div>
            <div className="card-content">
              <div className="card-header">
                <div className="card-category">
                  <span className="dot"></span> {courseDomainConstant[domain] ? courseDomainConstant[domain].label : '---'}
                </div>
                <PriceInfo priceDetails={priceDetails} />
              </div>
              <div className="card-body">
                <div className="card-title-wrapper">
                  <Link to={status === 'publish' ? `/course/${id}/about` : `/edit-course/${publicListing ? creator.slug : creator.user.slug}/${course.id}/about`}>
                    <h2 className="card-title ellipsis ellipsis--secondary">{title}</h2>
                  </Link>
                  <p className="author">{getName(publicListing ? creator : creator.user)}</p>
                </div>
              </div>
              <div className="card-footer">
                <div className="course-rating">
                  <StarDisplay star={Number(rating.avgRating)} />
                  <span className="total-rating">({rating.noOfRating})</span>
                </div>
                <div className="badge">
                  <CourseStatus status="bestseller" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CourseCard;
