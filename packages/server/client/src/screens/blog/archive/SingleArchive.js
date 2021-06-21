/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { BiMessageRounded, BiLike } from 'react-icons/bi';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';
import { ENDPOINT } from '../../../config';
import { getName } from '../../../common/utility-functions';
import Card from '../../../common/Card';

const SingleArchive = ({ obj, bookmarkBlog }) => {
  const { user } = obj;
  const description = obj.content.replace(/&nbsp;/g, ' ');
  const coverImage = obj.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(user.id, 10)}/blog/${obj.coverImage}` : '/assets/graphics/blog-img.jpg';
  return (
    <Card>
      <div className="ar-left-i">
        <span onClick={() => bookmarkBlog(obj.id, obj.bookmark)} className="bookmark-icon">
          {obj.bookmark ?<BsFillBookmarkFill size={24} /> : <BsBookmark size={24} />}
        </span>
        <div className="ar-i-img"><img alt="blog cover" src={coverImage} /></div>
        <div className="ar-i-detail">
          <Link to={`/blog/${user.slug}/${obj.slug}`} className="ar-i-title">{obj.title}</Link>
          <p>
            <span className="author"> </span>
            <Link className="author-name" to={`/user/${user.slug}/`}>{getName(user)}</Link>
            <br />
            <small className="pc-date">{new Date(parseInt(obj.timeStamp, 10)).toDateString()}</small>
          </p>
          <p className="pc-blog-desc">{description} ...</p>
          <div className="ar-i-counts">
            <p className="label">
              <BiMessageRounded size={20} />
              <span className="count">{obj.noOfComments}</span>
            </p>
            <p className="label">
              <BiLike size={20} />
              <span className="count">{obj.noOfLikes}</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SingleArchive;
