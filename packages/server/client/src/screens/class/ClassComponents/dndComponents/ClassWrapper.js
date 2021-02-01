import React from 'react';
import { useDrop } from 'react-dnd';
import Itemtype from './types';

export default (props) => {
  const { children } = props;
  const [{ isOver }, drop] = useDrop({
    accept: Itemtype.COLUMN,
    drop: () => {},
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });
  return (
    <div className="columns" id="allColumnWrapper" ref={drop}>
      {children}
    </div>
  );
};
