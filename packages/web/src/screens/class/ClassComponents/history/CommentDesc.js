import React from 'react';
import PropTypes from 'prop-types';

const CommentDesc = ({ comment }) => {
  const re = /(\s@\w+\s)|(^@\w+\s)|(^@\w+$)|(\s@\w+$)/;
  const matches = comment.split(re);
  return (
    <div>
      {
        matches.map((obj, index) => {
          if (obj && obj.match(re)) {
            // eslint-disable-next-line react/no-array-index-key
            return (<span key={index} style={{ fontWeight: 'bold', color: 'rgba(19, 124, 189, 1)' }}>{obj}</span>);
          }
          return obj;
        })
      }
    </div>
  );
};

CommentDesc.propTypes = {
  comment: PropTypes.string.isRequired,
};

export default CommentDesc;
