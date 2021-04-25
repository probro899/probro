import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { IoMdStar } from "react-icons/io";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import getName from '../../../common/utility-functions/getName';
import { GET_POPULAR } from '../../../queries';
import { Spinner } from '../../../common';
import { ENDPOINT } from '../../../config';
import { VerifiedBadge } from '../../../common/VerifiedBadge';

function Popular() {
  const getPopularFigure = () => {
    const { data, loading } = useQuery(GET_POPULAR);
    if (loading) return <Spinner />;
    return data.getPopular.users.map(obj => {
      const imgUrl = obj.userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(obj.id, 10)}/profile/${obj.userDetail.image}` : '/assets/graphics/user.svg';
      return (
        <div className="card-wrapper">
          <div className="card card1">
            <div className="card-image">
              <LazyLoadImage src={imgUrl} />
            </div>
            <div className="card-desc">
              <div className="title">
                <Link to={`/user/${obj.slug}`}>
                  {getName(obj)}
                </Link>
                {obj.type === 'verified' && <VerifiedBadge />}
              </div>
              <div className="courses">{obj.userDetail.headLine || ''}</div>
              <div className="sub-title">{obj.userDetail.address ? `${obj.userDetail.address}, ` : ''}{obj.userDetail.country || ''}</div>
              <div className="ratings">
                <IoMdStar color="#222" size='18' />
                <IoMdStar color="#222" size='18' />
                <IoMdStar color="#222" size='18' />
                <IoMdStar color="#222" size='18' />
                <IoMdStar color="#222" size='18' />
              </div>
            </div>
          </div>
        </div>
      )
    });
  }

  return (
    <div className="popularContainer pc-container">
      <div className="popularHeader">
        <p className="page-sub-heading">Our Mentors</p>
        <h2 className="page-heading">Featured Mentors</h2>
      </div>
      <div className="popularCover">
        {getPopularFigure()}
      </div>
    </div >
  );
}

Popular.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Popular;
