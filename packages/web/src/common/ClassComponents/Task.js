import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

class Task extends Component {
  state = {};

  render() {
    const { task, index } = this.props;
    return (
      <Draggable
        draggableId={task.id}
        index={index}
      >
        {provided => (
          <div
            className="task-container"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {task.content}
          </div>
        )}
      </Draggable>
    );
  }
}

Task.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default Task;
