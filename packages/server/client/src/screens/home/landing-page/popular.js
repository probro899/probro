import React from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import getName from '../../../common/utility-functions/getName';
import { GET_POPULAR } from '../../../queries';
import { Spinner } from '../../../common';
import { ENDPOINT } from '../../../config';
import { VerifiedBadge } from '../../../common/VerifiedBadge';
import SectionHeader from './SectionHeader';

function Popular() {
  const getPopularFigure = () => {
    const { data, loading } = useQuery(GET_POPULAR);
    if (loading) return <Spinner />;
    return data.getPopular.users.map((obj) => {
      const userDetail = obj.userDetail || {};
      const imgUrl = userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(obj.id, 10)}/profile/${userDetail.image}` : '/assets/graphics/user.svg';
      const bio = obj.userDetail.bio ? obj.userDetail.bio.substr(0, 100) + '...' : '';
      return (
        <div className="card-wrapper" key={`user-${obj.id}`}>
          <div className="card mentor-card">
            <div className="mentor-profile">
              <div className="mentor-image">
                <LazyLoadImage src={imgUrl} />
              </div>
              <div className="mentor-desc">
                <div className="title">
                  {getName(obj)}
                  {obj.type === 'verified' && <VerifiedBadge />}
                </div>
                <div className="headline">{obj.userDetail.headLine || ''}</div>
                <div className="address">{obj.userDetail.address ? `${obj.userDetail.address}, ` : ''}{obj.userDetail.country || ''}</div>
                <p className="details">
                  <q>{bio}</q>
                </p>
              </div>
            </div>
            <div className="mentor-content">
              <div className="left-content">
                <ul>
                  <li>Total Course: <span className="total-course">2</span></li>
                </ul>
              </div>
              <div className="right-content">
                <Link to={`/user/${obj.slug}`}>
                  View Profile <AiFillPlayCircle size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="popularContainer pc-container">
      <SectionHeader
        heading="Featured Mentors"
        subheading="Few of the most requested in proper class"
        buttonTitle="View All"
        showButton
        link="/archive"
      />
      <div className="popularCover">
        {getPopularFigure()}
      </div>
    </div>
  );
}

export default Popular;
