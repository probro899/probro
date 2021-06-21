import React from 'react';

const css = {
  left: 'calc(50% - 50px)',
  top: 'calc(50% - 50px)',
  position: 'absolute',
  height: 100,
};

export default ({ style, wClass }) => {
  return (
    <div className={`${wClass} pc-spinner`}>
      <img
        style={{ ...css, ...style }}
        src='/assets/graphics/spinner.gif'
      />
    </div>
  )
}
