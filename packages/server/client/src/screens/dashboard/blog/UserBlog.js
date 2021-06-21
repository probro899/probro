import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PublishedBadge } from '../../../common/PublishedBadge';
import { getName } from '../../../common/utility-functions';
import { MoreButton } from '../../../components';
import { ENDPOINT } from '../../../config';

const UserBlog = ({ onMore, users, obj }) => {
  const coverImage = obj.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(obj.userId, 10)}/blog/${obj.coverImage}` : '/assets/graphics/blog-img.jpg';
  return (
    <div className="blog-container">
      <div className="each-blog-wrapper">
        {obj.saveStatus === 'publish' && <PublishedBadge />}
        <div className="img-container">
          <MoreButton onMore={onMore} id={obj.id} />
          <figure>
            <img
              alt="test"
              src={coverImage}
            />
          </figure>
        </div>
        <div className="detail-container">

          <div className="blog-title">
            <p className="title">
              {obj.saveStatus === 'publish' ? (
                <Link target="_blank" to={`/blog/${users.byId[obj.userId].slug}/${obj.slug}`}>
                  {obj.title}
                </Link>
              ) : <Link to='#'>{obj.title}</Link>}
            </p>
          </div>
          <div className="blog-author">
            <Link to={`/user/${users.byId[obj.userId].slug}`}>
              {getName(users.byId[obj.userId])}
            </Link>
          </div>
          <div style={{ textAlign: 'left', width: '100%' }}>
            <span className="pc-date">{new Date(obj.timeStamp).toDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

UserBlog.propTypes = {
  onMore: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
  obj: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserBlog;
