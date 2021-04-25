import React from 'react';
import StarRating from '../components/StarRating';
import ReviewForm from './ReviewForm';
import { Button } from '../../../common/utility-functions/Button/Button';
import RatingChart from './RatingChart';

const reviews = [
    {
        star: '5',
        rating: ' 92.44'

    },
    {
        star: '4',
        rating: '6.89'

    },
    {
        star: '3',
        rating: '0.45',

    },
    {
        star: '2',
        rating: '5.66'

    },
    {
        star: '1',
        rating: '1.2'

    },
]


const Reviews = () => {
    const isEnrolled = true;
    return (
        <div className="review-container" id="reviews">
            <h2 className="review-title">Reviews</h2>
            <div className="reviews-wrapper">
                <div className="review-left-section">
                    <div className="star-reviews-top">
                        <span className="review-rate">3.5</span>
                        <span className="total-course-reviews">
                            <StarRating />
                            <p className="total-reviews">100 reviews</p>
                        </span>
                    </div>
                    <div className="star-reviews-bottom">
                        <RatingChart reviews={reviews} />
                    </div>
                </div>
                <div className="review-right-section">
                    {
                        isEnrolled && <ReviewForm />
                    }
                    <h5 className="written-review-title">TOP REVIEWS FROM MACHINE LEARNING</h5>
                    <div className="top-review-wrapper">
                        <StarRating />
                        <div className="top-review-item-info">
                            <span>by Bikal</span>
                            <span>Mar 10, 2021</span>
                        </div>
                        <p className="top-review-item-comment">
                            This is a great way to get an introduction to the main machine learning models. The professor is very didactic and the material is good too. I recommend it to everyone beginning to learn this science.
                        </p>
                    </div>
                    <div className="top-review-wrapper">
                        <StarRating />
                        <div className="top-review-item-info">
                            <span>by Bikal</span>
                            <span>Mar 10, 2021</span>
                        </div>
                        <p className="top-review-item-comment">
                            This is a great way to get an introduction to the main machine learning models. The professor is very didactic and the material is good too. I recommend it to everyone beginning to learn this science.
                        </p>
                    </div>
                    <div className="top-review-wrapper">
                        <StarRating />
                        <div className="top-review-item-info">
                            <span>by Bikal</span>
                            <span>Mar 10, 2021</span>
                        </div>
                        <p className="top-review-item-comment">
                            This is a great way to get an introduction to the main machine learning models. The professor is very didactic and the material is good too. I recommend it to everyone beginning to learn this science.
                        </p>
                    </div>

                    <div className="view-all-review">
                        <Button
                            onClick={() => { }}
                            type="button"
                            buttonStyle="btn--primary--outline"
                            buttonSize="btn--medium"
                            title="View all reviews"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews;
