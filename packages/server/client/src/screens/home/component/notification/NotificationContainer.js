/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon } from '@blueprintjs/core';
import { RoundPicture } from '../../../../components';
import { ENDPOINT } from '../../../../config';
import { timeStampSorting } from '../../../../common/utility-functions';
import { Spinner } from '../../../../common';
import getNotification from './helper-functions/getNotificationtion';
import * as actions from '../../../../actions';
// const file = require('../../../../assets/icons/64w/uploadicon64.png');

class NotificationContainer extends React.Component {
  state = { showLoader: false };

  scrollToEnd = React.createRef();

  scrollContainer = React.createRef();

  componentWillUnmount() {
    ReactDOM.findDOMNode(this.scrollContainer.current).removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = (e) => {
    const scrollTracker = document.getElementById('scrollTracker');
    // console.log(scrollTracker.offsetTop, window.scrollY, window.innerHeight, e.target.scrollTop);
    if (window.innerHeight + e.target.scrollTop > scrollTracker.offsetTop) {
      this.setState({ showLoader: true });
      getNotification(this.props);
    }
  }

  getNotification = (notification) => {
    const { account } = this.props;
    let url;
    let imageIcon;
    switch (notification.type) {
      case 'user':
        url = `user/${notification.user.user.slug}`;
        const { userDetail } = notification.user || {};
        const imgUrl = userDetail && userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(notification.typeId, 10)}/profile/${userDetail.image}` : '/assets/icons/64w/uploadicon64.png';
        imageIcon = (
          <div className="pc-noti-img">
            <RoundPicture imgUrl={imgUrl} />
          </div>
        );
        break;
      case 'board':
        url = `class-work/${account.user.slug}/${notification.boardId}`;
        imageIcon = (
          <div className="pc-noti-icon">
            <Icon icon="application" iconSize={40} />
          </div>
        );
        break;
      case 'blog':
        url = `blog/${account.user.slug}/${notification.blog.slug}`;
        const userDetails = notification.user.userDetail || {};
        const imgUrls = userDetails && userDetails.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(notification.typeId, 10)}/profile/${userDetails.image}` : '/assets/icons/64w/uploadicon64.png';
        imageIcon = (
          <div className="pc-noti-img">
            <RoundPicture imgUrl={imgUrls} />
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
    const { showLoader } = this.state;
    const notifications = account.user ? Object.values(database.Notification.byId).sort(timeStampSorting) : [];
    // console.log('notifications', notifications, this.props);
    return (
      <div ref={this.scrollContainer} className="notification-list" onScroll={this.trackScrolling}>
        {notifications.length === 0 && <div className="pc-no-notis"><p>You do not have any notifications at the moment.</p></div>}
        {notifications.map(obj => this.getNotification(obj))}
        {showLoader && (
          <div style={{ position: 'relative', height: 45 }}>
            <Spinner style={{ top: 0 }} />
          </div>
        )}
        <div id="scrollTracker" ref={this.scrollToEnd} />
      </div>
    );
  }
}

NotificationContainer.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(NotificationContainer);
