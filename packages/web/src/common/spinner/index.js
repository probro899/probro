import React from 'react';
import { ScaleLoader } from 'react-spinners';

export default () => {
  return (
    <ScaleLoader
      css={{ display: 'flex', 'justify-content': 'center', margin: '0 auto', 'border-color': '#36D7B7' }}
      sizeUnit="10px"
      size={1}
      color="#36D7B7"
      loading
    />
  );
};
