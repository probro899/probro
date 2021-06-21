import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ColumnWrapper from './ClassComponents/dndComponents/ColumnWrapper';
import { NewColumn, TaskOverlay } from './ClassComponents';
import * as actions from '../../actions';
import posSorting from '../../common/utility-functions';
import checkColumnMove from './helper-functions/checkColumnMove';
import { withinColumn, outsideColumn } from './helper-functions/checkTaskMove';
import ClassWrapper from './ClassComponents/dndComponents/ClassWrapper';
import Itemtype from './ClassComponents/dndComponents/types';


class ClassManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // drag and drop properties
            draggingInitialItem: {},
            xCoor: {},
            scrolling: false,

            columns: [],
            taskOverlayIsOpen: false,
            // the task id contained in the overlay
            taskIdInOverlay: null,

            // click and drag class horizontally
            mouseDown: false,
            initialLoc: 0,
        };
    }

    componentDidMount() {
        this.loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.loadData(nextProps);
    }

    loadData = (props) => {
        const { tasks, columns, account, classMembers, taskParticipant, classId } = props;
        if (!account.user) return;
        const wholeColumns = Object.values(columns.byId).filter(o => o.boardId === classId && !o.deleteStatus).map((obj) => {
          const column = { ...obj };
          const columnTasks = Object.values(tasks.byId).filter(ob => !ob.deleteStatus && ob.boardColumnId === obj.id).map(
            (obj) => {
              const participants = Object.values(taskParticipant.byId).filter(o => o.taskId === obj.id && !o.deleteStatus).map(o => {
                const memberObj = classMembers.byId[o.participantId];
                return { ...o, userDetail: memberObj.user.userDetail || {} }
              });
              return { ...obj, participants }
            }
          ).sort(posSorting);
          column.tasks = columnTasks;
          return column;
        }).sort(posSorting);
        this.setState({ columns: wholeColumns });
    }

    // dnd start implementation
    dragStartEnd = async (event, item, nodePoint, clientPoint) => {
        if (event === 'start') {
            this.setState({
                draggingInitialItem: item,
                xCoor: { left: clientPoint.x - nodePoint.x, right: 300 - (clientPoint.x - nodePoint.x) },
            });
            return;
        }
        this.stopScroll();
        const { draggingInitialItem, columns } = this.state;
        const { apis, classId } = this.props;
        if (item.type === Itemtype.COLUMN) {
            if (item.index !== draggingInitialItem.index) {
                try {
                    await apis.updateBoardColumn([
                        { todo: 'moveColumn', position: columns.find(o => o.id === item.id).position, timeStamp: Date.now(), broadCastId: `Board-${classId}` }, { id: item.id }
                    ]);
                } catch (error) {
                    console.log('Column movement Error', error);
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
                await apis.updateBoardColumnCard([{ todo: item.dropableId === draggingInitialItem.dropableId ? 'withinColumn' : 'outsideColumn', fColId: draggingInitialItem.dropableId, tColId: item.dropableId, position: col.tasks.find(o => o.id === item.id).position, timeStamp: Date.now(), boardColumnId: item.dropableId, broadCastId: `Board-${classId}` }, { id: item.id }]);
            } catch {
                console.log('Task movement Error');
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
        const res = outsideColumn(source, destination, columns.filter(o => !o.deleteStatus), destinationDropable, dragable);
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

    onColumnClick = (type, e) => {
      if (type === 'down' && e.target.getAttribute('class') === 'column-container') {
        e.preventDefault();
        this.setState({ mouseDown: true, initialLoc: e.clientX });
      }
      if (type === 'up') {
        e.preventDefault();
        this.setState({ mouseDown: false, initialLoc: 0 })
      }
    }

    onMouseOverColumn = (e) => {
        const { mouseDown, initialLoc } = this.state;
        if (mouseDown) {
            document.getElementById('allColumnWrapper').scrollLeft -= e.clientX - initialLoc;
            this.setState({ initialLoc: e.clientX });
        }
    }

    render() {
        const { columns, taskIdInOverlay, taskOverlayIsOpen, xCoor } = this.state;
        const {
          apis, addDatabaseSchema, account, updateDatabaseSchema, classId,
          deleteDatabaseSchema, classMembers, userSlug, setDraggingContent,
        } = this.props;
        const member = Object.values(classMembers.byId).find(obj => obj.boardId === classId && !obj.deleteStatus && account.user.id === obj.tuserId);
        if (!member) { return <Redirect to={`/${userSlug}/classes`} />; }
        return (
            <div className="class-wrapper">
                <ClassWrapper>
                    {
                        columns.filter(o => !o.deleteStatus && o.boardId === classId).map((column, index) => {
                            return (
                                <ColumnWrapper
                                    onColumnClick={this.onColumnClick}
                                    onMouseOverColumn={this.onMouseOverColumn}
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
                                    api={apis}
                                    boardId={classId}
                                    addDatabaseSchema={addDatabaseSchema}
                                    updateDatabaseSchema={updateDatabaseSchema}
                                    deleteDatabaseSchema={deleteDatabaseSchema}
                                    onTaskClick={this.toggleTaskOverlay}
                                />
                            );
                        })
                    }
                    <NewColumn api={apis} classId={classId} />
                </ClassWrapper>
                <TaskOverlay
                    apis={apis}
                    isOpen={taskOverlayIsOpen}
                    taskId={taskIdInOverlay}
                    onClose={this.toggleTaskOverlay}
                    boardId={classId}
                />
            </div>
        );
    }
}

ClassManager.propTypes = {
    setDraggingContent: PropTypes.func.isRequired,
    account: PropTypes.objectOf(PropTypes.any).isRequired,
    classMembers: PropTypes.objectOf(PropTypes.any).isRequired,
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
        boardUsers: database.User,
        tags: database.BoardColumnCardTag,
        taskParticipant: database.TaskParticipant,
    };
};
export default connect(mapStateToProps, { ...actions })(ClassManager);
