import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, TextArea } from '@blueprintjs/core';
import { RoundPicture } from '../../../../components';
import { ENDPOINT } from '../../../../config';

// const file = require('../../../../assets/icons/64w/uploadicon64.png');

class Comment extends React.Component {
  constructor(props) {
    super(props);
    const { comment } = this.props;
    this.state = { deletePopover: false, commentText: comment.comment, editComment: false };
  }

  editComment = () => {
    this.setState({
      editComment: true,
    });
  }

  commentChange = (e) => {
    this.setState({
      commentText: e.target.value,
    });
  }

  togglePopover = () => {
    const { deletePopover } = this.state;
    this.setState({
      deletePopover: !deletePopover,
    });
  }

  render() {
    const { comment, user, account, saveComment, replyComment, deleteComment } = this.props;
    const { editComment, commentText } = this.state;
    const imgUrl = user.userDetail && user.userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(user.user.id, 10)}/profile/${user.userDetail.image}` : '/assets/icons/64w/uploadicon64.png';
    return (
      <div className="i-response">
        <div className="pc-profile-icon">
          <RoundPicture imgUrl={imgUrl} />
        </div>
        <div className="comment-content">
          <div style={{ fontSize: 16 }}>
            {
              user.user.middleName ? (
                <Link to={`/user/${user.user.slug}/`} key={`user-${user.user.id}`}>
                  {`${user.user.firstName} ${user.user.middleName} ${user.user.lastName} `}
                </Link>
              )
                : (
                  <Link to={`/user/${user.user.slug}/`} key={`user-${user.user.id}`}>
                    {`${user.user.firstName} ${user.user.lastName} `}
                  </Link>
                )
            }
            <span style={{ opacity: 0.8, fontSize: 10 }}>
              {new Date(comment.timeStamp).toDateString()}
            </span>
          </div>
          <div className="com-desc">
            {
              !editComment ? <p>{comment.comment}</p> : (
                <div className="pc-comment-edit">
                  <TextArea
                    fill
                    small
                    style={{ fontSize: 16, padding: '2px' }}
                    placeholder="Put your comments."
                    value={commentText}
                    onChange={this.commentChange}
                  />
                  <Button icon="tick" style={{ margin: '0px 5px' }} onClick={() => { this.setState({ editComment: false }); saveComment(commentText, comment); }} intent="success" />
                  <Button icon="cross" onClick={() => this.setState({ editComment: false })} />
                </div>
              )
            }
          </div>
          {account.user && !editComment
            && (
            <div className="com-config">
              {
                account.user.id === comment.userId ? (
                  <div>
                    <small className="primary" role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => this.editComment(comment)}>
                      <u>Edit</u>
                    </small>
                    <small className="danger" role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => deleteComment(comment)}>
                      <u>Delete</u>
                    </small>
                  </div>
                ) : (
                  <small className="primary" role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => replyComment(comment)}>
                    <u>Reply</u>
                  </small>
                )
              }
            </div>
            )}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  saveComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  replyComment: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Comment;
