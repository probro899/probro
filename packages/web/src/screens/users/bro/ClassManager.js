import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Column, NewColumn, TaskOverlay, ToolBar } from '../../../common/ClassComponents';
import { Navbar } from '../../home/component';
import * as actions from '../../../actions';
import client from '../../../socket';
import posSorting, { timeStampSorting } from '../utility-functions';


class Classes extends Component {
  state = {
    // true if the id in the url doesn't match
    redirectionError: false,
    api: {},
    classId: 0,
    columns: [],
    tasks: [],
    comments: [],
    attachments: [],
    descriptions: [],
    taskOverlayIsOpen: false,
    // the task id contained in the overlay
    taskIdInOverlay: 0,
  };

  componentDidMount() {
    const {
      account,
      match,
    } = this.props;
    client.scope('Mentee').then((result) => {
      // checking if the user's sessionid is real
      if (match.params.id === account.sessionId) {
        this.setState({
          api: result,
          classId: parseInt(match.params.classId, 10),
        });
        // this is to ensure the props loaded in the component
        this.componentWillReceiveProps(this.props);
      } else {
        this.setState({
          redirectionError: true,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      tasks,
      columns,
      comments,
      attachments,
      descriptions,
      match,
    } = nextProps;
    const wholeColumns = [];
    Object.values(columns.byId).map((obj) => {
      if (obj.boardId === Number(match.params.classId)) {
        const column = { ...obj };
        const task = [];
        Object.values(tasks.byId).map((ob) => {
          if (ob.boardColumnId === obj.id) {
            task.push(ob);
          }
        });
        task.sort(posSorting);
        column.tasks = task;
        wholeColumns.push(column);
      }
    });
    this.setState({
      tasks: Object.values(tasks.byId),
      columns: wholeColumns.sort(posSorting),
      // comments are sorted in descending order of timestamp
      comments: Object.values(comments.byId).sort(timeStampSorting),
      attachments: Object.values(attachments.byId),
      descriptions: Object.values(descriptions.byId),
    });
  }

  // all the drag and drop will be handled here
  onDragEnd = async (result) => {
    const { source, destination, draggableId, type } = result;
    const { api, columns } = this.state;
    if (!destination) {
      return;
    }
    // column moving around
    if (type === 'column') {
      if (source.index === destination.index) {
        return;
      }
      const columnId = Number(draggableId.split('column')[1]);
      const newColumns = columns;
      let column = {};
      columns.map((obj) => {
        if (obj.id === columnId) {
          column = obj;
        }
      });
      // testing for the swapping either in start, middle or end.
      if (destination.index === 0) {
        column.position = columns[0].position / 2;
      } else if (destination.index === columns.length - 1) {
        column.position = columns[destination.index].position + 16384;
      } else {
        if (source.index > destination.index) {
          column.position = (columns[destination.index - 1].position
            + columns[destination.index].position) / 2;
        }
        if (source.index < destination.index) {
          column.position = (columns[destination.index].position
            + columns[destination.index + 1].position) / 2;
        }
      }
      newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, column);
      this.setState({
        columns: newColumns,
      });
      await api.updateBoardColumn([
        { position: column.position, timeStamp: Date.now() }, { id: columnId }]);
      return;
    }
    // finished column moving around here
    // cards movement within the column
    if (source.droppableId === destination.droppableId) {
      const dropable = Number(source.droppableId);
      const dragable = Number(draggableId.split('task')[1]);
      const newColumns = columns;
      let columnIndex;
      let newColumn = {};
      let newTasks = [];
      columns.map((obj, index) => {
        if (obj.id === dropable) {
          newColumn = obj;
          newTasks = obj.tasks;
          columnIndex = index;
        }
      });
      let newTask = {};
      newTasks.map((o) => {
        if (o.id === dragable) {
          newTask = o;
        }
      });
      if (destination.index === 0) {
        newTask.position = newTasks[0].position / 2;
      } else if (destination.index === newTasks.length - 1) {
        newTask.position = newTasks[destination.index].position + 16384;
      } else {
        if (source.index > destination.index) {
          newTask.position = (newTasks[destination.index - 1].position
            + newTasks[destination.index].position) / 2;
        }
        if (source.index < destination.index) {
          newTask.position = (newTasks[destination.index].position
            + newTasks[destination.index + 1].position) / 2;
        }
      }
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, newTask);
      newColumn.tasks = newTasks;
      newColumns.splice(columnIndex, 1);
      newColumns.splice(columnIndex, 0, newColumn);
      this.setState({
        columns: newColumns,
      });
      await api.updateBoardColumnCard([
        { position: newTask.position, timestamp: Date.now() }, { id: dragable }]);
      return;
    }
    // cards movement within the column ends here
    // inter column task move using state
    const sourceDropable = Number(source.droppableId);
    const destinationDropable = Number(destination.droppableId);

    const dragable = Number(draggableId.split('task')[1]);
    const newColumns = columns;
    let sourceColumnIndex;
    let destinationColumnIndex;
    let fromColumn = {};
    let toColumn = {};
    newColumns.map((obj, index) => {
      if (obj.id === sourceDropable) {
        fromColumn = obj;
        sourceColumnIndex = index;
      }
      if (obj.id === destinationDropable) {
        toColumn = obj;
        destinationColumnIndex = index;
      }
    });
    const fromTasks = fromColumn.tasks;
    const toTasks = toColumn.tasks;
    let newTask;
    fromTasks.map((obj) => {
      if (obj.id === dragable) {
        newTask = obj;
      }
    });
    fromTasks.splice(source.index, 1);
    if (destination.index === 0) {
      if (toTasks.length !== 0) {
        newTask.position = toTasks[0].position / 2;
      } else {
        newTask.position = 16384;
      }
    } else if (destination.index === toTasks.length) {
      newTask.position = toTasks[destination.index - 1].position + 16384;
    } else {
      newTask.position = (toTasks[destination.index - 1].position
        + toTasks[destination.index].position) / 2;
    }
    toTasks.splice(destination.index, 0, newTask);
    toColumn.tasks = toTasks;
    fromColumn.tasks = fromTasks;
    newColumns.splice(sourceColumnIndex, 1);
    newColumns.splice(sourceColumnIndex, 0, fromColumn);
    newColumns.splice(destinationColumnIndex, 1);
    newColumns.splice(destinationColumnIndex, 0, toColumn);
    this.setState({
      columns: newColumns,
    });
    // console.log('moved intercard', newTask, dragable);
    await api.updateBoardColumnCard([
      {
        position: newTask.position,
        timeStamp: Date.now(),
        boardColumnId: destinationDropable,
      },
      { id: dragable },
    ]);
  }

  toggleTaskOverlay = (id) => {
    const { taskOverlayIsOpen } = this.state;
    this.setState({
      taskIdInOverlay: id,
      taskOverlayIsOpen: !taskOverlayIsOpen,
    });
  }

  render() {
    const {
      classId,
      columns,
      tasks,
      redirectionError,
      api,
      taskIdInOverlay,
      taskOverlayIsOpen,
      comments,
      attachments,
      descriptions,
    } = this.state;
    const { addDatabaseSchema, tags, updateDatabaseSchema, deleteDatabaseSchema } = this.props;
    // console.log('classmanager', columns, tasks);
    return (
      <div style={{ position: 'relative' }}>
        {redirectionError && <Redirect to="/" />}
        <Navbar className="pcm-nav" />
        <ToolBar boardId={classId} apis={api} />
        <div
          className="class-wrapper"
          style={{ height: window.innerHeight }}
        >
          <DragDropContext
            onDragEnd={this.onDragEnd}
          >
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              { provided => (
                <div
                  className="columns"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {
                    columns.map((column, index) => {
                      if (column.boardId === classId) {
                        return (
                          <Column
                            key={`column${column.id}`}
                            column={column}
                            columnId={column.id}
                            index={index}
                            api={api}
                            tags={tags}
                            boardId={classId}
                            addDatabaseSchema={addDatabaseSchema}
                            updateDatabaseSchema={updateDatabaseSchema}
                            deleteDatabaseSchema={deleteDatabaseSchema}
                            // passing it for the task overlay open
                            onTaskClick={this.toggleTaskOverlay}
                          />
                        );
                      }
                    })
                  }
                  {provided.placeholder}
                  <NewColumn classId={classId} />
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <TaskOverlay
          apis={api}
          isOpen={taskOverlayIsOpen}
          taskId={taskIdInOverlay}
          tasks={tasks}
          onClose={this.toggleTaskOverlay}
          comments={comments}
          attachments={attachments}
          descriptions={descriptions}
          boardId={classId}
          tags={tags}
          addDatabaseSchema={addDatabaseSchema}
          updateDatabaseSchema={updateDatabaseSchema}
          deleteDatabaseSchema={deleteDatabaseSchema}
        />
      </div>
    );
  }
}

Classes.propTypes = {
  tasks: PropTypes.objectOf(PropTypes.any).isRequired,
  tags: PropTypes.objectOf(PropTypes.any).isRequired,
  columns: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  comments: PropTypes.objectOf(PropTypes.any).isRequired,
  descriptions: PropTypes.objectOf(PropTypes.any).isRequired,
  attachments: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { database, account } = state;
  return {
    account,
    columns: database.BoardColumn,
    tasks: database.BoardColumnCard,
    comments: database.BoardColumnCardComment,
    descriptions: database.BoardColumnCardDescription,
    attachments: database.BoardColumnCardAttachment,
    boardUsers: database.User,
    tags: database.BoardColumnCardTag,
  };
};
export default connect(mapStateToProps, { ...actions })(Classes);
