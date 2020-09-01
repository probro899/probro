import React from 'react';
import { Link } from 'react-router-dom';
import { ENDPOINT } from '../../../config';

// const blogImg = require('../../../assets/blog-img.jpg');

const SingleArchive = ({ obj }) => {
  console.log('obj', obj);
  const description = obj.blog.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').substring(0, 300);
  const user = obj.userDetails.find(u => u.user.id === obj.blog.userId);
  const coverImage = obj.blog.coverImage ? `${ENDPOINT}/user/${10000000 + parseInt(obj.blog.userId, 10)}/blog/${obj.blog.coverImage}` : '/assets/graphics/blog-img.jpg';
  return (
    <div className="ar-left-i">
      <div className="ar-i-img">
        <img
          alt="test here"
          src={coverImage}
        />
      </div>
      <div className="ar-i-detail">
        <Link to={`/blog/${user.user.slug}/${obj.blog.slug}`} className="ar-i-title">
          {obj.blog.title}
        </Link>
        <p>
          <span>Author: </span>
          <Link to={`/user/${user.user.slug}/`}>
            {
              ` ${user.user.firstName} ${user.user.middleName ? `${user.user.middleName} ` : ''}${user.user.lastName}`
            }
          </Link>
          <br />
          <small className="pc-date">
            {new Date(obj.blog.timeStamp).toDateString()}
          </small>
        </p>
        <p className="pc-blog-desc">
          {`${description} ...`}
        </p>
        <div className="ar-i-counts">
          <p className="label">
            <span className="count">{obj.blogComment.length}</span>
            Comments
          </p>
          <p className="label">
            <span className="count">{obj.blogLike.length}</span>
            Likes
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleArchive;
