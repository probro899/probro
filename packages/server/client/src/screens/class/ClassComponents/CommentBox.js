import React from 'react';
import PropTypes from 'prop-types';
import { FormTextArea } from '../../../common/Form/FormTextArea';
import { Button } from '../../../common/utility-functions/Button/Button';

class CommentBox extends React.Component {
  state = { isFocused: false };

  commentChange = (e) => {
    const { writeComment } = this.props;
    writeComment(e.target.value);
  }

  setFocus = () => {
    if (!this.state.isFocused) this.setState({ isFocused: true });
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    const { isFocused } = this.state;
    const { comment } = this.props;
    if (this.node.contains(e.target)) return;
    if (isFocused && comment.length === 0) this.setState({ isFocused: false });
  }

  saveComment = async () => {
    const { apis, writeComment, task, account, boardId, addDatabaseSchema, comment, database } = this.props;
    if (comment.replace(/\s/g, '').length === 0) return;
    const commentObj = {
      boardColumnCardId: task.id,
      comment,
      timeStamp: Date.now(),
      userId: account.user.id,
      broadCastId: `Board-${boardId}`,
    }
    const res = await apis.addBoardColumnCardComment(commentObj);
    const userDetail = Object.values(database.UserDetail.byId).find(ud => ud.userId === account.user.id);
    addDatabaseSchema('BoardColumnCardComment', { ...commentObj, id: res, user: { user: account.user, userDetail } });
    writeComment('');
    //remove focus
    if (this.state.isFocused) this.setState({ isFocused: false });
  }

  render() {
    const { comment } = this.props;
    const { isFocused } = this.state;
    return (
      <div className="comment-container" ref={node => this.node = node}>
        <div className={`pc-comment-box ${isFocused && 'is-focused'}`}>
          <FormTextArea
            resizable
            onFocus={this.setFocus}
            placeholder="Write a comment…"
            value={comment}
            className="pc-text-area"
            onChange={e => this.commentChange(e)}
          />
          <div className="pc-cmt-btn">
            <Button
              title="submit"
              onClick={this.saveComment}
              type="button"
              buttonStyle="btn--primary--solid"
              buttonSize="btn--small"
            />
          </div>
        </div>
      </div>
    );
  }
}

CommentBox.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  writeComment: PropTypes.func.isRequired,
  boardId: PropTypes.number.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  comment: PropTypes.string.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CommentBox;
