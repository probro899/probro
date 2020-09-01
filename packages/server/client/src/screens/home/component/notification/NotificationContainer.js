/* eslint-disable no-case-declarations */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon } from '@blueprintjs/core';
import { RoundPicture } from '../../../../components';
import { ENDPOINT } from '../../../../config';
import { timeStampSorting } from '../../../../common/utility-functions';

// const file = require('../../../../assets/icons/64w/uploadicon64.png');

class NotificationContainer extends React.Component {
  state = {};

  getNotification = (notification) => {
    const { database, account } = this.props;
    let url;
    let imageIcon;
    switch (notification.type) {
      case 'user':
        url = `user/${database.User.byId[notification.typeId].slug}`;
        const userDetail = Object.values(database.UserDetail.byId).find(u => notification.typeId === u.userId);
        const imgUrl = userDetail && userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(notification.typeId, 10)}/profile/${userDetail.image}` : '/assets/icons/64w/uploadicon64.png';
        imageIcon = (
          <div className="pc-noti-img">
            <RoundPicture imgUrl={imgUrl} />
          </div>
        );
        break;
      case 'board':
        url = `class-work/${database.User.byId[account.user.id].slug}/${notification.boardId}`;
        imageIcon = (
          <div className="pc-noti-icon">
            <Icon icon="application" iconSize={40} />
          </div>
        );
        break;
      default:
        url = '';
    }
    return (
      <Link to={`/${url}`} className="pc-noti-wrapper" key={notification.id}>
        {imageIcon}
        <div className="pc-noti-body">
          <p className="pc-noti-desc">{notification.body}</p>
          <p className="pc-ago-date">{moment(notification.timeStamp).fromNow()}</p>
        </div>
      </Link>
    );
  }

  render() {
    const { database, account } = this.props;
    const notifications = account.user ? Object.values(database.Notification.byId).sort(timeStampSorting) : [];
    return (
      <div className="notification-list">
        {notifications.length === 0 && <div className="pc-no-notis"><p>You do not have any notifications at the moment.</p></div>}
        {notifications.map(obj => this.getNotification(obj))}
      </div>
    );
  }
}

NotificationContainer.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(NotificationContainer);
