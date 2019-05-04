import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import NewTask from './NewTask';

class Column extends Component {
  state = {};

  render() {
    const { column, tasks, index } = this.props;
    return (
      <Draggable
        draggableId={column.id}
        index={index}
      >
        {provided => (
          <div
            className="column-container"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="column-inner-container">
              <div
                className="column-title"
                {...provided.dragHandleProps}
              >
                <span>
                  {column.title}
                </span>
              </div>
              <Droppable
                droppableId={column.id}
                type="task"
              >
                {provided => (
                  <div
                    className="task-list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              {provided.placeholder}
              <NewTask columnId={column.id} />
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

Column.propTypes = {
  column: PropTypes.objectOf(PropTypes.any).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default Column;
