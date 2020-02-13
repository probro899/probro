import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Drawer, Icon } from '@blueprintjs/core';
import NotificationContainer from './NotificationContainer';
import { Badge } from '../../../../components';
import getUnReadNotification from './helper-functions/getUnreadNotification';

class Notifications extends React.Component {
  state = { drawerOpen: false, notiNo: null, lastNotifId: null };

  componentWillMount() {
    const notiDetails = getUnReadNotification(this.props);
    this.setState({ notiNo: notiDetails.unSeenNo, lastNotifId: notiDetails.lastNotifId });
  }

  componentWillReceiveProps(newPorps) {
    const notiDetails = getUnReadNotification(newPorps);
    this.setState({ notiNo: notiDetails.unSeenNo, lastNotifId: notiDetails.lastNotifId });
  }

  onDrawerToggle = async () => {
    const { drawerOpen, lastNotifId, notiNo } = this.state;
    const { apis, account, addDatabaseSchema } = this.props;
    this.setState({
      drawerOpen: !drawerOpen,
    });
    if (notiNo > 0) {
      try {
        const readStatusId = await apis.addNotificationReadStatus({ notifId: lastNotifId, userId: account.user.id, status: 1, timeStamp: Date.now() });
        // console.log('response of markNoti read', readStatusId);
        addDatabaseSchema('NotificationReadStatus', { id: readStatusId, notifId: lastNotifId, userId: account.user.id, status: 1, timeStamp: Date.now() });
      } catch (e) {
        console.error('error in mark noti read', e);
      }
    }
  }

  render() {
    const { drawerOpen, notiNo } = this.state;
    const { apis, account } = this.props;
    // console.log('props in notification', this.props);
    return (
      <Link to="#" onClick={this.onDrawerToggle}>
        <div className="navbar-item">
          <Icon icon="notifications" iconSize={Icon.SIZE_LARGE} />
          {notiNo > 0 && <Badge number={notiNo} size={20} />}
          <Drawer
            isOpen={drawerOpen}
            onClose={this.onDrawerToggle}
            size={Drawer.SIZE_SMALL}
            title="Notifications"
            transitionDuration={200}
            hasBackdrop={false}
          >
            <NotificationContainer account={account} apis={apis} />
          </Drawer>
        </div>
      </Link>
    );
  }
}

Notifications.propTypes = {
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
};

export default Notifications;
