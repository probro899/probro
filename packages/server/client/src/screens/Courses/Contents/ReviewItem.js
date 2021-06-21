import React from 'react';
import Card from '../../../common/Card';
import { getName } from '../../../common/utility-functions';
import { StarDisplay } from '../../../common/StarRating';

const ReviewItem = ({ review }) => {
    return (
        <Card>
            <div className="top-review-wrapper">
                <div className="avatar-wrapper">
                    <div className="avatar-content avatar-initials">BS</div>
                </div>
                <div className="review-details">
                    <p className="reviewer-name"><b>{getName(review.userDetails)}</b></p>
                    <div className="top-review-item-info">
                        <StarDisplay star={parseInt(review.noOfStar)} />
                        <p className="date"> {new Date(parseInt(review.createdAt, 10)).toDateString()}</p>
                    </div>
                    <p className="top-review-item-comment">
                        {review.review}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default ReviewItem;
