import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Dialog, Button, TextArea, Tag, Icon } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { timeStampSorting } from '../../../common/utility-functions';
import TaskComment from '../ClassComponents/history/TaskComment';
import { AttachmentList } from '../ClassComponents/attachment';

class TaskOverlay extends Component {
  state = {
    editHead: false,
    editDesc: false,
    loading: true,
    task: {},
    comments: [],
    description: {},
    attachments: [],
    title: '',
    desc: '',
    activities: [],
  };

  componentWillReceiveProps(nextProps) {
    const {
      taskId,
      tasks,
      comments,
      attachments,
      descriptions,
    } = nextProps;

    // filter deleted
    const commentsCard = comments.filter(obj => taskId === obj.boardColumnCardId && !obj.deleteStatus);
    const attachmentsCard = attachments.filter(obj => taskId === obj.boardColumnCardId && !obj.deleteStatus);
    // finding the latest description
    const latestDesription = descriptions.filter(obj => taskId === obj.boardColumnCardId).sort(timeStampSorting)[0];

    const desc = latestDesription ? latestDesription.title : '';

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
  };

  writeComment = () => {
    // do nothing
  }

  // toggle between the element of title
  toggleElemTitle = () => {
    // do nothing
  };

  // changing title of the task
  titleChange = (e) => {
    // do nothing
  }

  saveTitle = async () => {
    // do nothing
  }

  // toggle between the element of description
  toggleElemDesc = () => {
    // do nothing
  };

  // description change of the task
  descChange = (e) => {
    // do nothing
  }

  saveDesc = async () => {
    // do nothing
  }

  getTags = () => {
    const { tags } = this.props;
    const { task } = this.state;
    if (task.id) return Object.values(tags.byId).filter(obj => obj.boardColumnCardId === task.id && !obj.deleteStatus);
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
    // delete function 
  }

  getCardActivity = async () => {
    const { apis } = this.props;
    const { task } = this.state;
    const res = await apis.getCardActivity({ cardId: task.id });
    this.setState({
      loading: false,
      activities: res.cardActivities.filter(o => (o.message === 'createCard' || o.message === 'outsideColumn') && o.tColId && o.fColId),
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
      activities,
      loading,
    } = this.state;
    const {
      userList, apis, boardId,
      deleteDatabaseSchema,
      updateDatabaseSchema,
      account,
      isOpen,
      database,
    } = this.props;
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
                    {this.getTags().map(obj => <Tag key={obj.id} large intent={obj.tag} style={{ margin: 5 }} />)}
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
                <AttachmentList
                  attachments={attachments}
                  getName={this.getName}
                  Users={database.User}
                  deleteAttachment={this.deleteAttachment}
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
            </div>
          </div>
        ) : <div />}
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
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  boardId: PropTypes.number.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  attachments: PropTypes.arrayOf(PropTypes.any).isRequired,
  descriptions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  const { database, account } = state;
  return { userList: database.User, account, database };
};
export default connect(mapStateToProps)(TaskOverlay);
