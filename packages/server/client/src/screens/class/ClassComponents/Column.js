import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import NewTask from './NewTask';
import { MoreButton, PopoverForm } from '../../../components';
import DeletePopOver from '../../../common/DeletePopOver';
import { columnSchema } from './structure';
import TaskWrapper from './dndComponents/TaskWrapper';

class Column extends Component {
    state = { columnDeletePopOver: false, id: null, columnEditPopOver: false, };

    onMore = async (action, id) => {
        if (action === 'delete') {
            this.setState({ id, columnDeletePopOver: true });
        }
        if (action === 'edit') {
            this.setState({ id, columnEditPopOver: true });
        }
    }

    deleteColumn = async (type) => {
        const { api, deleteDatabaseSchema, boardId } = this.props;
        const { id } = this.state;
        if (type === 'confirm') {
            await api.deleteBoardColumn({ id, boardId, broadCastId: `Board-${boardId}` });
            deleteDatabaseSchema('BoardColumn', { id });
        }
        this.setState({ id: null, columnDeletePopOver: false });
    }

    updateColumnName = async (data) => {
        const { api, updateDatabaseSchema, boardId } = this.props;
        const { id } = this.state;
        await api.updateBoardColumn([{ ...data, todo: 'updateTitle', boardId, broadCastId: `Board-${boardId}` }, { id }]);
        updateDatabaseSchema('BoardColumn', { ...data, id });
        this.setState({ id: null, columnEditPopOver: false });
        return { response: 200 };
    }

    closeUpdatePopOver = () => {
        const { columnEditPopOver } = this.state;
        this.setState({ columnEditPopOver: !columnEditPopOver });
    }

    render() {
        const { column, columnId, onTaskClick, boardId, moveTask, handle, dragStartEnd,
            setDraggingContent, reference, api,
        } = this.props;
        const { columnDeletePopOver, columnEditPopOver } = this.state;
        const schema = columnSchema(column);
        return (
            <div className="column-inner-container" ref={reference}>
                <PopoverForm
                    onClose={this.closeUpdatePopOver}
                    callback={this.updateColumnName}
                    isOpen={columnEditPopOver}
                    structure={schema}
                />
                <DeletePopOver
                    isOpen={columnDeletePopOver}
                    action={this.deleteColumn}
                    name={column.name}
                />
                <div className="column-title" ref={handle}>
                    <div className="text">
                        <p className="task-title">{column.name}</p>
                        <span className="task-count">Total Task: {column.tasks.length}</span></div>
                    <MoreButton id={columnId} onMore={this.onMore} />
                </div>
                <div className="task-list">
                    {column.tasks.filter(o => !o.deleteStatus).map((task, index) => (
                        <TaskWrapper
                            dragStartEnd={dragStartEnd}
                            setDraggingContent={setDraggingContent}
                            moveTask={moveTask}
                            index={index}
                            task={task}
                            key={`task${task.id}`}
                            draggableId={`task${task.id}`}
                        >
                            <Task
                                task={task}
                                index={index}
                                onClick={onTaskClick}
                            />
                        </TaskWrapper>
                    ))}
                </div>
                <NewTask api={api} columnId={column.id} boardId={boardId} />
            </div>
        );
    }
}

Column.propTypes = {
    column: PropTypes.objectOf(PropTypes.any).isRequired,
    api: PropTypes.objectOf(PropTypes.any).isRequired,
    columnId: PropTypes.number.isRequired,
    onTaskClick: PropTypes.func.isRequired,
    updateDatabaseSchema: PropTypes.func.isRequired,
    deleteDatabaseSchema: PropTypes.func.isRequired,
    boardId: PropTypes.number.isRequired,
    moveTask: PropTypes.func.isRequired,
};

export default Column;
