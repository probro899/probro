/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tag, Icon } from '@blueprintjs/core';
import { FaRegCommentAlt } from 'react-icons/fa';


class Task extends Component {
  constructor(props) {
    super(props);
    const { tags, task, comments, attachments } = this.props;
    const allTags = Object.values(tags.byId).filter(obj => task.id === obj.boardColumnCardId && !obj.deleteStatus);
    this.state = {
      allTags,
      comments: Object.values(comments.byId).filter(obj => task.id === obj.boardColumnCardId && !obj.deleteStatus).length,
      attachments: Object.values(attachments.byId).filter(obj => task.id === obj.boardColumnCardId && !obj.deleteStatus).length,
    };
  }

  componentDidUpdate(prevProps) {
    const { tags, task } = this.props;
    if (tags.allIds !== prevProps.tags.allIds) {
      const allTags = Object.values(tags.byId).filter(obj => task.id === obj.boardColumnCardId && !obj.deleteStatus);
      this.setState({ allTags });
    }
  }

  onClick = () => {
    const { onClick, task } = this.props;
    onClick(task.id);
  };

  render() {
    const { task } = this.props;
    const { allTags, attachments, comments } = this.state;
    return (
      <div
        id={`id_task_${task.id}`}
        className="task-container"
        onClick={this.onClick}
        role="menuitem"
        tabIndex={0}
      >
        <div className="pc-task-flag">
          <div className="pc-tag-view">
            {
              allTags.map((obj, index) => <Tag className="pc-tag" key={index} intent={obj.tag} />)
            }
          </div>
          <div className="pc-deadline-view">
            {task.Deadline && (
              <p
                className={task.Deadline < new Date() ? 'expire' : 'no-expire'}
              >
                {moment(task.Deadline).format('YYYY-MM-DD')}
              </p>
            )}
          </div>
        </div>
        <p className="pc-task-name">{task.name}</p>
        <div className="task-footer">
          {
            comments > 0 && (
              <div className="pc-item">
                <FaRegCommentAlt size="0.8em" className="pc-icon" />
                <span className="pc-count">{comments}</span>
              </div>
            )
          }
          {
            attachments > 0 && (
              <div className="pc-item">
                <Icon icon="paperclip" color="#137cbd" iconSize={14} />
                <span className="pc-count">{attachments}</span>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  onClick: PropTypes.func.isRequired,
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  tags: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  const { database } = state;
  return {
    tags: database.BoardColumnCardTag,
    comments: database.BoardColumnCardComment,
    attachments: database.BoardColumnCardAttachment,
  };
};

export default connect(mapStateToProps)(Task);
