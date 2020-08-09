import React from 'react';
import PropTypes from 'prop-types';
import { matchUrl } from '../../../../common/utility-functions';

const CommentDesc = ({ comment }) => {
  let urlfiedComment = '';

  const getTaggedUsers = () => {
    const re = /(\s@\w+\s)|(^@\w+\s)|(^@\w+$)|(\s@\w+$)/;
    if (urlfiedComment.match(re)) {
      urlfiedComment.match(re).map((obj) => {
        urlfiedComment = urlfiedComment.replace(obj, `<span style="font-weight: bold; color: rgba(19, 124, 189, 1);">${obj}</span>`);
      });
    }
  };

  const getDescription = () => {
    urlfiedComment = matchUrl(comment);
    getTaggedUsers();
    return <div dangerouslySetInnerHTML={{ __html: urlfiedComment }} />;
  };

  return getDescription();
};

CommentDesc.propTypes = {
  comment: PropTypes.string.isRequired,
};

export default CommentDesc;
