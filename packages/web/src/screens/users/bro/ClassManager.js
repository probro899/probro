import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Column, NewColumn, TaskOverlay } from '../../../common/ClassComponents';
import { Navbar } from '../../home/component';
import client from '../../../socket';
import sorting from '../utility-functions';


class Classes extends Component {
  state = {
    // true if the id in the url doesn't match
    redirectionError: false,
    api: {},
    classId: null,
    columns: [],
    tasks: [],
  };

  componentWillMount() {
    const { match, account, tasks, columns } = this.props;
    client.scope('Mentee').then((result) => {
      // checking if the user's sessionid is real
      if (match.params.id === account.sessionId) {
        this.setState({
          api: result,
          columns,
          tasks,
          // eslint-disable-next-line radix
          classId: parseInt(match.params.classId),
        });
      } else {
        this.setState({
          redirectionError: true,
        });
      }
    });
  }

  componentWillReceiveProps() {
    const { tasks, columns } = this.props;
    this.setState({
      tasks,
      columns,
    });
  }

  onDragEnd = async (result) => {
    const { source, destination, draggableId, type } = result;
    const { api } = this.state;
    if (!destination) {
      return;
    }
    // column moving around
    if (type === 'column') {
      await api.updateBoardColumn([
        { position: destination.index, timestamp: Date.now() }, { id: parseInt(draggableId, 10) }]);
      return;
    }
    // const start = columns[source.droppableId];
    // const finish = columns[destination.droppableId];
    if (source.droppableId === destination.droppableId) {
      await api.updateBoardColumnCard([
        { position: destination.index, timestamp: Date.now() }, { id: parseInt(draggableId, 10) }]);
      return;
    }
    await api.updateBoardColumnCard([
      {
        position: destination.index,
        timestamp: Date.now(),
        boardColumnId: parseInt(destination.droppableId, 10),
      },
      { id: parseInt(draggableId, 10) },
    ]);
    // if (start === finish) {
    //   const newTaskIds = Array.from(start.taskIds);
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);
    //   const newColumn = {
    //     ...start,
    //     taskIds: newTaskIds,
    //   };
    //   updateClassValue('columns', { ...columns, [newColumn.id]: newColumn });
    //   return;
    // }
    // // moving from one column to another
    // const startTaskIds = Array.from(start.taskIds);
    // const finishTaskIds = Array.from(finish.taskIds);
    // startTaskIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   taskIds: startTaskIds,
    // };
    // finishTaskIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   taskIds: finishTaskIds,
    // };
    // updateClassValue('columns', { ...columns, [newStart.id]: newStart, [newFinish.id]: newFinish });
  }

  render() {
    const { classId, columns } = this.state;
    const { redirectionError } = this.state;
    console.log(this.state);
    return (
      <div>
        {redirectionError && <Redirect to="/" />}
        <Navbar />
        <div
          className="classWrapper"
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
                            key={column.id}
                            column={column}
                            columnId={column.id}
                            index={index}
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
        <TaskOverlay />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { database, account } = state;
  const columns = Object.values(database.BoardColumn.byId)
    .sort(sorting);
  const tasks = Object.values(database.BoardColumnCard.byId).sort(sorting);
  return { account, columns, tasks };
};
export default connect(mapStateToProps)(Classes);
