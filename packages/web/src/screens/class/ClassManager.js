import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ColumnWrapper from './ClassComponents/dndComponents/ColumnWrapper';
import { NewColumn, TaskOverlay, ToolBar } from './ClassComponents';
import { Navbar } from '../home/component';
import * as actions from '../../actions';
import client from '../../socket';
import posSorting, { timeStampSorting } from '../../common/utility-functions';
import { Spinner } from '../../common';
import checkColumnMove from './helper-functions/checkColumnMove';
import { withinColumn, outsideColumn } from './helper-functions/checkTaskMove';
import ClassWrapper from './ClassComponents/dndComponents/ClassWrapper';

class Classes extends Component {
  state = {
    loading: true,
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
    const { match } = this.props;
    client.scope('Mentee').then((result) => {
      // checking if the user's sessionid is real
      this.setState({
        api: result,
        classId: parseInt(match.params.classId, 10),
        loading: false,
      });
      // this is to ensure the props loaded in the component
      this.componentWillReceiveProps(this.props);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { tasks, columns, account, comments, attachments, descriptions, match } = nextProps;
    const classId = Number(match.params.classId);
    if (!account.user) return;
    const wholeColumns = [];
    Object.values(columns.byId).map((obj) => {
      if (obj.boardId === classId) {
        const column = { ...obj };
        const task = Object.values(tasks.byId).filter(ob => ob.boardColumnId === obj.id);
        task.sort(posSorting);
        column.tasks = task;
        wholeColumns.push(column);
      }
    });
    this.setState({ tasks: Object.values(tasks.byId), columns: wholeColumns.sort(posSorting), comments: Object.values(comments.byId).sort(timeStampSorting), attachments: Object.values(attachments.byId), descriptions: Object.values(descriptions.byId) });
  }

  // move columns while hovering
  moveColumns = (sourceIndex, destinationIndex, draggableId) => {
    const { columns } = this.state;
    const res = checkColumnMove(columns, draggableId, { index: destinationIndex }, { index: sourceIndex });
    this.setState({ columns: res.newColumns });
  }

  // move cards along the columns
  moveTask = (source, destination, draggableId) => {
    const { columns } = this.state;
    if (source.dropableId === destination.dropableId) {
      const dragable = Number(draggableId.split('task')[1]);
      const res = withinColumn(source, destination, columns, dragable);
      this.setState({ columns: res.newColumns });
      return;
    }
    const destinationDropable = destination.dropableId;
    const dragable = Number(draggableId.split('task')[1]);
    const res = outsideColumn(source, destination, columns, destinationDropable, dragable);
    this.setState({ columns: res.newColumns });
  }

  // all the drag and drop will be handled here
  onDragEnd = async (result) => {
    const { source, destination, draggableId, type } = result;
    const { api, columns, classId } = this.state;
    if (!destination) { return; }
    // column moving around
    if (type === 'column') {
      if (source.index === destination.index) { return; }
      const res = checkColumnMove(columns, draggableId, destination, source);
      // this.setState({ columns: res.newColumns });
      await api.updateBoardColumn([
        { position: res.column.position, timeStamp: Date.now(), broadCastId: `Board-${classId}` }, { id: res.column.id }]);
      return;
    }
    // finished column moving around here

    // cards movement within the column
    if (source.droppableId === destination.droppableId) {
      const dragable = Number(draggableId.split('task')[1]);
      const res = withinColumn(source, destination, columns, dragable);
      // this.setState({ columns: res.newColumns });
      await api.updateBoardColumnCard([{ position: res.newTask.position, fColId: source.droppableId, tColId: destination.droppableId, todo: 'withinColumn', timestamp: Date.now(), broadCastId: `Board-${classId}` }, { id: dragable }]);
      return;
    }
    // cards movement within the column ends here
    // inter column task move using state
    const destinationDropable = Number(destination.droppableId);
    const dragable = Number(draggableId.split('task')[1]);
    const res = outsideColumn(source, destination, columns, destinationDropable, dragable);
    // this.setState({ columns: res.newColumns });
    await api.updateBoardColumnCard([{ todo: 'outsideColumn', fColId: source.droppableId, tColId: destination.droppableId, position: res.newTask.position, timeStamp: Date.now(), boardColumnId: destinationDropable, broadCastId: `Board-${classId}` }, { id: dragable }]);
  }

  toggleTaskOverlay = (id) => {
    const { taskOverlayIsOpen } = this.state;
    this.setState({ taskIdInOverlay: id, taskOverlayIsOpen: !taskOverlayIsOpen });
  }

  render() {
    const {
      classId, columns, tasks, api, taskIdInOverlay, taskOverlayIsOpen,
      comments, attachments, descriptions, loading,
    } = this.state;
    const {
      addDatabaseSchema, tags, account, updateDatabaseSchema,
      deleteDatabaseSchema, match, classMembers,
    } = this.props;
    if (!account.sessionId) return <Redirect to="/" />;
    if (!account.user || loading) return <Spinner />;
    if (account.user.slug !== match.params.userSlug) return <Redirect to="/" />;
    const member = Object.values(classMembers.byId).find(obj => obj.boardId === classId && !obj.deleteStatus && account.user.id === obj.tuserId);
    if (!member) { return <Redirect to={`/${match.params.userSlug}/classes`} />; }
    return (
      <DndProvider backend={HTML5Backend}>
        <div style={{ position: 'relative' }}>
          <Navbar className="pcm-nav" />
          <ToolBar boardId={classId} apis={api} />
          <div
            className="class-wrapper"
          >
            <ClassWrapper>
              {
                columns.filter(o => !o.deleteStatus).map((column, index) => {
                  if (column.boardId === classId) {
                    return (
                      <ColumnWrapper
                        moveTask={this.moveTask}
                        moveColumns={this.moveColumns}
                        index={index}
                        draggableId={`column${column.id}`}
                        column={column}
                        key={`column${column.id}`}
                        columnId={column.id}
                        api={api}
                        tags={tags}
                        boardId={classId}
                        addDatabaseSchema={addDatabaseSchema}
                        updateDatabaseSchema={updateDatabaseSchema}
                        deleteDatabaseSchema={deleteDatabaseSchema}
                        onTaskClick={this.toggleTaskOverlay}
                      />
                    );
                  }
                })
              }
              <NewColumn classId={classId} />
            </ClassWrapper>
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
      </DndProvider>
    );
  }
}

Classes.propTypes = {
  tasks: PropTypes.objectOf(PropTypes.any).isRequired,
  tags: PropTypes.objectOf(PropTypes.any).isRequired,
  columns: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  classMembers: PropTypes.objectOf(PropTypes.any).isRequired,
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
    classMembers: database.BoardMember,
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
