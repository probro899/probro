import React from 'react';
import { Link } from 'react-router-dom';
import { BiCurrentLocation } from "react-icons/bi";
import { BsPersonCheck, BsPersonPlus } from "react-icons/bs";
import { ENDPOINT } from '../../../config';
import { RoundPicture } from '../../../components';
import { getName } from '../../../common/utility-functions';
import { Button } from '../../../common/utility-functions/Button/Button'

const PopularUser = ({ obj, connected }) => {
  const imgUrl = obj.userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(obj.id, 10)}/profile/${obj.userDetail.image}` : '/assets//graphics/user.svg';
  return (
    <div className="popular-user">
      <div className="user-image">
        <RoundPicture imgUrl={imgUrl} />
      </div>
      <div className="user-detail">
        <div className="name">
          <Link to={`/user/${obj.slug}/`}>
            {getName(obj)}
          </Link>
        </div>
        <div style={{ opacity: 0.8, marginBottom: 3, display: 'flex', alignItems: 'center' }}>
          <BiCurrentLocation />
          {' '}
          <span style={{ fontSize: 12, marginLeft: 2 }}>
            {' '}
            {obj.userDetail.country}
          </span>
        </div>
        <div className='user-bio'>
          {obj.userDetail.headLine}
        </div>
      </div>
      <div className="follow-mentor-btn">
        <Link to={`/user/${obj.slug}/`} className="followMentorBtn">
          <Button
            type="button"
            buttonStyle={connected ? "btn--success--outline" : "btn--primary--outline"}
            buttonSize="btn--small"
            icon={connected ? <BsPersonCheck /> : <BsPersonPlus />}
          />
        </Link>
      </div>

    </div>
  );
};

export default PopularUser;
