import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import NewTask from './NewTask';
import { MoreButton, PopoverForm } from '../../../components';
import DeletePopOver from '../../../common/DeletePopOver';
import UpdateColumnStructure from './structure';
import TaskWrapper from './dndComponents/TaskWrapper';

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
    const { api, deleteDatabaseSchema, boardId } = this.props;
    const { id } = this.state;
    if (type === 'confirm') {
      await api.deleteBoardColumn({ id, boardId, broadCastId: `Board-${boardId}` });
      deleteDatabaseSchema('BoardColumn', { id });
    }
    this.setState({
      id: '',
      columnDeletePopOver: false,
    });
  }

  updateColumnName = async (data) => {
    const { api, updateDatabaseSchema, boardId } = this.props;
    const { id } = this.state;
    await api.updateBoardColumn([{ ...data, boardId, broadCastId: `Board-${boardId}` }, { id }]);
    updateDatabaseSchema('BoardColumn', { id, ...data });
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
      onTaskClick,
      boardId,
      moveTask,
      handle,
      dragStartEnd,
      setDraggingContent,
      reference,
      tags,
      api,
    } = this.props;
    const { columnDeletePopOver, columnEditPopOver } = this.state;
    return (
      <div className="column-inner-container" ref={reference}>
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
        <div className="column-title" ref={handle}>
          <div className="text">
            {column.name}
          </div>
          <MoreButton id={columnId} onMore={this.onMore} />
        </div>
        <div className="task-list">
          {column.tasks.filter(o => !o.deleteStatus).map((obj, index) => {
            const task = obj;
            return (
              <TaskWrapper dragStartEnd={dragStartEnd} setDraggingContent={setDraggingContent} moveTask={moveTask} index={index} task={task} key={`task${task.id}`} draggableId={`task${task.id}`}>
                <Task
                  task={task}
                  index={index}
                  tags={tags}
                  onClick={onTaskClick}
                />
              </TaskWrapper>
            );
          })}
        </div>
        <NewTask api={api} columnId={column.id} boardId={boardId} />
      </div>
    );
  }
}

Column.propTypes = {
  column: PropTypes.objectOf(PropTypes.any).isRequired,
  tags: PropTypes.objectOf(PropTypes.any).isRequired,
  api: PropTypes.objectOf(PropTypes.any).isRequired,
  columnId: PropTypes.number.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  boardId: PropTypes.number.isRequired,
  moveTask: PropTypes.func.isRequired,
};

export default Column;
