import React from 'react';
import PropTypes from 'prop-types';

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
  state = {};

  editComment = () => {

  }

  replyComment = () => {

  }

  delteComment = () => {

  }

  render() {
    const { userList, comments } = this.props;
    return (
      <div className="comments">
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
                    {
                      Object.values(userList.byId).map((obj) => {
                        if (obj.id === com.userId) {
                          return `${obj.firstName} ${obj.lastName}`;
                        }
                      })
                    }
                  </span>
                  <small>{new Date(com.timeStamp).toDateString()}</small>
                </div>
                <div className="com-desc">
                  <CommentDesc comment={com.comment} />
                </div>
                <div className="com-config">
                  <small className="primary" onClick={() => this.replyComment(com.id)}>
                    <u>Reply</u>
                  </small>
                  <small className="primary" onClick={() => this.editComment(com.id)}>
                    <u>Edit</u>
                  </small>
                  <small className="danger" onClick={() => this.delteComment(com.id)}>
                    <u>Delete</u>
                  </small>
                </div>
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
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default TaskComment;
