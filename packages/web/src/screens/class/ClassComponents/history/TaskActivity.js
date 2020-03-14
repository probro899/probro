/* eslint-disable no-case-declarations */
import React from 'react';
import { ENDPOINT } from '../../../../config';
import RoundPicture from '../../../../components/RoundPicture';

const profileIcon = require('../../../../assets/icons/64w/uploadicon64.png');

export default ({ activity, userList, userDetailList, color, columns }) => {
  const user = userList.byId[activity.userId];
  const userDetail = Object.values(userDetailList.byId).find(obj => obj.userId === user.id);
  const imgUrl = userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(user.id, 10)}/profile/${userDetail.image}` : profileIcon;
  const name = user.middleName ? `${user.firstName} ${user.middleName} ${user.lastName}` : `${user.firstName} ${user.lastName}`;
  switch (activity.message) {
    case 'createCard':
      return (
        <div className="pc-task-activity" style={{ backgroundColor: color }}>
          <div className="img-con">
            <RoundPicture imgUrl={imgUrl} />
          </div>
          <div className="activity-detail">
            <div>
              <span className="activity-user">{name}</span>
              {' '}
              created this card
            </div>
            <div>
              <small style={{ opacity: 0.8 }}>{new Date(activity.timeStamp).toDateString()}</small>
            </div>
          </div>
        </div>
      );
    case 'outsideColumn':
      const toColumn = columns.byId[activity.tColId];
      const fromColumn = columns.byId[activity.fColId];
      return (
        <div className="pc-task-activity" style={{ backgroundColor: color }}>
          <div className="img-con">
            <RoundPicture imgUrl={imgUrl} />
          </div>
          <div className="activity-detail">
            <div>
              <span className="activity-user">{name}</span>
              {' '}
              moved this card from
              {' '}
              <span className="activity-col">{fromColumn.name}</span>
              {' '}
              to
              {' '}
              <span className="activity-col">{toColumn.name}</span>
              {' '}
            </div>
            <div>
              <small style={{ opacity: 0.8 }}>{new Date(activity.timeStamp).toDateString()}</small>
            </div>
          </div>
        </div>
      );
    default:
      return <div />;
  }
};
