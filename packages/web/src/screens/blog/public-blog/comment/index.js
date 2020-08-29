import React from 'react';
import PropTypes from 'prop-types';
import { MdSend } from 'react-icons/md';
import { TextArea, Button } from '@blueprintjs/core';
import Comment from './Comment';
import { timeStampSorting } from '../../../../common/utility-functions';
import { DeletePopOver } from '../../../../common';
import { RoundPicture } from '../../../../components';
import { ENDPOINT } from '../../../../config';

const file = require('../../../../assets/icons/64w/uploadicon64.png');

class CommentContainer extends React.Component {
  state = {
    comment: '',
    liked: null,
    allComments: [],
    allLikes: [],
    deletePopover: false,
    commentToDelete: {},
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

  saveEditedComment = async (commentText, comment) => {
    const { apis, blogId } = this.props;
    const { allComments } = this.state;
    try {
      const data = {
        comment: commentText,
        broadCastId: `Blog-${blogId}`,
      };
      await apis.updateBlogComment([data, { id: comment.id }]);
      const filteredComments = allComments.filter(obj => obj.id !== comment.id);
      this.setState({
        allComments: [...filteredComments, { ...comment, comment: commentText }],
        comment: '',
      });
    } catch (e) {
      console.log('Error', e);
    }
  }

  replyComment = (comment) => {
    const { users } = this.props;
    const user = users.find(obj => obj.user.id === comment.userId);
    this.setState({ comment: `@${user.user.firstName}` });
  }

  toggleDelete = (comment) => {
    const { deletePopover } = this.state;
    this.setState({
      deletePopover: !deletePopover,
      commentToDelete: comment,
    });
  }

  deleteComment = async (type) => {
    const { apis, blogId } = this.props;
    const { commentToDelete, allComments } = this.state;
    if (type === 'confirm') {
      await apis.deleteBlogComment({ id: commentToDelete.id, broadCastId: `Blog-${blogId}` });
      const filteredComments = allComments.filter(obj => obj.id !== commentToDelete.id);
      this.setState({
        deletePopover: false,
        commentToDelete: {},
        allComments: filteredComments,
      });
      return;
    }
    this.setState({
      deletePopover: false,
      commentToDelete: {},
    });
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
      deletePopover,
    } = this.state;
    const { users, imgUrl, account } = this.props;
    const image = (account.user && account.user.userDetails.image) ? `${ENDPOINT}/user/${10000000 + parseInt(account.user.id, 10)}/profile/${account.user.userDetails.image}` : file;
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
              <div className="profile-icon">
                <RoundPicture imgUrl={image} />
              </div>
              <TextArea
                placeholder="Write your thoughts on this..."
                onChange={this.setComment}
                value={comment}
              />
              <Button
                intent="primary"
                fill
                onClick={this.submitComment}
              >
                <MdSend size={30} />
              </Button>
            </div>
          )}
          <div className="responses">
            <div className="res-label">
              <h3>Responses</h3>
            </div>
            {allComments.sort(timeStampSorting).map((obj) => {
              const user = users.find(u => u.user.id === obj.userId);
              return <Comment deleteComment={this.toggleDelete} replyComment={this.replyComment} saveComment={this.saveEditedComment} user={user} account={account} comment={obj} key={obj.id} />;
            })}
            <DeletePopOver isOpen={deletePopover} name="Comment" action={this.deleteComment} />
          </div>
        </div>
        <div className="right" />
      </div>
    );
  }
}

CommentContainer.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
  blogId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  likes: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CommentContainer;
