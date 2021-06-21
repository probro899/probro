import React from 'react';
import ReviewForm from './ReviewForm';
import Card from '../../../common/Card';
import { StarDisplay } from '../../../common/StarRating';
import RatingChart from './RatingChart';
import ReviewItem from './ReviewItem';

const Reviews = ({ enrolled, course, apis }) => {
  const { noOfRating, avgRating, oneStar, twoStar, threeStar, fourStar, fiveStar } = course.rating;
  let ratingChart = { '5': fiveStar, '4': fourStar, '3': threeStar, '2': twoStar, '1': oneStar };
  return (
    <div className="review-container" id="reviews">
      <h2 className="review-title">Reviews</h2>
      <div className="reviews-wrapper">
        <Card>
          <div className="review-left-section">
            <div className="star-reviews-top">
              <span className="review-rate">{avgRating}</span>
              <span className="total-course-reviews">
                <StarDisplay star={Number(avgRating)} />
                <p className="total-reviews">{noOfRating} reviews</p>
              </span>
            </div>
            <div className="star-reviews-bottom">
              <RatingChart ratings={ratingChart} totalReviews={parseInt(noOfRating, 10)} />
            </div>
          </div>
        </Card>
        <div className="review-right-section">
          {enrolled && <ReviewForm apis={apis} course={course} />}
          <h5 className="written-review-title">Most recent reviews</h5>
          {course.reviews.map(item => <ReviewItem review={item} key={`r-item-${item.id}`} />)}
        </div>
      </div>
    </div>
  )
}

export default Reviews;
