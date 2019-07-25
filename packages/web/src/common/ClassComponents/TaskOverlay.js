import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, Button, TextArea, Intent, Icon } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { timeStampSorting } from '../../screens/users/utility-functions';

const profileIcon = require('../../assets/icons/64w/uploadicon64.png');

class TaskOverlay extends Component {
  state = {
    editHead: false,
    editDesc: false,
    task: {},
    comments: [],
    description: {},
    attachments: [],
    title: '',
    desc: '',
    comment: '',
  };

  componentWillReceiveProps(nextProps) {
    const {
      taskId,
      tasks,
      comments,
      attachments,
      descriptions,
    } = nextProps;
    const commentsCard = comments.filter((obj) => {
      if (taskId === obj.boardColumnCardId) {
        return obj;
      }
    });
    const attachmentsCard = attachments.filter((obj) => {
      if (taskId === obj.boardColumnCardId) {
        return obj;
      }
    });
    // finding the latest description
    const latestDesription = descriptions.filter((obj) => {
      if (taskId === obj.boardColumnCardId) {
        return obj;
      }
    }).sort(timeStampSorting)[0];
    let desc = '';
    if (latestDesription) {
      desc = latestDesription.title;
    }
    tasks.map((obj) => {
      if (obj.id === taskId) {
        this.setState({
          comments: commentsCard,
          attachments: attachmentsCard,
          task: obj,
          description: latestDesription,
          title: obj.name,
          desc,
        });
      }
    });
  }

  // on overlay close
  onClose = () => {
    const { onClose, taskId } = this.props;
    onClose(taskId);
    this.setState({
      editHead: false,
      editDesc: false,
      comment: '',
    });
  };

  // toggle between the element of title
  toggleElemTitle = () => {
    const { editHead } = this.state;
    this.setState({ editHead: !editHead });
  };

  // changing title of the task
  titleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  saveTitle = async () => {
    const { apis, boardId } = this.props;
    const { task, title } = this.state;
    await apis.updateBoardColumnCard([{
      name: title,
      broadCastId: `Board-${boardId}`,
    }, { id: task.id }]);
    this.toggleElemTitle();
  }

  // toggle between the element of description
  toggleElemDesc = () => {
    const { editDesc } = this.state;
    this.setState({ editDesc: !editDesc });
  };

  // description change of the task
  descChange = (e) => {
    this.setState({
      desc: e.target.value,
    });
  }

  saveDesc = async () => {
    const { apis, account, boardId } = this.props;
    const { task, desc } = this.state;
    await apis.addBoardColumnCardDescription({
      boardColumnCardId: task.id,
      title: desc,
      timeStamp: Date.now(),
      userId: account.user.id,
      broadCastId: `Board-${boardId}`,
    });
    this.toggleElemDesc();
  }

  commentChange = (e) => {
    this.setState({ comment: e.target.value });
  }

  saveComment = async () => {
    const { comment, task } = this.state;
    const { apis, account, boardId } = this.props;
    await apis.addBoardColumnCardComment({
      boardColumnCardId: task.id,
      comment,
      timeStamp: Date.now(),
      userId: account.user.id,
      broadCastId: `Board-${boardId}`,
    });
    this.setState({
      comment: '',
    });
  }

  render() {
    const { isOpen } = this.props;
    const {
      editHead,
      editDesc,
      task,
      comments,
      // attachments,
      title,
      description,
      desc,
      comment,
    } = this.state;
    const { userList } = this.props;
    return (
      <Dialog
        isOpen={isOpen}
        onClose={this.onClose}
        className="overlay-container"
        style={{ width: '800px' }}
      >
        <div className="task-detail-overlay">
          <div className="overlay-title">
            <div className="head">
              {editHead ? <TextArea value={title} onChange={e => this.titleChange(e)} />
                : (
                  <span className="title">
                    {task.name}
                  </span>
                )
              }
              {editHead
                ? (
                  <div className="buttons-group">
                    <Button
                      icon="tick"
                      intent="success"
                      onClick={this.saveTitle}
                    />
                    <Button
                      icon="cross"
                      onClick={this.toggleElemTitle}
                    />
                  </div>
                )
                : (
                  <div className="buttons-group">
                    <Icon
                      className="edit-title"
                      icon="edit"
                      onClick={this.toggleElemTitle}
                    />
                  </div>
                )
              }
            </div>
            <Button
              icon="cross"
              style={{ float: 'right' }}
              minimal
              onClick={this.onClose}
            />
          </div>
          <div className="overlay-body">
            <div className="left">
              <div className="overlay-description">
                <div className="desc-head">
                  <u>Description</u>
                  {editDesc
                    ? (
                      <span className="buttons-group">
                        <Button
                          icon="tick"
                          onClick={this.saveDesc}
                          intent="success"
                          small
                          className="edit-button"
                        />
                        <Button
                          icon="cross"
                          onClick={this.toggleElemDesc}
                          small
                          className="edit-button"
                        />
                      </span>
                    )
                    : (
                      <Icon
                        icon="edit"
                        onClick={this.toggleElemDesc}
                        className="edit-button"
                      />
                    )
                  }
                </div>
                <div className="desc">
                  {editDesc
                    ? <TextArea value={desc} onChange={this.descChange} />
                    : (
                      <span>
                        { description && description.title }
                      </span>
                    )}
                </div>
              </div>
              <div className="comment-container">
              <TextArea
                fill
                placeholder="Put your comments."
                value={comment}
                onChange={e => this.commentChange(e)}
              />
              <Button
                style={{ marginLeft: '5px' }}
                text="submit"
                intent={Intent.PRIMARY}
                onClick={this.saveComment}
              />
            </div>
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
                          <span style={{ fontSize: '16px', fontWeight: 'bold', padding: '3px' }}>
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
                        <div className="com-desc" style={{ padding: '3px' }}>
                          {com.comment}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="right">
              <div><h3>Extras</h3></div>
              <div>
                <Button
                  icon="cross"
                  text="Labels"
                  fill
                />
                <Button
                  icon="cross"
                  fill
                  text="attachments"
                />
              </div>
              <div><h3>Advance Actions</h3></div>
              <div>
                <Button
                  icon="cross"
                  text="Move card"
                  fill
                />
                <Button
                  icon="cross"
                  fill
                  text="delete"
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

TaskOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  taskId: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  const { database, account } = state;
  return { userList: database.User, account };
};
export default connect(mapStateToProps)(TaskOverlay);
