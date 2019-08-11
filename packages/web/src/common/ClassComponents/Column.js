import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import NewTask from './NewTask';
import { MoreButton, PopoverForm } from '../../components';
import { DeletePopOver } from '../index';
import UpdateColumnStructure from './structure';

class Column extends Component {
  state = {
    columnDeletePopOver: false,
    id: '',
    columnEditPopOver: false,
  };

  // this is more button handle function
  onMore = async (action, id) => {
    const { column } = this.props;
    if (action === 'delete') {
      this.setState({
        id,
        columnDeletePopOver: true,
      });
    }
    if (action === 'edit') {
      UpdateColumnStructure.map((obj) => {
        if (obj.id === 'name') {
          obj.val = column.name;
        }
      });
      this.setState({
        id,
        columnEditPopOver: true,
      });
    }
  }

  deleteColumn = async (type) => {
    const { api } = this.props;
    const { id } = this.state;
    if (type === 'confirm') {
      await api.deleteBoardColumn({ id });
    }
    this.setState({
      id: '',
      columnDeletePopOver: false,
    });
  }

  updateColumnName = async (data) => {
    const { api } = this.props;
    const { id } = this.state;
    await api.updateBoardColumn([data, { id }]);
    this.setState({
      id: '',
      columnEditPopOver: false,
    });
    return { response: 200 };
  }

  closeUpdatePopOver = () => {
    const { columnEditPopOver } = this.state;
    this.setState({
      columnEditPopOver: !columnEditPopOver,
    });
  }

  render() {
    const {
      column,
      columnId,
      index,
      onTaskClick,
    } = this.props;
    const { columnDeletePopOver, columnEditPopOver } = this.state;
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
              <PopoverForm
                onClose={this.closeUpdatePopOver}
                callback={this.updateColumnName}
                isOpen={columnEditPopOver}
                structure={UpdateColumnStructure}
              />
              <DeletePopOver
                isOpen={columnDeletePopOver}
                action={this.deleteColumn}
                name={column.name}
              />
              <div
                className="column-title"
                {...provided.dragHandleProps}
              >
                <MoreButton id={columnId} onMore={this.onMore} />
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
                    {column.tasks.map((obj, index) => {
                      const task = obj;
                      return (
                        <Task
                          key={task.id}
                          task={task}
                          index={index}
                          onClick={onTaskClick}
                        />
                      );
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
  api: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  columnId: PropTypes.number.isRequired,
  onTaskClick: PropTypes.func.isRequired,
};

export default Column;
