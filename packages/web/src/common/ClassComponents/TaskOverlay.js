import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Dialog, Button, TextArea, Intent, Tag, Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { timeStampSorting } from '../../screens/users/utility-functions';
import TaskComment from './TaskComment';
import TaskDetailRight from './TaskDetailRight';
import { ENDPOINT } from '../../config';

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
    // console.log('description', descriptions);
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
    const res = await apis.addBoardColumnCardDescription({
      boardColumnCardId: task.id,
      title: desc,
      timeStamp: Date.now(),
      userId: account.user.id,
      broadCastId: `Board-${boardId}`,
    });
    addDatabaseSchema('BoardColumnCardDescription', {
      boardColumnCardId: task.id,
      title: desc,
      timeStamp: Date.now(),
      userId: account.user.id,
      id: res,
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

  getTags = () => {
    const { tags } = this.props;
    const { task } = this.state;
    if (task.id) {
      return Object.values(tags.byId).filter((obj) => {
        if (obj.boardColumnCardId === task.id) {
          return obj;
        }
      });
    }
    return [];
  }

  getName = (id) => {
    const { userList } = this.props;
    const user = userList.byId[id];
    return user.middleName
      ? `${user.firstName} ${user.middleName} ${user.lastName}`
      : `${user.firstName} ${user.lastName}`;
  };

  deleteAttachment = async (id, url) => {
    const { apis, deleteDatabaseSchema, account } = this.props;
    try {
      await axios.post(`${ENDPOINT}/web/delete-file`, { token: account.sessionId, content: 'board', fileName: url });
      await apis.deleteBoardColumnCardAttachment({
        id,
      });
      deleteDatabaseSchema('BoardColumnCardAttachment', { id });
    } catch (e) {
      console.log('Error');
    }
  }

  render() {
    const { isOpen } = this.props;
    const {
      editHead,
      editDesc,
      task,
      comments,
      attachments,
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
      account,
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
              <div className="pc-tags-and-deadline">
                <div className="pc-tag-view">
                  {
                    this.getTags().map((obj, index) => {
                      return (
                        <Tag
                          key={index}
                          large
                          intent={obj.tag}
                          style={{ margin: '5px' }}
                        />
                      );
                    })
                  }
                </div>
                <div className="pc-deadline-view">
                  {task.Deadline && (
                    <p
                      className={task.Deadline < new Date() ? 'expire' : 'no-expire'}
                    >
                      {`Deadline: ${moment(task.Deadline).format('YYYY-MM-DD')}`}
                    </p>
                  )}
                </div>
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
                {attachments.length !== 0 && <u>Attachments</u>}
                <div className="attach-list">
                  <ul>
                    {
                      attachments.map((obj) => {
                        const name = this.getName(obj.userId);
                        const link = `${ENDPOINT}/user/${10000000 + parseInt(obj.userId, 10)}/board/${obj.url}`;
                        return (
                          <li key={obj.id}>
                            <div className="file-type">
                              <span>
                                {obj.url.split('.')[1]}
                              </span>
                              <Icon
                                iconSize={11}
                                icon="cross"
                                className="pc-attach-delete"
                                onClick={() => this.deleteAttachment(obj.id, obj.url)}
                              />
                            </div>
                            <div className="file-detail">
                              <a rel="noopener noreferrer" target="_blank" href={link} className="attach-title">
                                {obj.name}
                              </a>
                              <span>
                                {moment(obj.timeStamp).format('DD-MM-YYYY')}
                                <Link to={`/user/${obj.userId}`}>{` - ${name}`}</Link>
                              </span>
                            </div>
                          </li>
                        );
                      })
                    }
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
              account={account}
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
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  attachments: PropTypes.arrayOf(PropTypes.any).isRequired,
  descriptions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  const { database, account } = state;
  return { userList: database.User, account };
};
export default connect(mapStateToProps)(TaskOverlay);
