import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { timeStampSorting } from '../../../../common/utility-functions';
import DeletePopOver from '../../../../common/DeletePopOver';
import CommentDesc from './CommentDesc';
import TaskActivity from './TaskActivity';
import { ENDPOINT } from '../../../../config';
import RoundPicture from '../../../../components/RoundPicture';
import { FormTextArea } from '../../../../common/Form/FormTextArea';
import { Button } from '../../../../common/utility-functions/Button/Button';

class TaskComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deletePopover: false, editCommentId: null, comment: '', activeComment: {} };
  }

  editComment = (com) => {
    this.setState({ editCommentId: com.id, comment: com.comment });
  }

  commentChange = (e) => this.setState({ comment: e.target.value });

  saveComment = async () => {
    try {
      const { editCommentId, comment } = this.state;
      const { apis, updateDatabaseSchema, boardId } = this.props;
      await apis.updateBoardColumnCardComment([{ comment, broadCastId: `Board-${boardId}` }, { id: editCommentId }]);
      updateDatabaseSchema('BoardColumnCardComment', { comment, id: editCommentId });
      this.setState({ editCommentId: null });
    } catch (e) {
      console.error('Comment update error', e);
    }
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

  togglePopover = (com) => this.setState({ deletePopover: true, activeComment: com })

  deleteComment = async (type) => {
    try {
      const { apis, boardId, deleteDatabaseSchema } = this.props;
      const { activeComment } = this.state;
      if (type === 'confirm') {
        await apis.deleteBoardColumnCardComment({ id: activeComment.id, cardId: activeComment.boardColumnCardId, broadCastId: `Board-${boardId}` });
        deleteDatabaseSchema('BoardColumnCardComment', { id: activeComment.id });
      }
      this.setState({ deletePopover: false, activeComment: {} });
    } catch (e) {
      console.error('delete Comment error', e);
    }
  }

  getCommentUser = (com) => {
    const { user, userDetail } = com.user;
    return { user, userDetail };
  }

  getHistory = (com, color) => {
    const { account, userList, userDetailList, columns } = this.props;
    const { editCommentId, comment } = this.state;
    if (com.message) return <TaskActivity color={color} userList={userList} userDetailList={userDetailList} columns={columns} key={`activity${com.id}`} activity={com} />;
    const userInfo = this.getCommentUser(com);
    const name = userInfo.user.middleName ? `${userInfo.user.firstName} ${userInfo.user.middleName} ${userInfo.user.lastName}` : `${userInfo.user.firstName} ${userInfo.user.lastName}`;
    const imgUrl = userInfo.userDetail && userInfo.userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(userInfo.user.id, 10)}/profile/${userInfo.userDetail.image}` : '/assets//graphics/user.svg';
    return (
      <div className="s-comment" style={{ backgroundColor: color }} key={`com-${com.id}`}>
        <div className="img-con"><RoundPicture imgUrl={imgUrl} /></div>
        <div className="com-con">
          <div className="com-auth">
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{name}</span>
            <small style={{ opacity: 0.8 }}>
              {' '}
              {moment(com.timeStamp).format('DD MMM YYYY hh:mm A')}
            </small>
          </div>
          <div className="com-desc">
            {
              editCommentId !== com.id ? <CommentDesc comment={com.comment} /> : (
                <div className="pc-comment-edit">
                  <div className="pc-comment-box">
                    <FormTextArea
                      fill
                      resizable
                      small
                      style={{ fontSize: 16, padding: '2px' }}
                      placeholder="Put your comments."
                      value={comment}
                      className="pc-text-area"
                      onChange={e => this.commentChange(e)}
                    />
                  </div>
                  <span className="buttons-group">
                    <Button
                      type="button"
                      buttonStyle="btn--primary--outline"
                      buttonSize="btn--small"
                      title="Save"
                      onClick={this.saveComment}
                    />
                    <Button
                      type="button"
                      buttonStyle="btn--danger--outline"
                      buttonSize="btn--small"
                      title="Cancel"
                      onClick={() => this.setState({ editCommentId: null })}
                    />
                  </span>
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
                      <small className="primary" onClick={() => this.editComment(com)}>
                        <u>Edit</u>
                      </small>
                      <small className="danger" onClick={() => this.togglePopover(com)}>
                        <u>Delete</u>
                      </small>
                    </div>
                  ) : (
                    <small className="primary" onClick={() => this.replyComment(com)}>
                      <u>Reply</u>
                    </small>
                  )
                }
              </div>
            )}
        </div>
      </div>
    );
  }

  render() {
    const { comments } = this.props;
    const { deletePopover } = this.state;
    return (
      <div className="comments">
        <DeletePopOver isOpen={deletePopover} name="Comment" action={this.deleteComment} />
        <h3>History</h3>
        {comments.sort(timeStampSorting).map((obj, index) => this.getHistory(obj, index % 2 === 0 ? '#eee' : '#fff'))}
      </div>
    );
  }
}

TaskComment.propTypes = {
  userList: PropTypes.objectOf(PropTypes.any).isRequired,
  userDetailList: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  boardId: PropTypes.number.isRequired,
  commentReply: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  columns: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
};

export default TaskComment;
