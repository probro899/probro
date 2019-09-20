import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Button } from '@blueprintjs/core';
import Comment from './Comment';
import { timeStampSorting } from '../../../utility-functions';

class CommentContainer extends React.Component {
  state = {
    comment: '',
    liked: null,
  };

  componentDidMount = () => {
    const { database, account, blogId } = this.props;
    Object.values(database.BlogLike.byId).filter((obj) => {
      if (obj.userId === account.user.id && obj.blogId === blogId) {
        this.setState({
          liked: obj.id,
        });
      }
    });
  }

  setComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  }

  submitComment = async () => {
    const { comment } = this.state;
    const { apis, blogId, account, addDatabaseSchema } = this.props;
    addDatabaseSchema('BlogComment', {
      id: Date.now(),
      userId: account.user.id,
      comment,
      timeStamp: Date.now(),
      blogId,
    });
    await apis.addBlogComment({
      userId: account.user.id,
      comment,
      timeStamp: Date.now(),
      blogId,
      broadCastId: `Blog-${blogId}`,
    });
    this.setState({
      comment: '',
    });
  }

  getLikeCount = () => {
    const { database, blogId } = this.props;
    const likes = Object.values(database.BlogLike.byId).filter((obj) => {
      return obj.blogId === blogId;
    }).reduce(tot => tot + 1, 0);
    return likes;
  }

  likeBlog = async () => {
    const { liked } = this.state;
    const {
      apis,
      account,
      blogId,
      addDatabaseSchema,
      deleteDatabaseSchema,
    } = this.props;
    if (liked) {
      await apis.deleteBlogLike({
        id: liked,
        broadCastId: `Blog-${blogId}`,
      });
      deleteDatabaseSchema('BlogLike', { id: liked });
      this.setState({
        liked: null,
      });
    } else {
      await apis.addBlogLike({
        blogId,
        userId: account.user.id,
        timeStamp: Date.now(),
        likeType: 'like',
        broadCastId: `Blog-${blogId}`,
      });
      addDatabaseSchema('BlogLike', {
        id: Date.now(),
        blogId,
        userId: account.user.id,
        timeStamp: Date.now(),
        likeType: 'like',
      });
      this.setState({
        liked: Date.now(),
      });
    }
  }

  render() {
    const { comment, liked } = this.state;
    console.log(liked);
    const { database, blogId } = this.props;
    return (
      <div className="response">
        <div className="left" />
        <div className="comment-section">
          <div>
            <Button
              intent={liked ? 'primary' : 'none'}
              text="Like"
              icon="thumbs-up"
              onClick={this.likeBlog}
            />
            <span>
              {` ${this.getLikeCount()} likes`}
            </span>
          </div>
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
              onClick={this.submitComment}
            />
          </div>
          <div className="responses">
            <div className="res-label">
              <h3>Responses</h3>
            </div>
            {Object.values(database.BlogComment.byId).sort(timeStampSorting).map((obj, index) => {
              if (blogId === obj.blogId) {
                return <Comment UserTable={database.User} comment={obj} key={index} />;
              }
            })}
          </div>
        </div>
        <div className="right" />
      </div>
    );
  }
}

CommentContainer.propTypes = {
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  blogId: PropTypes.number.isRequired,
};

export default CommentContainer;
