/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { ENDPOINT } from '../../../config';
import { getName } from '../../../common/utility-functions';
import {BiLike} from 'react-icons/bi';
import {BiMessageRounded} from 'react-icons/bi';

const SingleArchive = ({ obj }) => {
  const { user } = obj;
  const description = obj.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').substring(0, 300);
  const coverImage = obj.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(user.id, 10)}/blog/${obj.coverImage}` : '/assets/graphics/blog-img.jpg';
  return (
    <div className="ar-left-i">
      <div className="ar-i-img">
        <img
          alt="test here"
          src={coverImage}
        />
      </div>
      <div className="ar-i-detail">
        
        <p>
          <span className="author"> </span>
          <Link className="author-name" to={`/user/${user.slug}/`}>
            {getName(user)}
          </Link>
          <br />
          <small className="pc-date">
            {new Date(parseInt(obj.timeStamp, 10)).toDateString()}
          </small>
        </p>

        <Link to={`/blog/${user.slug}/${obj.slug}`} className="ar-i-title">
          {obj.title}
        </Link>  

        <p className="pc-blog-desc">
          {`${description} ...`}
        </p>
        <div className="ar-i-counts">
          <p className="label">
            <span className="count">{obj.blogComment.length}</span>
            <BiMessageRounded/>
          </p>
          <p className="label">
            <span className="count">{obj.blogLike.length}</span>
            <BiLike/>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleArchive;
