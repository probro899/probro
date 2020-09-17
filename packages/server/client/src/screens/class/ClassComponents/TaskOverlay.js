import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { Dialog, Button, TextArea, Tag, Icon } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { timeStampSorting } from '../../../common/utility-functions';
import TaskComment from './history/TaskComment';
import TaskDetailRight from './TaskDetailRight';
import { ENDPOINT } from '../../../config';
import CommentBox from './CommentBox';
import { AttachmentList } from './attachment';
import Spinner from '../../../common/spinner';
import Description from './task-detail/Description';

class TaskOverlay extends Component {
  state = {
    editHead: false,
    editDesc: false,
    loading: true,
    task: {},
    comments: [],
    description: {},
    attachments: [],
    tags: [],
    title: '',
    desc: '',
    comment: '',
    activities: [],
  };

  componentWillReceiveProps(nextProps) {
    const {
      taskId,
      database,
    } = nextProps;

    const task = Object.values(database.BoardColumnCard.byId).find(o => o.id === taskId);
    if (!task) {
      this.setState({ loading: true });
      return;
    }
    // filter deleted
    const commentsCard = Object.values(database.BoardColumnCardComment.byId).filter(obj => taskId === obj.boardColumnCardId && !obj.deleteStatus).sort(timeStampSorting);
    const attachmentsCard = Object.values(database.BoardColumnCardAttachment.byId).filter(obj => taskId === obj.boardColumnCardId && !obj.deleteStatus).sort(timeStampSorting);
    // finding the latest description
    const latestDesription = Object.values(database.BoardColumnCardDescription.byId).filter(obj => taskId === obj.boardColumnCardId).sort(timeStampSorting)[0];
    // finding all the tags here
    const allTags = Object.values(database.BoardColumnCardTag.byId).filter(obj => taskId === obj.boardColumnCardId && !obj.deleteStatus);

    const desc = latestDesription ? latestDesription.title : '';
    this.setState({
      comments: commentsCard,
      attachments: attachmentsCard,
      tags: allTags,
      description: latestDesription,
      title: task.name,
      desc,
      task,
    });
  }

  // on overlay close
  onClose = () => {
    const { onClose, taskId } = this.props;
    onClose(taskId);
    this.setState({
      editHead: false,
      loading: true,
      editDesc: false,
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
  descChange = (val) => {
    this.setState({
      desc: val,
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

  getName = (id) => {
    const { userList } = this.props;
    const user = userList.byId[id];
    return user.middleName
      ? `${user.firstName} ${user.middleName} ${user.lastName}`
      : `${user.firstName} ${user.lastName}`;
  };

  deleteAttachment = async (id, url) => {
    const { task } = this.state;
    const { apis, deleteDatabaseSchema, account, boardId } = this.props;
    try {
      await axios.post(`${ENDPOINT}/web/delete-file`, { token: account.sessionId, content: 'board', fileName: url });
      await apis.deleteBoardColumnCardAttachment({
        id,
        broadCastId: `Board-${boardId}`,
        cardId: task.id,
      });
      deleteDatabaseSchema('BoardColumnCardAttachment', { id });
    } catch (e) {
      console.log('Error');
    }
  }

  writeComment = (name) => {
    this.setState({
      comment: name,
    });
  }

  getCardActivity = async () => {
    const { apis } = this.props;
    const { task } = this.state;
    const res = await apis.getCardActivity({ cardId: task.id });
    this.setState({
      loading: false,
      activities: res.cardActivities.filter(o => o.message === 'createCard' || o.message === 'outsideColumn'),
    });
  }

  render() {
    const {
      editHead,
      editDesc,
      task,
      comments,
      attachments,
      title,
      description,
      desc,
      tags,
      comment,
      activities,
      loading,
    } = this.state;
    const {
      userList, apis, boardId, onClose,
      deleteDatabaseSchema,
      updateDatabaseSchema,
      addDatabaseSchema,
      account,
      isOpen,
      database,
    } = this.props;
    // console.log('state value in task overlay', this.state);
    return (
      <Dialog
        isOpen={isOpen}
        onClose={this.onClose}
        onOpening={this.getCardActivity}
        className="overlay-container"
        style={{ width: '800px' }}
      >
        {!loading ? (
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
              <Button icon="cross" className="task-close" minimal onClick={this.onClose} />
            </div>
            <div className="overlay-body">
              <div className="left">
                <div className="pc-tags-and-deadline">
                  <div className="pc-tag-view">
                    {tags.map(obj => <Tag className="tag" key={obj.id} large intent={obj.tag} />)}
                  </div>
                  <div className="pc-deadline-view">
                    {task.Deadline ? (
                      <p
                        className={task.Deadline < new Date() ? 'expire' : 'no-expire'}
                      >
                        {`Deadline: ${moment(task.Deadline).format('YYYY-MM-DD')}`}
                      </p>
                    ) : ' '}
                  </div>
                </div>
                <div className="overlay-description">
                  <div className="desc-head">
                    <span>Description</span>
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
                  <Description editDesc={editDesc} value={desc} onChange={this.descChange} description={description} />
                </div>
                <AttachmentList
                  attachments={attachments}
                  getName={this.getName}
                  Users={database.User}
                  deleteAttachment={this.deleteAttachment}
                />
                <CommentBox
                  apis={apis}
                  addDatabaseSchema={addDatabaseSchema}
                  account={account}
                  boardId={boardId}
                  task={task}
                  writeComment={this.writeComment}
                  comment={comment}
                  database={database}
                />
                <TaskComment
                  comments={[...comments, ...activities]}
                  account={account}
                  apis={apis}
                  userList={userList}
                  userDetailList={database.UserDetail}
                  columns={database.BoardColumn}
                  commentReply={this.writeComment}
                  boardId={boardId}
                  deleteDatabaseSchema={deleteDatabaseSchema}
                  updateDatabaseSchema={updateDatabaseSchema}
                />
              </div>
              <TaskDetailRight
                tags={tags}
                onClose={onClose}
                boardId={boardId}
                task={task}
                apis={apis}
                account={account}
                database={database}
                description={description}
                attachments={attachments}
                deleteDatabaseSchema={deleteDatabaseSchema}
                updateDatabaseSchema={updateDatabaseSchema}
                addDatabaseSchema={addDatabaseSchema}
              />
            </div>
          </div>
        ) : <Spinner />}
      </Dialog>
    );
  }
}

TaskOverlay.defaultProps = {
  taskId: null,
};

TaskOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  taskId: PropTypes.number,
  userList: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  boardId: PropTypes.number.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { database, account } = state;
  return { userList: database.User, account, database };
};
export default connect(mapStateToProps)(TaskOverlay);
