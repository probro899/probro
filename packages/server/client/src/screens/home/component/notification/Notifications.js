import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Drawer, Icon } from '@blueprintjs/core';
import NotificationContainer from './NotificationContainer';
import { Badge } from '../../../../components';
import SoundComponent from '../../../../common/communication/components/SoundComponent';
// import notificaitonUrl from '../../../../assets/notification.mp3';

class Notifications extends React.Component {
  state = { drawerOpen: false };

  onDrawerToggle = async () => {
    const { drawerOpen } = this.state;
    const { apis, account, notiNo, lastNotifId, addDatabaseSchema } = this.props;
    this.setState({
      drawerOpen: !drawerOpen,
    });
    if (notiNo > 0) {
      try {
        const readStatusId = await apis.addNotificationReadStatus({ notifId: lastNotifId, userId: account.user.id, status: 1, timeStamp: Date.now() });
        addDatabaseSchema('NotificationReadStatus', { id: readStatusId, notifId: lastNotifId, userId: account.user.id, status: 1, timeStamp: Date.now() });
      } catch (e) {
        console.error('error in mark noti read', e);
      }
    }
  }

  render() {
    const { drawerOpen } = this.state;
    const { apis, account, notiNo, notiSound } = this.props;
    return (
      <Link to="#" onClick={this.onDrawerToggle}>
        <div className="navbar-item">
          <Icon icon="notifications" iconSize={Icon.SIZE_LARGE} />
          {notiNo > 0 && (
          <div>
            {notiSound && <SoundComponent url="/assets/media/notification.mp3" noLoop />}
            <Badge number={notiNo} size={20} />
          </div>
          )
            }
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
  notiNo: PropTypes.number.isRequired,
  notiSound: PropTypes.bool.isRequired,
};

export default Notifications;
