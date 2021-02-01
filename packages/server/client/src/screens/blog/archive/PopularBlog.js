import React from 'react';
import { Link } from 'react-router-dom';
import { ENDPOINT } from '../../../config';
import { getName } from '../../../common/utility-functions';

// const blogImg = require('../../../assets/blog-img.jpg');

const PopularBlog = ({ obj }) => {
    const { user } = obj;
    const coverImage = obj.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(user.id, 10)}/blog/${obj.coverImage}` : '/assets/graphics/blog-img.jpg';
    return (
      <div className="popular-blog">
        <div className="ar-i-img" style={{ background: `url(${coverImage})` }} />
        <div className="ar-i-detail">
          <Link to={`/user/${user.slug}/`}>
            {getName(user)}
          </Link>
  
          <Link to={`/blog/${user.slug}/${obj.slug}`} className="blog-title">
            {obj.title}
          </Link>
          <div className="blog-author">
            {' '}
  
            <div>
              <small className="pc-date">
                {new Date(parseInt(obj.timeStamp, 10)).toDateString()}
              </small>
            </div>
          </div>
        </div>
      </div>
    );
};

export default PopularBlog;
