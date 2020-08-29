import React from 'react';
import { useDragLayer } from 'react-dnd';
import PropTypes from 'prop-types';
import Itemtypes from './types';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(item, currentOffset) {
  if (!currentOffset) return { display: 'none' };
  const { x, y } = currentOffset;
  if (item.type === Itemtypes.COLUMN) {
    const transform = `translate(${x}px, ${y - 8}px)`;
    return { transform, WebkitTransform: transform };
  }
  const transform = `translate(${x}px, ${y}px)`;
  return { transform, WebkitTransform: transform };
}

const CustomDragLayer = (props) => {
  const { draggingContent } = props;
  const {
    item,
    isDragging,
    currentOffset,
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  function renderItem() {
    return <div style={{ boxShadow: item.type === Itemtypes.TASK ? '0px 0px 5px 0px rgba(0,0,0,0.75)' : null }} className={item.type === Itemtypes.TASK ? 'task-container' : 'column-container'} dangerouslySetInnerHTML={{ __html: draggingContent.innerHTML }} />;
  }

  if (!isDragging || !draggingContent) return null;
  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(item, currentOffset)}
      >
        {renderItem()}
      </div>
    </div>
  );
};

CustomDragLayer.defaultProps = {
  draggingContent: null,
};

CustomDragLayer.propTypes = {
  draggingContent: PropTypes.objectOf(PropTypes.any),
};

export default CustomDragLayer;
