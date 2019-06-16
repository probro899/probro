import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

class Task extends Component {
  state = {};

  onClick = () => {
    const { onClick, task } = this.props;
    onClick(task.id);
  };

  render() {
    const { task, index } = this.props;
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
            {task.name}
          </div>
        )}
      </Draggable>
    );
  }
}

Task.propTypes = {
  onClick: PropTypes.func.isRequired,
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default Task;
