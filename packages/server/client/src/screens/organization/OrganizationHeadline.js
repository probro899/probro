import React from 'react';

export default ({ headLine }) => {
  return (
    <div className="pc-headline">
      <h3 className="pc-headline-title">Headline</h3>
      <p className="pc-headline-detail">
        {headLine}
      </p>
    </div>
  );
};
