import React from 'react';

const Description = ({ lecture }) => {
  return (
    <div className="description-wrapper">
      <h2 className="description-title">Description</h2>
      <div dangerouslySetInnerHTML={{ __html: lecture.description }} />
    </div>
  );
};

export default Description;
