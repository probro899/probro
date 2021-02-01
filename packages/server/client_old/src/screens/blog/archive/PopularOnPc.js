/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { MdMyLocation } from 'react-icons/md';
import { ENDPOINT } from '../../../config';
import { RoundPicture } from '../../../components';

// const blogImg = require('../../../assets/blog-img.jpg');
// const file = require('../../../assets/icons/64w/uploadicon64.png');

const PopularUser = ({ obj }) => {
  const imgUrl = obj.userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(obj.id, 10)}/profile/${obj.userDetail.image}` : '/assets/icons/64w/uploadicon64.png';
  return (
    <div className="popular-user">
      <div className="user-image">
        <RoundPicture imgUrl={imgUrl} />
      </div>
      <div className="user-detail">
        <div className="name">
          <Link to={`/user/${obj.slug}/`}>
            {
              ` ${obj.firstName} ${obj.middleName ? `${obj.middleName} ` : ''}${obj.lastName}`
            }
          </Link>
        </div>
        <div style={{ opacity: 0.8, marginTop: 3 }}>
          <MdMyLocation />
          {' '}
          <span style={{ textTransform: 'capitalize', fontSize: 14, verticalAlign: 'text-bottom' }}>
            {' '}
            {obj.userDetail.country || '---'}
          </span>
        </div>
      </div>
    </div>
  );
};

const PopularBlog = ({ obj }) => {
  const { user } = obj;
  const coverImage = obj.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(user.id, 10)}/blog/${obj.coverImage}` : '/assets/graphics/blog-img.jpg';
  return (
    <div className="popular-blog">
      <div className="ar-i-img" style={{ background: `url(${coverImage})` }} />
      <div className="ar-i-detail">
        <Link to={`/blog/${user.slug}/${obj.slug}`} className="blog-title">
          {obj.title}
        </Link>
        <div className="blog-author">
          Author:
          {' '}
          <Link to={`/user/${user.slug}/`}>
            {
              ` ${user.firstName} ${user.middleName ? `${user.middleName} ` : ''}${user.lastName}`
            }
          </Link>
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

export default ({ data }) => {
  const blogs = data.blogs.map((obj, index) => <PopularBlog obj={obj} key={index} />);
  const users = data.users.map((obj, index) => <PopularUser obj={obj} key={index} />);
  return (
    <div className="popular-on-pc">
      {blogs}
      <div className="users-head">Popular Mentors</div>
      {users}
    </div>
  );
};
