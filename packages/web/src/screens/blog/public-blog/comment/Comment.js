import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, TextArea } from '@blueprintjs/core';
import { RoundPicture } from '../../../../components';
import { ENDPOINT } from '../../../../config';

const file = require('../../../../assets/icons/64w/uploadicon64.png');

class Comment extends React.Component {
  state = { deletePopover: false, editCommentId: null, commentText: '', activeComment: {} };

  editComment = () => {

  }

  replyComment = () => {

  }

  togglePopover = () => {

  }

  render() {
    const { comment, user, account } = this.props;
    const { editCommentId } = this.state;
    const imgUrl = user.userDetail && user.userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(user.user.id, 10)}/profile/${user.userDetail.image}` : file;
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
              editCommentId !== comment.id ? <p>{comment.comment}</p> : (
                <div className="pc-comment-edit">
                  <TextArea
                    fill
                    small
                    style={{ fontSize: 16, padding: '2px' }}
                    placeholder="Put your comments."
                    value={comment}
                    onChange={e => this.commentChange(e)}
                  />
                  <Button icon="tick" style={{ margin: '0px 5px' }} onClick={this.saveComment} intent="success" />
                  <Button icon="cross" onClick={() => this.setState({ editCommentId: null })} />
                </div>
              )
            }
          </div>
          {editCommentId !== comment.id && account.user
            && (
            <div className="com-config">
              {
                account.user.id === comment.userId ? (
                  <div>
                    <small className="primary" role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => this.editComment(comment)}>
                      <u>Edit</u>
                    </small>
                    <small className="danger" role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => this.togglePopover(comment)}>
                      <u>Delete</u>
                    </small>
                  </div>
                ) : (
                  <small className="primary" role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => this.replyComment(comment)}>
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
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Comment;
