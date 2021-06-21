import React from 'react';

export const Collapse = ({ children, isOpen, height=200 }) => {
  return (
    <div
      className="pc-collapse"
      style={
        {
          animation: isOpen ? `slidedown${height} 0.5s` : `slideup${height} 0.5s`,
          height: isOpen ? height : 0,
        }
      }
    >
      <div className='pc-collapse-body'>{children}</div>
    </div>
  )
}


