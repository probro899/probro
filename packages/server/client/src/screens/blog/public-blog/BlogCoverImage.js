import React from 'react';
import PropTypes from 'prop-types';
import { ENDPOINT } from '../../../config';


const BlogCoverImage = ({ blog }) => {
  const coverImage = blog.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(blog.user.id, 10)}/blog/${blog.coverImage}` : '/assets/graphics/blog-img.jpg';
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
