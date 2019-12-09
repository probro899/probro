import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { RoundPicture } from '../../../../components';
import { ENDPOINT } from '../../../../config';

const file = require('../../../../assets/icons/64w/uploadicon64.png');

class NotificationContainer extends React.Component {
  state = {};

  getNotification = (notification) => {
    const { account, database } = this.props;
    let url;
    switch (notification.type) {
      case 'user':
        url = `user/${notification.userId}`;
        break;
      case 'board':
        url = `class-work/${account.slug}/${notification.boardId}`;
        break;
      default:
        url = '';
    }
    let userDetail;
    Object.values(database.UserDetail.byId).map((obj) => {
      if (notification.typeId === obj.userId) {
        userDetail = obj;
      }
    });
    const imgUrl = userDetail && userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(userDetail.userId, 10)}/profile/${userDetail.image}` : file;
    console.log('notification', account, database.UserDetail, notification, userDetail);
    return (
      <Link
        to={`/${url}`}
        className="pc-noti-wrapper"
        key={notification.id}
      >
        <div className="pc-noti-img">
          <RoundPicture imgUrl={imgUrl} />
        </div>
        <div className="pc-noti-body">
          <p className="pc-noti-desc">
            {notification.body}
          </p>
          <p className="pc-ago-date">{moment(notification.timeStamp).fromNow()}</p>
        </div>
      </Link>
    );
  }

  render() {
    const { database } = this.props;
    const notifications = Object.values(database.Notification.byId);
    return (
      <div className="notification-list">
        {
          notifications.length === 0 && (
            <div className="pc-no-notis">
              <p>You do not have any notifications at the moment.</p>
            </div>
          )
        }
        {
          notifications.map(obj => this.getNotification(obj))
        }
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
