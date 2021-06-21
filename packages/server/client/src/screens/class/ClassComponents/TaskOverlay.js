import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import { MdEdit } from "react-icons/md";
import * as actions from '../../../actions';
import Tag from '../../../common/Tag';
import { timeStampSorting, getProfileImage } from '../../../common/utility-functions';
import TaskComment from './history/TaskComment';
import TaskDetailRight from './TaskDetailRight';
import { ENDPOINT } from '../../../config';
import CommentBox from './CommentBox';
import { AttachmentList } from './attachment';
import Spinner from '../../../common/spinner';
import Popup from '../../../common/Form/Popup';
import { FormTextArea } from '../../../common/Form/FormTextArea';
import { Button } from '../../../common/utility-functions/Button/Button';
import TaskDescription from './task-detail/TaskDescription';

class TaskOverlay extends Component {
  state = {
    editHead: false,
    loading: true,
    task: {},
    comments: [],
    description: {},
    attachments: [],
    tags: [],
    title: '',
    comment: '',
    activities: [],
  };

  componentWillReceiveProps(nextProps) {
    const { taskId, database } = nextProps;
    const task = Object.values(database.BoardColumnCard.byId).find(o => o.id === taskId);
    if (!task) {
      this.setState({ loading: true });
      return;
    }
    // filter deleted
    const commentsCard = Object.values(database.BoardColumnCardComment.byId).filter(obj => taskId === obj.boardColumnCardId && !obj.deleteStatus).sort(timeStampSorting);
    const attachmentsCard = Object.values(database.BoardColumnCardAttachment.byId).filter(obj => taskId === obj.boardColumnCardId && !obj.deleteStatus).sort(timeStampSorting);
    // finding all the tags here
    const allTags = Object.values(database.BoardColumnCardTag.byId).filter(obj => taskId === obj.boardColumnCardId && !obj.deleteStatus);
    // finding the latest description
    const latestDesription = Object.values(database.BoardColumnCardDescription.byId).filter(obj => taskId === obj.boardColumnCardId).sort(timeStampSorting)[0];
    // get all the participants
    const participants = Object.values(database.TaskParticipant.byId).filter(o => o.taskId === taskId && !o.deleteStatus).map(o => {
      const memberObj = database.BoardMember.byId[o.participantId];
      return { ...o, userDetail: memberObj.user.userDetail || {} }
    });
    let newState = {
      comments: commentsCard,
      attachments: attachmentsCard,
      tags: allTags,
      description: latestDesription,
      title: task.name,
      task,
      participants,
    }
    this.setState(newState);
  }

  // on overlay close
  onClose = () => {
    const { onClose, taskId } = this.props;
    onClose(taskId);
    this.setState({ editHead: false, loading: true, editDesc: false, comment: '', });
  };

  // toggle between the element of title
  toggleElemTitle = () => this.setState({ editHead: !this.state.editHead })

  // changing title of the task
  titleChange = (e) => this.setState({ title: e.target.value })

  saveTitle = async () => {
    try {
      const { apis, boardId, updateDatabaseSchema } = this.props;
      const { task, title } = this.state;
      await apis.updateBoardColumnCard([{
        name: title,
        broadCastId: `Board-${boardId}`,
      }, { id: task.id }]);
      updateDatabaseSchema('BoardColumnCard', { id: task.id, name: title });
      this.toggleElemTitle();
    } catch (e) {
      console.error(e)
    }
  }

  deleteAttachment = async (id, url) => {
    const { task } = this.state;
    const { apis, deleteDatabaseSchema, account, boardId } = this.props;
    try {
      await axios.post(`${ENDPOINT}/web/delete-file`, { token: account.sessionId, content: 'board', fileName: url });
      await apis.deleteBoardColumnCardAttachment({ id, broadCastId: `Board-${boardId}`, cardId: task.id });
      deleteDatabaseSchema('BoardColumnCardAttachment', { id });
    } catch (e) {
      console.log('Error');
    }
  }

  writeComment = (name) => this.setState({ comment: name })

  getCardActivity = async () => {
    try {
      const { apis } = this.props;
      const { task } = this.state;
      const res = await apis.getCardActivity({ cardId: task.id });
      this.setState({
        loading: false,
        activities: res.cardActivities.filter(o => o.message === 'createCard' || o.message === 'outsideColumn'),
      });
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const { editHead, participants, task, comments, attachments, title, description, tags, comment, activities, loading } = this.state;
    const {
      userList, apis, boardId, onClose,
      deleteDatabaseSchema, updateDatabaseSchema, addDatabaseSchema, account, isOpen, database,
    } = this.props;
    return (
      <Popup
        isOpen={isOpen}
        onClose={this.onClose}
        onOpening={this.getCardActivity}
        width="800px"
      >
        {!loading ? (
          <div className="task-detail-overlay">
            <div className="overlay-title">
              <div className="head">
                {editHead ? (
                  <>
                    <FormTextArea value={title} resizable className="pc-text-area" onChange={e => this.titleChange(e)} />
                    <div className="buttons-group">
                      <Button type="button" buttonStyle="btn--primary--solid" buttonSize="btn--small" title="save" onClick={this.saveTitle} />
                      <Button type="button" buttonStyle="btn--danger--outline" buttonSize="btn--small" title="cancel" onClick={this.toggleElemTitle} />
                    </div>
                  </>
                ) : <span className="title">{task.name}</span>}
                {!editHead && (
                  <div className="edit-icon">
                    <MdEdit size={20} onClick={this.toggleElemTitle} />
                  </div>
                )}
              </div>
            </div>
            <div className="overlay-body">
              <div className="left-part">
                <div className="pc-tags-and-deadline">
                  <div className="task-tag-container">
                    {tags.map((obj) => <Tag key={obj.id} color={obj.tag} />)}
                  </div>
                  <ul className="participant-view">
                    {
                      participants.map((o) => (
                        <li key={`participate-${o.id}`}>
                          <figure className="participant-image">
                            <img src={getProfileImage(o.userDetail)} alt="participant avatar" />
                          </figure>
                        </li>
                      ))
                    }
                  </ul>
                  <div className="pc-deadline-view">
                    {task.Deadline && <p className={task.Deadline < new Date() ? 'expire' : 'no-expire'}>{`Deadline: ${moment(task.Deadline).format('YYYY-MM-DD')}`}</p>}
                  </div>
                </div>
                <TaskDescription
                  description={description}
                  apis={apis}
                  account={account}
                  boardId={boardId}
                  task={task}
                  addDatabaseSchema={addDatabaseSchema}
                  updateDatabaseSchema={updateDatabaseSchema}
                />
                <AttachmentList
                  attachments={attachments}
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
                participants={participants}
                deleteDatabaseSchema={deleteDatabaseSchema}
                updateDatabaseSchema={updateDatabaseSchema}
                addDatabaseSchema={addDatabaseSchema}
              />
            </div>
          </div>
        ) : <div style={{ height: 150, position: 'relative' }}><Spinner /></div>}
      </Popup>
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

export default connect(mapStateToProps, { ...actions })(TaskOverlay);
