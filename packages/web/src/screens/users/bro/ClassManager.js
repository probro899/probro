import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import * as actions from '../../../actions';
import { Column, NewColumn, TaskOverlay } from '../../../common/ClassComponents';
import { Navbar } from '../../home/component';


class Classes extends Component {
  state = {};

  onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    const { _class, updateClassValue } = this.props;
    const { columns, columnOrder } = _class;
    if (!destination) {
      return;
    }
    // column moving around
    if (type === 'column') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      updateClassValue('columnOrder', newColumnOrder);
      return;
    }
    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      updateClassValue('columns', { ...columns, [newColumn.id]: newColumn });
      return;
    }
    // moving from one column to another
    const startTaskIds = Array.from(start.taskIds);
    const finishTaskIds = Array.from(finish.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    updateClassValue('columns', { ...columns, [newStart.id]: newStart, [newFinish.id]: newFinish });
  }

  render() {
    const { _class } = this.props;
    const { tasks, columns, columnOrder } = _class;
    return (
      <div>
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
                    columnOrder.map((columnId, index) => {
                      const column = columns[columnId];
                      const allTask = column.taskIds.map(taskId => tasks[taskId]);
                      return (
                        <Column
                          key={column.id}
                          column={column}
                          tasks={allTask}
                          index={index}
                        />
                      );
                    })
                  }
                  {provided.placeholder}
                  <NewColumn />
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

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps, { ...actions })(Classes);
