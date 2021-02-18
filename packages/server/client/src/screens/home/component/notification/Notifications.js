/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BiBell } from "react-icons/bi";
import NotificationContainer from './NotificationContainer';
import { Badge } from '../../../../components';
import SoundComponent from '../../../../communication/components/SoundComponent';
import Drawer from '../../../../common/drawer';

class Notifications extends React.Component {
  state = { drawerOpen: false };

  onDrawerToggle = async () => {
    const { drawerOpen } = this.state;
    const { apis, account, notiNo, lastNotifId, addDatabaseSchema } = this.props;
    this.setState({ drawerOpen: !drawerOpen });
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
      <>
        <Link to="#" onClick={this.onDrawerToggle}>
          <div className="navbar-item">
          <BiBell className="bell-icon"/>
            {notiNo > 0 && 
            (<div>
                {notiSound && notiNo < 2 && <SoundComponent url="/assets/media/notification.mp3" noLoop />}
                <Badge number={notiNo} size={20} />
              </div>)
            }
          </div>
        </Link>
        <Drawer
          backdropOpacity={0}
          position="right"
          hasBackdrop
          isOpen={drawerOpen}
          onClose={this.onDrawerToggle}
          title="Notifications"
        >
          <NotificationContainer account={account} apis={apis} />
        </Drawer>
      </>
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
