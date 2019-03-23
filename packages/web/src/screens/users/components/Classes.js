import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Column } from '../../../common/ClassComponents';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Wash clothes' },
    'task-3': { id: 'task-3', content: 'Cook your food' },
    'task-4': { id: 'task-4', content: 'Do proper class in a proper way' },
    'task-5': { id: 'task-5', content: 'Deadline is coming' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'todo',
      taskIds: ['task-1', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Progress',
      taskIds: ['task-2', 'task-3'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-5'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

class Classes extends Component {
  state = initialData;

  onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    const { columns, columnOrder } = this.state;
    if (!destination) {
      return;
    }
    // column moving around
    if (type === 'column') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      this.setState(newState);
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
      const newState = {
        ...this.state,
        columns: {
          ...columns,
          [newColumn.id]: newColumn,
        },
      };
      this.setState(newState);
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
    const newState = {
      ...this.state,
      columns: {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  }

  render() {
    const { tasks, columns, columnOrder } = this.state;
    return (
      <div className="classes">
        <div>
          <span style={{ fontSize: '25px', fontWeight: 500 }}>
            Classes
          </span>
        </div>
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
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default Classes;
