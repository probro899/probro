import React from 'react';

const Media = (props) => {
  // const {} = props;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <video controls id="video1" playsInline autoPlay style={{ height: '100%', width: '100%', background: 'black'}} />
    </div>
  );
};
export default Media;
