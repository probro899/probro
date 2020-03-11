const withinColumn = (source, destination, columns, dragable) => {
  const dropable = Number(source.droppableId);
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
  return { newColumns, newTask };
};


const outsideColumn = (source, destination, columns, destinationDropable, dragable) => {
  const newColumns = columns;
  const sourceDropable = Number(source.droppableId);
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
  return { newColumns, newTask };
};

export { withinColumn, outsideColumn };
