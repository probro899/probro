import React from 'react';
import { Link } from 'react-router-dom';
import { MdMyLocation } from 'react-icons/md';
import { ENDPOINT } from '../../../config';
import { RoundPicture } from '../../../components';

const blogImg = require('../../../assets/blog-img.jpeg');
const file = require('../../../assets/icons/64w/uploadicon64.png');

const PopularUser = ({ obj }) => {
  const imgUrl = obj.userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(obj.user.id, 10)}/profile/${obj.userDetail.image}` : file;
  return (
    <div className="popular-user">
      <div className="user-image">
        <RoundPicture imgUrl={imgUrl} />
      </div>
      <div className="user-detail">
        <div className="name">
          <Link to={`/user/${obj.user.slug}/`}>
            {
              ` ${obj.user.firstName} ${obj.user.middleName ? `${obj.user.middleName} ` : ''}${obj.user.lastName}`
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
  const coverImage = obj.blog.coverImage ? `${ENDPOINT}/user/${10000000 + parseInt(obj.blog.userId, 10)}/blog/${obj.blog.coverImage}` : blogImg;
  const user = obj.userDetails.find(u => u.user.id === obj.blog.userId);
  return (
    <div className="popular-blog">
      <div className="ar-i-img" style={{ background: `url(${coverImage})` }} />
      <div className="ar-i-detail">
        <Link to={`/blog/${user.user.slug}/${obj.blog.slug}`} className="blog-title">
          {obj.blog.title}
        </Link>
        <div className="blog-author">
          Author:
          {' '}
          <Link to={`/user/${user.user.slug}/`}>
            {
              ` ${user.user.firstName} ${user.user.middleName ? `${user.user.middleName} ` : ''}${user.user.lastName}`
            }
          </Link>
          <div>
            <small className="pc-date">
              {new Date(obj.blog.timeStamp).toDateString()}
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
