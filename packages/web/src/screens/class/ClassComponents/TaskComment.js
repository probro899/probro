import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextArea } from '@blueprintjs/core';
import DeletePopOver from '../../../common/DeletePopOver';

const profileIcon = require('../../../assets/icons/64w/uploadicon64.png');

const CommentDesc = ({ comment }) => {
  const re = /(\s@\w+\s)|(^@\w+\s)|(^@\w+$)|(\s@\w+$)/;
  const matches = comment.split(re);
  return (
    <div>
      {
        matches.map((obj, index) => {
          if (obj && obj.match(re)) {
            // eslint-disable-next-line react/no-array-index-key
            return (<span key={index} style={{ fontWeight: 'bold', color: 'rgba(19, 124, 189, 1)' }}>{obj}</span>);
          }
          return obj;
        })
      }
    </div>
  );
};

CommentDesc.propTypes = {
  comment: PropTypes.string.isRequired,
};

class TaskComment extends React.Component {
  state = { deletePopover: false, editCommentId: null, comment: '', activeComment: {} };

  editComment = (com) => {
    this.setState({
      editCommentId: com.id,
      comment: com.comment,
    });
  }

  commentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  }

  saveComment = async () => {
    const { editCommentId, comment } = this.state;
    const { apis, updateDatabaseSchema } = this.props;
    await apis.updateBoardColumnCardComment([{ comment }, { id: editCommentId }]);
    updateDatabaseSchema('BoardColumnCardComment', { comment, id: editCommentId });
    this.setState({
      editCommentId: null,
    });
  }

  replyComment = (com) => {
    const { commentReply, userList } = this.props;
    let name = 'Anonymous';
    Object.values(userList.byId).map((obj) => {
      if (obj.id === com.userId) {
        name = obj.firstName;
      }
    });
    commentReply(`@${name} `);
  }

  togglePopover = (com) => {
    this.setState({
      deletePopover: true,
      activeComment: com,
    });
  }

  deleteComment = async (type) => {
    const { apis, boardId, deleteDatabaseSchema } = this.props;
    const { activeComment } = this.state;
    if (type === 'confirm') {
      await apis.deleteBoardColumnCardComment({ id: activeComment.id, broadCastId: `Board-${boardId}` });
      deleteDatabaseSchema('BoardColumnCardComment', { id: activeComment.id });
    }
    this.setState({
      deletePopover: false,
      activeComment: {},
    });
  }

  getCommentUser = (com) => {
    const { userList } = this.props;
    let name = 'Anonymous';
    Object.values(userList.byId).map((obj) => {
      if (obj.id === com.userId) {
        name = obj.middleName ? `${obj.firstName} ${obj.middleName} ${obj.lastName}` : `${obj.firstName} ${obj.lastName}`;
      }
    });
    return name;
  }

  render() {
    const { comments, account } = this.props;
    const { deletePopover, editCommentId, comment } = this.state;
    return (
      <div className="comments">
        <DeletePopOver isOpen={deletePopover} name="Comment" action={this.deleteComment} />
        <h3>History</h3>
        {comments.map((com) => {
          return (
            <div className="s-comment" key={com.id}>
              <div>
                <img
                  src={profileIcon}
                  height="45px"
                  alt="profile or blank profile"
                />
              </div>
              <div className="com-con">
                <div className="com-auth">
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {this.getCommentUser(com)}
                  </span>
                  <small>
                    {' '}
                    {new Date(com.timeStamp).toDateString()}
                  </small>
                </div>
                <div className="com-desc">
                  {
                    editCommentId !== com.id ? <CommentDesc comment={com.comment} /> : (
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
                {editCommentId !== com.id
                  && (
                  <div className="com-config">
                    {
                      account.user.id === com.userId ? (
                        <div>
                          <small className="primary" role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => this.editComment(com)}>
                            <u>Edit</u>
                          </small>
                          <small className="danger" role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => this.togglePopover(com)}>
                            <u>Delete</u>
                          </small>
                        </div>
                      ) : (
                        <small className="primary" role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => this.replyComment(com)}>
                          <u>Reply</u>
                        </small>
                      )
                    }
                  </div>)
                }
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

TaskComment.propTypes = {
  userList: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  boardId: PropTypes.number.isRequired,
  commentReply: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TaskComment;
