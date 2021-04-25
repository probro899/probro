import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import Tag from '../../../common/Tag';
import { timeStampSorting } from '../../../common/utility-functions';
import TaskComment from './history/TaskComment';
import TaskDetailRight from './TaskDetailRight';
import { ENDPOINT } from '../../../config';
import CommentBox from './CommentBox';
import { AttachmentList } from './attachment';
import Spinner from '../../../common/spinner';
import Description from './task-detail/Description';
import Popup from '../../../common/Form/Popup';
import { FormTextArea } from '../../../common/Form/FormTextArea';
import { Button } from '../../../common/utility-functions/Button/Button';
import { AiOutlineEdit, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

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
    const { taskId, database } = nextProps;
    const { editDesc } = this.state;

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
    let newState = {
      comments: commentsCard,
      attachments: attachmentsCard,
      tags: allTags,
      description: latestDesription,
      title: task.name,
      task,
    }
    if (!editDesc) {
      const newDesc = latestDesription ? latestDesription.title : '';
      newState['desc'] = newDesc;
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
  
  // description change of the task
  descChange = (val) => this.setState({ desc: val });

  // toggle between the element of description
  toggleElemDesc = () => this.setState({ editDesc: !this.state.editDesc }); 

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

  
  
  saveDesc = async () => {
    try {
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
    } catch (e) {
      console.error(e);
    }
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
                {editHead ? <FormTextArea value={title} onChange={e => this.titleChange(e)} />
                  : <span className="title">{task.name}</span>
                }
                {editHead
                  ? (
                    <div className="buttons-group">
                      <Button
                        icon={<AiOutlineCheck size={20} />}
                        type="button"
                        buttonStyle="btn--success--outline"
                        buttonSize="btn--small"
                        onClick={this.saveTitle}
                      />
                      <Button
                        icon={<AiOutlineClose size={20} />}
                        type="button"
                        buttonStyle="btn--danger--outline"
                        buttonSize="btn--small"
                        onClick={this.toggleElemTitle}
                      />
                    </div>
                  )
                  : (
                    <div className="buttons-group">
                      <AiOutlineEdit size={20} onClick={this.toggleElemTitle} />
                    </div>
                  )
                }
              </div>
            </div>
            <div className="overlay-body">
              <div className="left-part">
                <div className="pc-tags-and-deadline">
                  <div className="task-tag-container">
                    {tags.map(obj => <Tag key={obj.id} color={obj.tag} />)}
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
                            icon={<AiOutlineCheck size={20} />}
                            type="button"
                            buttonStyle="btn--success--outline"
                            buttonSize="btn--small"
                            onClick={this.saveDesc}
                          />
                          <Button
                            icon={<AiOutlineClose size={20} />}
                            type="button"
                            buttonStyle="btn--danger--outline"
                            buttonSize="btn--small"
                            onClick={this.toggleElemDesc}
                          />
                        </span>
                      )
                      : (
                        <div className="buttons-group">
                          <AiOutlineEdit size={20} onClick={this.toggleElemDesc} />
                        </div>
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
export default connect(mapStateToProps)(TaskOverlay);
