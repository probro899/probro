import React from 'react';

const PopularItemWrapper = ({ content, title }) => {
  return (
    <div className="popular-wrapper">
      <p className="ar-right-top">{title}</p>
      <div className="popular-container">
        {content}
      </div>
    </div>
  );
};

export default PopularItemWrapper;
