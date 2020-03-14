export default (columns, draggableId, destination, source) => {
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
  return { newColumns, column };
};
