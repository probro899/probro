import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

class Column extends Component {
  state = {};

  render() {
    const {
      column,
      onTaskClick,
      tags,
    } = this.props;
    return (
      <div className="column-container">
        <div className="column-inner-container">
          <div
            className="column-title"
          >
            <span>
              {column.name}
            </span>
          </div>
          <div className="task-list">
            {column.tasks.filter(o => !o.deleteStatus).map((obj, index) => {
              const task = obj;
              return (
                <Task
                  key={`task${task.id}`}
                  task={task}
                  index={index}
                  tags={tags}
                  onClick={onTaskClick}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  column: PropTypes.objectOf(PropTypes.any).isRequired,
  tags: PropTypes.objectOf(PropTypes.any).isRequired,
  onTaskClick: PropTypes.func.isRequired,
};

export default Column;
