import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import NewTask from './NewTask';
import sorting from '../../screens/users/utility-functions';

class Column extends Component {
  state = {};

  render() {
    const {
      column,
      columnId,
      index,
      cards,
    } = this.props;
    return (
      <Draggable
        draggableId={`${column.id}`}
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
                    {cards.map((obj, index) => {
                      if (obj.boardColumnId === columnId) {
                        const task = obj;
                        return <Task key={task.id} task={task} index={index} />;
                      }
                    })}
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
  cards: PropTypes.arrayOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { database } = state;
  const cards = Object.values(database.BoardColumnCard.byId)
    .sort(sorting);
  return { cards };
};

export default connect(mapStateToProps)(Column);
