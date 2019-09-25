import React from 'react';
import { ScaleLoader } from 'react-spinners';

const css = {
  left: '50%',
  top: '50%',
  position: 'absolute',
  // 'border-color': '#36D7B7',
};

export default () => {
  return (
    <ScaleLoader
      css={css}
      sizeUnit="10px"
      size={1}
      color="#36D7B7"
      loading
    />
  );
};
