import React from 'react';

// const img = require('../../assets/404error.svg');

export default () => {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img style={{ objectFit: 'contain', width: '100%' }} alt="error" src="/assets/graphics/404error.svg" />
    </div>
  );
};
