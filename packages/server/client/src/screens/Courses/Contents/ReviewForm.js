import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { FormTextArea } from '../../../common/Form/FormTextArea';
import { Button } from '../../../common/utility-functions/Button/Button';
import StarRating from '../../../common/StarRating';
import Card from '../../../common/Card';

class ReviewForm extends React.Component {
    state = { review: '', noOfStar: 0, loading: false };

    onChange = (id, value) => this.setState({ [id]: value });

    submitReview = async () => {
        const { review, noOfStar } = this.state;
        const { apis, course, account, updateNav } = this.props;
        if (20 > review.trim().length || review.trim().length > 500) {
            updateNav({ schema: 'popNotification', data: { active: true, message: 'Review can only be between 20 to 500 letters long.', intent: 'error' } });
            return;
        }
        if (noOfStar < 1) {
            updateNav({ schema: 'popNotification', data: { active: true, message: 'Please choose your star rating', intent: 'error' } });
            return;
        }
        this.setState({ loading: true });
        const res = await apis.addStarRating({ review, noOfStar, userId: account.user.id, courseId: course.id });
        if (res) {
            updateNav({ schema: 'popNotification', data: { active: true, message: 'Thank you for your feedback, it will be published soon. Meanwhile keep learning!', intent: 'success' } });
            this.setState({ review: '', noOfStar: 0, loading: false });
        } else {
            updateNav({ schema: 'popNotification', data: { active: true, message: 'An error occured while submitting review, please try again', intent: 'error' } });
            this.setState({ loading: false });
        }
    }

    render() {
        const { review, noOfStar, loading } = this.state;
        return (
            <Card>
                <div className="review-form">
                    <h5 className="written-review-title">Post Review</h5>
                    <div className="review-form-wrapper">
                        <StarRating noOfStar={noOfStar} onChange={this.onChange} name="noOfStar" />
                        <FormTextArea
                            label="How was your overall experience?"
                            name="review"
                            className="pc-text-area"
                            value={review}
                            onChange={(e) => this.onChange('review', e.target.value)}
                            placeholder="Maximum of 500 characters"
                            rows="4"
                        />
                    </div>
                    <div className="post-comment-btn">
                        <Button
                            loading={loading}
                            onClick={this.submitReview}
                            type="button"
                            buttonStyle="btn--primary--outline"
                            buttonSize="btn--small"
                            title="Post"
                        />
                    </div>
                </div>
            </Card>

        )
    }
}

const mapStateToProps = (state) => {
    return { account: state.account };
};
export default connect(mapStateToProps, { ...actions })(ReviewForm);
