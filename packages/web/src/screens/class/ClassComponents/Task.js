import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import { Tag } from '@blueprintjs/core';

class Task extends Component {
  constructor(props) {
    super(props);
    const { tags, task } = this.props;
    const allTags = Object.values(tags.byId).filter((obj) => {
      if (task.id === obj.boardColumnCardId) {
        return obj;
      }
    });
    this.state = {
      allTags,
    };
  }

  componentDidUpdate(prevProps) {
    const { tags, task } = this.props;
    if (tags.allIds !== prevProps.tags.allIds) {
      const allTags = Object.values(tags.byId).filter((obj) => {
        if (task.id === obj.boardColumnCardId) {
          return obj;
        }
      });
      this.setState({
        allTags,
      });
    }
  }

  onClick = () => {
    const { onClick, task } = this.props;
    onClick(task.id);
  };

  render() {
    const { task, index } = this.props;
    const { allTags } = this.state;
    return (
      <Draggable
        draggableId={`task${task.id}`}
        index={index}
      >
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task-container"
            onClick={this.onClick}
            onKeyDown={this.onClick}
            role="menuitem"
            tabIndex={0}
          >
            <div className="pc-task-flag">
              <div className="pc-tag-view">
                {
                  allTags.map((obj, index) => {
                    return (
                      <Tag
                        key={index}
                        intent={obj.tag}
                        style={{ marginRight: '5px' }}
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
                    {moment(task.Deadline).format('YYYY-MM-DD')}
                  </p>
                )}
              </div>
            </div>
            <p className="pc-task-name">{task.name}</p>
          </div>
        )}
      </Draggable>
    );
  }
}

Task.propTypes = {
  onClick: PropTypes.func.isRequired,
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  tags: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default Task;
