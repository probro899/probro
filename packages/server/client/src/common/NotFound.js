import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ message }) => (
  <div className="no-blog">
    <figure className="no-blog__figure">
      <img src="/assets/graphics/paper.svg" alt="no data found" />
    </figure>
    <div className="no-blog__info">
      <p>{message}</p>
    </div>
  </div>
);

NotFound.defaultProps = {
  message: "Can't find what you are looking for?",
};

NotFound.propTypes = {
  message: PropTypes.string,
};

export default NotFound;
