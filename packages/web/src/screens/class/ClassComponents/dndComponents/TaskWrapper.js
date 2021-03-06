import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Itemtype from './types';

export default (props) => {
  const ref = useRef(null);
  const { children, setDraggingContent, dragStartEnd, task, index, draggableId, moveTask } = props;
  const [, drop] = useDrop({
    accept: Itemtype.TASK,
    hover: (item, monitor) => {
      if (!ref.current && monitor.isOver({ shallow: true })) return;
      const dragIndex = item.index; // index of element being dragged
      const hoverIndex = index; // index of element being hovered
      if (dragIndex === hoverIndex && task.boardColumnId === item.dropableId) return;
      const hoveredRect = ref.current.getBoundingClientRect(); // column being hovered
      const hoverMiddleY = hoveredRect.top + (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset(); // mouse co-ordinated x,y

      // if its between intercolumn
      if (task.boardColumnId !== item.dropableId) {
        if (hoverMiddleY > mousePosition.y) {
          moveTask({ index: dragIndex, dropableId: item.dropableId }, { index: hoverIndex, dropableId: task.boardColumnId }, item.draggableId);
          item.dropableId = task.boardColumnId;
          item.index = hoverIndex;
          return;
        }

        if (hoverMiddleY < mousePosition.y) {
          moveTask({ index: dragIndex, dropableId: item.dropableId }, { index: hoverIndex + 1, dropableId: task.boardColumnId }, item.draggableId);
          item.dropableId = task.boardColumnId;
          item.index = hoverIndex + 1;
          return;
        }
        if (dragIndex === hoverIndex) {
          if (hoverMiddleY > mousePosition.y) {
            moveTask({ index: dragIndex, dropableId: item.dropableId }, { index: hoverIndex, dropableId: task.boardColumnId }, item.draggableId);
            item.dropableId = task.boardColumnId;
            item.index = hoverIndex;
          } else {
            moveTask({ index: dragIndex, dropableId: item.dropableId }, { index: hoverIndex + 1, dropableId: task.boardColumnId }, item.draggableId);
            item.dropableId = task.boardColumnId;
            item.index = hoverIndex + 1;
          }
        }
        return;
      }
      // intercolumn finished

      // same column start
      if (dragIndex > hoverIndex && hoverMiddleY > mousePosition.y) {
        moveTask({ index: dragIndex, dropableId: item.dropableId }, { index: hoverIndex, dropableId: task.boardColumnId }, item.draggableId);
        item.dropableId = task.boardColumnId;
        item.index = hoverIndex;
        return;
      }
      if (dragIndex < hoverIndex && hoverMiddleY < mousePosition.y) {
        moveTask({ index: dragIndex, dropableId: item.dropableId }, { index: hoverIndex, dropableId: task.boardColumnId }, item.draggableId);
        item.dropableId = task.boardColumnId;
        item.index = hoverIndex;
      }
      // same column finished
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: Itemtype.TASK, id: task.id, draggableId, dropableId: task.boardColumnId, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    isDragging: (monitor) => {
      return task.id === monitor.getItem().id;
    },
    begin: (monitor) => {
      const itm = { type: Itemtype.TASK, id: task.id, draggableId, dropableId: task.boardColumnId, index };
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

  drag(drop(ref));

  return (
    <div style={{ opacity: isDragging ? 0.2 : 1 }} ref={ref}>
      {React.cloneElement(children)}
    </div>
  );
};
