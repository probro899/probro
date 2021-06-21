import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ENDPOINT } from '../../config';
import { getName } from '../utility-functions';

const PopularBlog = ({ obj }) => {
  const {title, coverImage, timeStamp, slug, user } = obj;
  const coverImageUrl = obj.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(user.id, 10)}/blog/${coverImage}` : '/assets/graphics/blog-img.jpg';
  return (
    <div className="popular-blog">
      <div className="ar-i-img" style={{ background: `url(${coverImageUrl})` }} />
      <div className="ar-i-detail">
        <Link to={`/user/${obj.user.slug}/`}>{getName(obj.user)}</Link>
        <Link to={`/blog/${obj.user.slug}/${slug}`} className="blog-title">{title}</Link>
        <div className="blog-author">
          {' '}
          <div>
            <small className="pc-date">{new Date(parseInt(timeStamp, 10)).toDateString()}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

PopularBlog.propTypes = {
  obj: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PopularBlog;
