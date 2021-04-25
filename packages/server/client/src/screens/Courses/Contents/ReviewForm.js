import React from 'react';
import { FormTextInput } from '../../../common/Form/FormTextInput';
import { FormTextArea } from '../../../common/Form/FormTextArea';
import { Editor } from '../../../common';
import { Button } from '../../../common/utility-functions/Button/Button';

const ReviewForm = () => {
    return (
        <div className="review-form">
            <h5 className="written-review-title">Post Review</h5>
            <div className="review-form-wrapper">
                <FormTextInput
                    label="Rating"
                    type="number"
                    name="rating"
                    placeholder="eg: 3.5"
                />
                <FormTextArea
                    label="Comment"
                    name="comment"
                    placeholder="some nice review"
                />
                {/* <Editor
                    label="Comment"
                    id="comment"
                    value="some nice review"
                    name="comment"
                    onChange={() => { }}
                /> */}
            </div>
            <div className="post-comment-btn">
                <Button
                    onClick={() => { }}
                    type="button"
                    buttonStyle="btn--primary--outline"
                    buttonSize="btn--small"
                    title="Post"
                />
            </div>
        </div>
    )
}

export default ReviewForm;
