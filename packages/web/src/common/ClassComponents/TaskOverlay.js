import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, Button, TextArea, Intent } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import * as actions from '../../actions';

const profileIcon = require('../../assets/imageUploadIcon.png');

class TaskOverlay extends Component {
  state = {
    editHead: false,
    editDesc: false,
    commentText: '',
  };

  // on overlay close
  onClose = () => {
    const { _class, updateClassValue } = this.props;
    updateClassValue('overLayContent', { ..._class.overLayContent, isOpen: false });
    this.setState({
      editHead: false,
      editDesc: false,
      commentText: '',
    });
  };

  // toggle between the element of title
  toggleElemTitle = () => {
    const { editHead } = this.state;
    const { _class, updateClassValue } = this.props;
    if (editHead && _class.overLayContent.taskTitle !== '') {
      const newTasks = { ..._class.tasks };
      newTasks[_class.overLayContent.taskId] = {
        id: _class.overLayContent.taskId,
        title: _class.overLayContent.taskTitle,
        description: _class.overLayContent.taskDescription,
        comments: _class.overLayContent.comments,
      };
      updateClassValue('tasks', {
        ...newTasks,
      });
    }
    this.setState({ editHead: !editHead });
  };

  // toggle between the element of description
  toggleElemDesc = () => {
    const { editDesc } = this.state;
    const { _class, updateClassValue } = this.props;
    if (editDesc && _class.overLayContent.taskTitle !== '') {
      const newTasks = { ..._class.tasks };
      newTasks[_class.overLayContent.taskId] = {
        id: _class.overLayContent.taskId,
        title: _class.overLayContent.taskTitle,
        description: _class.overLayContent.taskDescription,
        comments: _class.overLayContent.comments,
      };
      updateClassValue('tasks', {
        ...newTasks,
      });
    }
    this.setState({ editDesc: !editDesc });
  };

  // changing title of the task
  titleChange = (e) => {
    const { _class, updateClassValue } = this.props;
    const {
      isOpen, taskId, taskDescription, comments,
    } = _class.overLayContent;
    updateClassValue('overLayContent', {
      isOpen,
      taskId,
      taskTitle: e.target.value,
      taskDescription,
      comments,
    });
  }

  // description change of the task
  descChange = (e) => {
    const { _class, updateClassValue } = this.props;
    const {
      isOpen, taskId, taskTitle, comments,
    } = _class.overLayContent;
    updateClassValue('overLayContent', {
      isOpen,
      taskId,
      taskTitle,
      taskDescription: e.target.value,
      comments,
    });
  }

  putComment = (e) => {
    this.setState({ commentText: e.target.value });
  }

  // submitting comment here and change the state in both overlaycontent and in the task
  // in stores
  submitComment = () => {
    const { commentText } = this.state;
    if (commentText !== '') {
      const { _class, main, updateClassValue } = this.props;
      const {
        isOpen, taskId, taskTitle, taskDescription, comments,
      } = _class.overLayContent;
      const newComment = [{
        commentId: Math.random().toString(36).substring(7),
        user: {
          userId: main.user.id,
          userName: `${main.user.firstName} ${main.user.middleName} ${main.user.lastName}`,
          profilePic: 'www.google.com',
        },
        text: commentText,
        timestamp: Date.now(),
      }, ...comments];
      updateClassValue('overLayContent', {
        isOpen,
        taskId,
        taskTitle,
        taskDescription,
        comments: newComment,
      });
      updateClassValue('tasks', {
        ..._class.tasks,
        [taskId]: {
          ..._class.tasks[taskId],
          comments: newComment,
        },
      });
      this.setState({ commentText: '' });
    }
  }

  render() {
    const { _class } = this.props;
    const { isOpen, taskTitle, taskDescription, comments } = _class.overLayContent;
    const { editHead, editDesc, commentText } = this.state;
    return (
      <Dialog
        isOpen={isOpen}
        onClose={this.onClose}
        className="overlay-container"
      >
        <div className="task-detail-overlay">
          <div className="overlay-title">
            {editHead ? <TextArea value={taskTitle} onChange={e => this.titleChange(e)} />
              : (
                <div className="head">
                  <span className="title">
                    {taskTitle}
                  </span>
                </div>
              )
            }
            {editHead
              ? (<Button
                text="Save"
                onClick={this.toggleElemTitle}
                className="edit-button"
              />
              )
              : (
                <Button
                  text="Edit"
                  onClick={this.toggleElemTitle}
                  className="edit-button"
                />
              )
            }
            <Button
              icon="cross"
              style={{ float: 'right' }}
              minimal
              onClick={this.onClose}
            />
          </div>
          <div className="left">
            <div className="overlay-description">
              <div className="desc-head">
                <u>Description</u>
                {editDesc
                  ? (<Button
                    text="Save"
                    onClick={this.toggleElemDesc}
                    small
                    className="edit-button"
                  />
                  )
                  : (
                    <Button
                      text="Edit"
                      onClick={this.toggleElemDesc}
                      small
                      className="edit-button"
                    />
                  )
                }
              </div>
              <div className="desc">
                {editDesc ? <TextArea value={taskDescription} onChange={this.descChange} /> : <span>{taskDescription}</span>}
              </div>
            </div>
            <div className="comment-container">
              <TextArea
                fill
                placeholder="Put your comments."
                value={commentText}
                onChange={e => this.putComment(e)}
              />
              <Button
                style={{ marginLeft: '5px' }}
                text="Submit"
                intent={Intent.PRIMARY}
                onClick={this.submitComment}
              />
            </div>
            <div className="comments">
              <h3>History</h3>
              {comments.map((comment) => {
                return (
                  <div className="s-comment" key={comment.commentId}>
                    <div>
                      <img
                        src={profileIcon}
                        height="45px"
                        alt="profile or blank profile"
                      />
                    </div>
                    <div className="com-con">
                      <div className="com-auth">
                        <span style={{ fontSize: '16px', fontWeight: 'bold', padding: '3px' }}>{comment.user.userName}</span>
                        <small>{comment.timestamp}</small>
                      </div>
                      <div className="com-desc" style={{ padding: '3px' }}>
                        {comment.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="right">
              Hello
          </div>
        </div>
      </Dialog>
    );
  }
}

TaskOverlay.propTypes = {
  _class: PropTypes.objectOf(PropTypes.any).isRequired,
  updateClassValue: PropTypes.func.isRequired,
  main: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps, { ...actions })(TaskOverlay);
