import React from 'react';


const css = {
  left: 'calc(50% - 50px)',
  top: 'calc(50% - 50px)',
  position: 'absolute',
  height: 100,
};

export default ({ style }) => {
  return (
    <img
      style={{ ...css, ...style }}
      src='/assets/graphics/spinner.gif'
    />
  )
}
