import React, { useState } from 'react';
import { MdMyLocation } from 'react-icons/md';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ENDPOINT } from '../../../../../config/index';
import { RoundPicture } from '../../../../../components';
import { getName } from '../../../../../common/utility-functions';
import { Button } from '../../../../../common/utility-functions/Button/Button'
import ConnectionElement from './connectElement';

const ResultUser = (props) => {
  const { account, item } = props;
    const [redirect, redirectToLogin] = useState(false);
    const  userDetail  = item.userDetail || {};
    let profilePic = '/assets//graphics/user.svg';
    if (userDetail) {
      profilePic = userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(item.id, 10)}/profile/${userDetail.image}` : '/assets//graphics/user.svg';
    }

  const updateConnection = async () => {
    redirectToLogin(true);
  };

  if (redirect) {
      return <Redirect to="/login" />;
  }
  return (
    <div className="i-result">
      <div className="result-details">
        <div className="img-con">
          <RoundPicture imgUrl={profilePic} />
        </div>
        <div className="desc-con">
          <p className="name">
            <Link to={`/user/${item.slug}/`}>
              {getName(item)}
            </Link>
          </p>
          {userDetail.country &&
            (<div className="location">
              <div><MdMyLocation /></div>
              <div className="country">{userDetail.country}</div>
            </div>
            )
          }
          <div className='user-bio'>
            {userDetail.headLine}
          </div>
        </div>
      </div>
      <div className='result-btn-group'>
        {account.user
          ? <ConnectionElement {...props} details={item} data={item} />
          : <Button
          onClick={updateConnection}
          type="button"
          buttonStyle="btn--primary--outline"
          buttonSize="btn--small"
          title="Connect"
        /> }
      </div>
    </div>
  );
};

ResultUser.propTypes = {
    item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ResultUser;
