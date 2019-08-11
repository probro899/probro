import React from 'react';
import { Link } from 'react-router-dom';
import { TextArea, Button } from '@blueprintjs/core';

const file = require('../../../../assets/icons/64w/uploadicon64.png');

class Comment extends React.Component {
  state = {
    comment: '',
  };

  setComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  }

  render() {
    const { comment } = this.state;
    return (
      <div className="response">
        <div className="left" />
        <div className="comment-section">
          <div className="top-label">
            <h1>Comment here</h1>
          </div>
          <div className="comment-area">
            <TextArea
              placeholder="put a comment in here"
              onChange={this.setComment}
              value={comment}
            />
            <Button
              text="Submit"
              intent="success"
              fill
            />
          </div>
          <div className="responses">
            <div className="res-label">
              <h3>Responses</h3>
            </div>
            <div className="i-response">
              <img
                alt="profile comment author"
                src={file}
                height="64px"
                style={{ borderRadius: '50%' }}
              />
              <div className="comment-content">
                <div>
                  <Link to="">
                    Nabin Bhusal
                  </Link>
                  <small> oct 15, 2019</small>
                </div>
                <p>
                  This is the first comment here
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="right" />
      </div>
    );
  }
}

export default Comment;
