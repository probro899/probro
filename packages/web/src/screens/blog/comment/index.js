import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Button } from '@blueprintjs/core';
import Comment from './Comment';
import { timeStampSorting } from '../../../common/utility-functions';

class CommentContainer extends React.Component {
  state = {
    comment: '',
    liked: null,
    allComments: [],
    allLikes: [],
  };

  componentDidMount() {
    const { likes, account, comments } = this.props;
    this.setState({
      allComments: comments,
      allLikes: likes,
    });
    if (account.user) {
      likes.filter((obj) => {
        if (obj.userId === account.user.id) {
          this.setState({
            liked: obj.id,
          });
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { account, likes } = this.props;
    if (account.user !== nextProps.account.user) {
      likes.filter((obj) => {
        if (obj.userId === nextProps.account.user.id) {
          this.setState({
            liked: obj.id,
          });
        }
      });
    }
  }

  setComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  }

  submitComment = async () => {
    const { comment, allComments } = this.state;
    const { apis, blogId, account } = this.props;
    try {
      const data = {
        userId: account.user.id,
        comment,
        timeStamp: Date.now(),
        blogId,
        broadCastId: `Blog-${blogId}`,
      };
      const res = await apis.addBlogComment(data);
      this.setState({
        allComments: [...allComments, { ...data, id: res }],
        comment: '',
      });
    } catch (e) {
      console.log('Error', e);
    }
  }

  likeBlog = async () => {
    const { liked, allLikes } = this.state;
    const {
      apis,
      account,
      blogId,
    } = this.props;
    if (liked) {
      await apis.deleteBlogLike({
        id: liked,
        broadCastId: `Blog-${blogId}`,
      });
      this.setState({
        allLikes: allLikes.filter(obj => obj.id !== liked),
        liked: null,
      });
    } else {
      const data = {
        blogId,
        userId: account.user.id,
        timeStamp: Date.now(),
        likeType: 'like',
      };
      const res = await apis.addBlogLike({ ...data, broadCastId: `Blog-${blogId}` });
      this.setState({
        liked: res,
        allLikes: [...allLikes, { ...data, id: res }],
      });
    }
  }

  render() {
    const {
      comment,
      liked,
      allComments,
      allLikes,
    } = this.state;
    const { users, account } = this.props;
    return (
      <div className="response">
        <div className="left" />
        <div className="comment-section">
          <div>
            {account.user && (
              <Button
                intent={liked ? 'primary' : 'none'}
                text={liked ? 'Liked' : 'Like'}
                icon="thumbs-up"
                onClick={this.likeBlog}
              />
            )}
            <span>
              {` ${allLikes.length} Likes`}
            </span>
          </div>
          { account.user && (
            <div className="top-label">
              <h1>Comment here</h1>
            </div>
          )}
          {account.user && (
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
          )}
          <div className="responses">
            <div className="res-label">
              <h3>Responses</h3>
            </div>
            {allComments.sort(timeStampSorting).map((obj) => {
              const user = users.find(u => u.user.id === obj.userId);
              return <Comment user={user} comment={obj} key={obj.id} />;
            })}
          </div>
        </div>
        <div className="right" />
      </div>
    );
  }
}

CommentContainer.propTypes = {
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
  blogId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  likes: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CommentContainer;
