import React from 'react';
import { Link } from 'react-router-dom';
import getName from '../../../../../common/utility-functions/getName';
import { ENDPOINT } from '../../../../../config';


export default ({ data }) => {
  const coverLink = `${ENDPOINT}/assets/user/${10000000 + parseInt(data.id, 10)}/blog/`;
  return (
    <>
      <h3 className="p-title">Blogs by {data.firstName}</h3>
      {
        data.blogs.map(obj => {
          return (
            <div className="popular-blog" key={obj.id}>
              <figure className="blog-thumbnail">
                <img
                  className="landscape"
                  src={obj.coverImage ? `${coverLink}${obj.coverImage}` : '/assets/graphics/blog-img.jpg'}
                />
              </figure>
              <div className="blog-description">
                <a href="#">{getName(data)}</a>
                <Link className="blog-title" target="_blank" to={`/blog/${data.slug}/${obj.slug}`}>
                  {obj.title}
                </Link>
                <div className="blog-author">
                  <div><small className="pc-date">{new Date(parseInt(obj.timeStamp, 10)).toDateString()}</small>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
};
