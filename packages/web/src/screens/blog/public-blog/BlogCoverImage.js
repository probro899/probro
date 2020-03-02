import React from 'react';
import PropTypes from 'prop-types';
import { ENDPOINT } from '../../../config';


const BlogCoverImage = ({ blog }) => {
  const coverImage = blog.blog.coverImage ? `${ENDPOINT}/user/${10000000 + parseInt(blog.blog.userId, 10)}/blog/${blog.blog.coverImage}` : null;
  return (
    <div className="pc-blog-cover-image">
      {coverImage && <img alt="blog cover" src={coverImage} />}
    </div>
  );
};

BlogCoverImage.propTypes = {
  blog: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BlogCoverImage;
