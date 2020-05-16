import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Itemtype from './types';
import Column from '../Column';

export default (props) => {
  const ref = useRef(null);
  const { api, tags, startScroll, boardId, xCoor, dragStartEnd, setDraggingContent, addDatabaseSchema, updateDatabaseSchema, deleteDatabaseSchema, onTaskClick, column, moveTask, index, draggableId, moveColumns } = props;
  const [, drop] = useDrop({
    accept: [Itemtype.COLUMN, Itemtype.TASK],
    hover: (item, monitor) => {
      if (!ref.current) return;
      startScroll(monitor.getClientOffset());
      if (item.type === Itemtype.TASK && monitor.isOver({ shallow: true })) {
        const task = monitor.getItem();
        if (task.dropableId !== column.id && column.tasks.filter(o => !o.deleteStatus).length === 0) {
          moveTask({ index: item.index, dropableId: item.dropableId }, { index: 0, dropableId: column.id }, item.draggableId);
          item.dropableId = column.id;
          item.index = 0;
        }
        return;
      }
      if (item.type === Itemtype.COLUMN) {
        // scroll implementation
        const dragIndex = item.index; // index of element being dragged
        const hoverIndex = index; // index of element being hovered
        if (dragIndex === hoverIndex) return;
        const hoveredRect = ref.current.getBoundingClientRect(); // column being hovered
        const hoverMiddleX = hoveredRect.left + (hoveredRect.right - hoveredRect.left) / 2;
        const mousePosition = monitor.getClientOffset(); // mouse co-ordinated x,y
        if (dragIndex > hoverIndex && hoverMiddleX > (mousePosition.x - xCoor.left)) {
          // mouse left
          moveColumns(dragIndex, hoverIndex, item.draggableId);
          item.index = hoverIndex;
          return;
        }
        if (dragIndex < hoverIndex && hoverMiddleX < (mousePosition.x + xCoor.right)) {
          // drag right
          moveColumns(dragIndex, hoverIndex, item.draggableId);
          item.index = hoverIndex;
        }
      }
    },
  });

  const [{ coor, isDragging }, drag, preview] = useDrag({
    item: { type: Itemtype.COLUMN, id: column.id, draggableId, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    begin: (monitor) => {
      const itm = { type: Itemtype.COLUMN, id: column.id, draggableId, index };
      setDraggingContent('start', itm);
      dragStartEnd('start', itm, monitor.getInitialSourceClientOffset(), monitor.getInitialClientOffset());
    },
    end: (item, monitor) => {
      setDraggingContent('end', item);
      dragStartEnd('end', item);
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false });
  }, []);

  drop(ref);

  return (
    <div className="column-container" id={`id_column_${column.id}`} style={{ opacity: isDragging ? 0.1 : 1 }}>
      <Column
        reference={ref}
        handle={drag}
        column={column}
        columnId={column.id}
        index={index}
        dragStartEnd={dragStartEnd}
        setDraggingContent={setDraggingContent}
        api={api}
        moveTask={moveTask}
        tags={tags}
        boardId={boardId}
        addDatabaseSchema={addDatabaseSchema}
        updateDatabaseSchema={updateDatabaseSchema}
        deleteDatabaseSchema={deleteDatabaseSchema}
        // passing it for the task overlay open
        onTaskClick={onTaskClick}
      />
    </div>
  );
};
