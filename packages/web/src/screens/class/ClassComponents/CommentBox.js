import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Button } from '@blueprintjs/core';

class CommentBox extends React.Component {
  state = {};

  commentChange = (e) => {
    const { writeComment } = this.props;
    writeComment(e.target.value);
  }

  saveComment = async () => {
    const {
      apis, writeComment, task, account, boardId, addDatabaseSchema,
      comment,
    } = this.props;
    if (comment.replace(/\s/g, '').length === 0) {
      return;
    }
    const res = await apis.addBoardColumnCardComment({
      boardColumnCardId: task.id,
      comment,
      timeStamp: Date.now(),
      userId: account.user.id,
      broadCastId: `Board-${boardId}`,
    });
    addDatabaseSchema('BoardColumnCardComment', {
      id: res,
      boardColumnCardId: task.id,
      comment,
      timeStamp: Date.now(),
      userId: account.user.id,
    });
    writeComment('');
  }

  render() {
    const { comment } = this.props;
    return (
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
          intent="primary"
          onClick={this.saveComment}
        />
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
};

export default CommentBox;
