import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RoundPicture } from '../../components';
import { ENDPOINT } from '../../config';

const PopularOrg = ({ org }) => {
  const { uId } = org;
  const { address, image, name, slug } = org;
  const imgUrl = image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(uId, 10)}/organization/${image}` : '/assets//graphics/user.svg';

  return (
    <div className="popular-user">
      <div className="user-detail-wrapper">
        <div className="user-image">
          <RoundPicture imgUrl={`${imgUrl}`} />
        </div>
        <div className="org-detail">
          <div className="name">
            <Link to={`/organization/${slug}/`}>{name}</Link>
          </div>
          <div className="user-location">
            <span>
              {' '}
              {address}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

PopularOrg.propTypes = {
  org: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PopularOrg;
