import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BsPersonCheck, BsPersonPlus } from 'react-icons/bs';
import { RoundPicture } from '../../components';
import { Button } from '../utility-functions/Button/Button';
import { getName } from '../utility-functions';
import { ENDPOINT } from '../../config';

const PopularUser = ({ obj, account, UserConnection }) => {
  const isConnected = (userId) => {
    if (!account.user) return false;
    const con = Object.values(UserConnection.byId).find((o) => o.user.user.id === userId);
    if (con && con.status === 'connected') return true;
    return false;
  };
  const { id, slug } = obj;
  const connected = isConnected(obj.id);
  const { country, image, headLine } = obj.userDetail;
  const imgUrl = image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(id, 10)}/profile/${image}` : '/assets//graphics/user.svg';
  return (
    <div className="popular-user">
      <div className="user-detail-wrapper">
        <div className="user-image">
          <RoundPicture imgUrl={`${imgUrl}`} />
        </div>
        <div className="user-detail">
          <div className="name">
            <Link to={`/user/${obj.slug}/`}>{getName(obj)}</Link>
          </div>
          <div className="user-bio">
            {headLine}
          </div>
          <div className="user-location">
            <span>
              {' '}
              {country}
            </span>
          </div>
        </div>
      </div>
      <div className="follow-mentor-btn">
        <Link to={`/user/${slug}/`} className="followMentorBtn">
          <Button
            type="button"
            buttonStyle={connected ? 'btn--success--outline' : 'btn--primary--outline'}
            buttonSize="btn--small"
            icon={connected ? <BsPersonCheck /> : <BsPersonPlus />}
          />
        </Link>
      </div>
    </div>
  );
};

PopularUser.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  obj: PropTypes.objectOf(PropTypes.any).isRequired,
  UserConnection: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapsStatetoProps = ({ database, account }) => ({ account, UserConnection: database.UserConnection });
export default connect(mapsStatetoProps)(PopularUser);
