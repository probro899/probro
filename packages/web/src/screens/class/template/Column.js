import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';

class Column extends Component {
  state = {};

  render() {
    const {
      column,
      index,
      onTaskClick,
      tags,
    } = this.props;
    return (
      <Draggable
        draggableId={`column${column.id}`}
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
                  {column.name}
                </span>
              </div>
              <Droppable
                droppableId={`${column.id}`}
                type="task"
              >
                {provided => (
                  <div
                    className="task-list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
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
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              {provided.placeholder}
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

Column.propTypes = {
  column: PropTypes.objectOf(PropTypes.any).isRequired,
  tags: PropTypes.objectOf(PropTypes.any).isRequired,
  api: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  columnId: PropTypes.number.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  boardId: PropTypes.number.isRequired,
};

export default Column;
