import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {FormTextArea} from '../../../../common/Form/FormTextArea';
import { RoundPicture } from '../../../../components';
import { ENDPOINT } from '../../../../config';
import { Button } from '../../../../common/utility-functions/Button/Button'

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
    const { comment, user, account, saveComment, deleteComment } = this.props;
    const { editComment, commentText } = this.state;
    const imgUrl = user.userDetail && user.userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(user.id, 10)}/profile/${user.userDetail.image}` : '/assets//graphics/user.svg';
    return (
      <div className="i-response">
        <div className="pc-profile-icon">
          <RoundPicture imgUrl={imgUrl} />
        </div>
        <div className="comment-content">
          <div className='name-date-wrapper' style={{ fontSize: 16, display: 'flex', alignItems: 'center' }}>
            {
              user.middleName ? (
                <Link to={`/user/${user.slug}/`} key={`user-${user.id}`}>
                  {`${user.firstName} ${user.middleName} ${user.lastName} `}
                </Link>
              )
                : (
                  <Link to={`/user/${user.slug}/`} key={`user-${user.id}`}>
                    {`${user.firstName} ${user.lastName} `}
                  </Link>
                )
            }
            <span className='com-date' style={{ opacity: 0.8, fontSize: 12, marginLeft: 5 }}>
              {new Date(parseInt(comment.timeStamp, 10)).toDateString()}
            </span>
          </div>
          <div className="com-desc">
            {
              !editComment ? <p>{comment.comment}</p> : (
                <div className="pc-comment-edit">
                  <FormTextArea
                    placeholder="Put your comments."
                    value={commentText}
                    onChange={this.commentChange}
                  />
                  <div className="btns">
                    <div className="cancel-btn">
                      <Button onClick={() => this.setState({ editComment: false })}
                        type="button"
                        buttonStyle="btn--danger--outline"
                        buttonSize="btn--medium"
                        loading={false}
                        disabled={false}
                        title="Cancel" />
                    </div>
                    <div className="post-cmt-btn">
                      <Button onClick={() => { this.setState({ editComment: false }); saveComment(commentText, comment); }}
                        type="button"
                        buttonStyle="btn--primary--solid"
                        buttonSize="btn--medium"
                        loading={false}
                        disabled={false}
                        title="Post" />
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          {account.user && !editComment
            && (
              <div className="com-config">
                {
                  account.user.id === comment.userId && (
                    <div>
                      <small className="primary" role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => this.editComment(comment)}>
                        <u>Edit</u>
                      </small>
                      <small className="danger" role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => deleteComment(comment)}>
                        <u>Delete</u>
                      </small>
                    </div>
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
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Comment;
