import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ColumnWrapper from './ClassComponents/dndComponents/ColumnWrapper';
import { NewColumn, TaskOverlay } from './ClassComponents';
import * as actions from '../../actions';
import posSorting, { timeStampSorting } from '../../common/utility-functions';
import { Spinner } from '../../common';
import checkColumnMove from './helper-functions/checkColumnMove';
import { withinColumn, outsideColumn } from './helper-functions/checkTaskMove';
import ClassWrapper from './ClassComponents/dndComponents/ClassWrapper';
import Itemtype from './ClassComponents/dndComponents/types';

class ClassManager extends Component {
  constructor(props) {
    super(props);
    const { classId, apis } = this.props;
    this.state = {
      api: apis,
      classId,
      // drag and drop properties
      draggingInitialItem: {},
      xCoor: {},
      scrolling: false,

      columns: [],
      tasks: [],
      comments: [],
      attachments: [],
      descriptions: [],
      taskOverlayIsOpen: false,
      // the task id contained in the overlay
      taskIdInOverlay: 0,
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { tasks, columns, account, comments, attachments, descriptions, classId } = nextProps;
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

  // dnd start implementation
  dragStartEnd = async (event, item, nodePoint, clientPoint) => {
    // drag is start
    if (event === 'start') {
      this.setState({
        draggingInitialItem: item,
        xCoor: { left: clientPoint.x - nodePoint.x, right: 300 - (clientPoint.x - nodePoint.x) },
      });
      return;
    }

    this.stopScroll();
    // drag end
    const { draggingInitialItem, api, columns, classId } = this.state;
    if (item.type === Itemtype.COLUMN) {
      if (item.index !== draggingInitialItem.index) {
        try {
          await api.updateBoardColumn([
            { position: columns.find(o => o.id === item.id).position, timeStamp: Date.now(), broadCastId: `Board-${classId}` }, { id: item.id }]);
        } catch {
          console.log('error in movement');
        }
      }
      this.setState({ draggingInitialItem: {}, xCoor: {} });
      return;
    }

    if (item.type === Itemtype.TASK) {
      if (item.dropableId === draggingInitialItem.dropableId && item.index === draggingInitialItem.index) {
        this.setState({ draggingInitialItem: {}, xCoor: {} });
        return;
      }
      const col = columns.find(o => o.id === item.dropableId);
      try {
        await api.updateBoardColumnCard([{ todo: item.dropableId === draggingInitialItem.dropableId ? 'withinColumn' : 'outsideColumn', fColId: draggingInitialItem.dropableId, tColId: item.dropableId, position: col.tasks.find(o => o.id === item.id).position, timeStamp: Date.now(), boardColumnId: item.dropableId, broadCastId: `Board-${classId}` }, { id: item.id }]);
      } catch {
        console.log('task movement server-error');
      }
    }
    this.setState({ draggingInitialItem: {}, xCoor: {} });
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

  toggleTaskOverlay = (id) => {
    const { taskOverlayIsOpen } = this.state;
    this.setState({ taskIdInOverlay: id, taskOverlayIsOpen: !taskOverlayIsOpen });
  }

  scrollRight = () => {
    this.setState({ scrolling: true });
    function scroll() {
      document.getElementById('allColumnWrapper').scrollLeft += 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  scrollLeft = () => {
    this.setState({ scrolling: true });
    function scroll() {
      document.getElementById('allColumnWrapper').scrollLeft -= 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  stopScroll = () => {
    this.setState({ scrolling: false });
    clearInterval(this.scrollInterval);
  }

  startScroll = (coor) => {
    const { scrolling } = this.state;
    if (!scrolling) {
      if (coor.x + 75 > window.innerWidth) {
        this.scrollRight();
      } else if (coor.x < 75) {
        this.scrollLeft();
      }
    } else if (coor.x + 75 < window.innerWidth && coor.x > 75) {
      this.stopScroll();
    }
  }

  render() {
    const {
      classId, columns, tasks, api, taskIdInOverlay, taskOverlayIsOpen,
      comments, attachments, descriptions, xCoor,
    } = this.state;
    const {
      addDatabaseSchema, tags, account, updateDatabaseSchema,
      deleteDatabaseSchema, classMembers, userSlug, setDraggingContent,
    } = this.props;
    if (!account.sessionId) return <Redirect to="/" />;
    if (!account.user) return <Spinner />;
    if (account.user.slug !== userSlug) return <Redirect to="/" />;
    const member = Object.values(classMembers.byId).find(obj => obj.boardId === classId && !obj.deleteStatus && account.user.id === obj.tuserId);
    if (!member) { return <Redirect to={`/${userSlug}/classes`} />; }
    return (
      <div
        className="class-wrapper"
      >
        <ClassWrapper>
          {
            columns.filter(o => !o.deleteStatus && o.boardId === classId).map((column, index) => {
              return (
                <ColumnWrapper
                  startScroll={this.startScroll}
                  xCoor={xCoor}
                  dragStartEnd={this.dragStartEnd}
                  setDraggingContent={setDraggingContent}
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
            })
          }
          <NewColumn api={api} classId={classId} />
        </ClassWrapper>
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

ClassManager.propTypes = {
  setDraggingContent: PropTypes.func.isRequired,
  tasks: PropTypes.objectOf(PropTypes.any).isRequired,
  tags: PropTypes.objectOf(PropTypes.any).isRequired,
  columns: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  classMembers: PropTypes.objectOf(PropTypes.any).isRequired,
  comments: PropTypes.objectOf(PropTypes.any).isRequired,
  descriptions: PropTypes.objectOf(PropTypes.any).isRequired,
  attachments: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  userSlug: PropTypes.string.isRequired,
  classId: PropTypes.number.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
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
export default connect(mapStateToProps, { ...actions })(ClassManager);
