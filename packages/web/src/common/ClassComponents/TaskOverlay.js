import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, Button, TextArea, Intent, Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { timeStampSorting } from '../../screens/users/utility-functions';
import TaskComment from './TaskComment';
import TaskDetailRight from './TaskDetailRight';

class TaskOverlay extends Component {
  state = {
    editHead: false,
    editDesc: false,
    task: {},
    comments: [],
    description: {},
    attachments: [],
    tags: [],
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
      tags,
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
    // finding all the tags here
    const allTags = Object.values(tags.byId).filter((obj) => {
      if (taskId === obj.boardColumnCardId) {
        return obj;
      }
    });

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
          tags: allTags,
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
    const { apis, boardId, updateDatabaseSchema } = this.props;
    const { task, title } = this.state;
    await apis.updateBoardColumnCard([{
      name: title,
      broadCastId: `Board-${boardId}`,
    }, { id: task.id }]);
    updateDatabaseSchema('BoardColumnCard', { id: task.id, name: title });
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
    const { apis, account, boardId, addDatabaseSchema } = this.props;
    const { task, desc } = this.state;
    await apis.addBoardColumnCardDescription({
      boardColumnCardId: task.id,
      title: desc,
      timeStamp: Date.now(),
      userId: account.user.id,
      broadCastId: `Board-${boardId}`,
    });
    addDatabaseSchema('BoardColumnCard', {
      boardColumnCardId: task.id,
      title: desc,
      timeStamp: Date.now(),
      userId: account.user.id,
      id: Date.now(),
    });
    this.toggleElemDesc();
  }

  commentChange = (e) => {
    this.setState({ comment: e.target.value });
  }

  saveComment = async () => {
    const { comment, task } = this.state;
    const { apis, account, boardId, addDatabaseSchema } = this.props;
    await apis.addBoardColumnCardComment({
      boardColumnCardId: task.id,
      comment,
      timeStamp: Date.now(),
      userId: account.user.id,
      broadCastId: `Board-${boardId}`,
    });
    addDatabaseSchema('BoardColumnCardComment', {
      id: Date.now(),
      boardColumnCardId: task.id,
      comment,
      timeStamp: Date.now(),
      userId: account.user.id,
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
      tags,
    } = this.state;
    const {
      userList, apis, boardId, onClose,
      deleteDatabaseSchema,
      updateDatabaseSchema,
      addDatabaseSchema,
    } = this.props;
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
              <div className="pc-deadline-view">
                <p className="expire">
                  {`Deadline: ${task.Deadline}`}
                </p>
              </div>
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
              <div className="attach-container">
                <u>Attachments</u>
                <div className="attach-list">
                  <ul>
                    <li>
                      <div className="file-type">
                        <span>
                          txt
                        </span>
                      </div>
                      <div className="file-detail">
                        <span className="attach-title">
                          Project Report.pdf
                        </span>
                        <span>
                          oct 27 2019 -
                          <Link to=""> Nabin Bhusal</Link>
                        </span>
                      </div>
                    </li>
                  </ul>
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
              <TaskComment comments={comments} userList={userList} />
            </div>
            <TaskDetailRight
              tags={tags}
              onClose={onClose}
              boardId={boardId}
              task={task}
              apis={apis}
              deleteDatabaseSchema={deleteDatabaseSchema}
              updateDatabaseSchema={updateDatabaseSchema}
              addDatabaseSchema={addDatabaseSchema}
            />
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
  userList: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  tags: PropTypes.objectOf(PropTypes.any).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  boardId: PropTypes.number.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  comments: PropTypes.objectOf(PropTypes.any).isRequired,
  attachments: PropTypes.objectOf(PropTypes.any).isRequired,
  descriptions: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  const { database, account } = state;
  return { userList: database.User, account };
};
export default connect(mapStateToProps)(TaskOverlay);
