import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Drawer, Icon } from '@blueprintjs/core';
import NotificationContainer from './NotificationContainer';


class Notifications extends React.Component {
  state = { drawerOpen: false };

  onDrawerToggle = () => {
    const { drawerOpen } = this.state;
    this.setState({
      drawerOpen: !drawerOpen,
    });
  }

  render() {
    const { drawerOpen } = this.state;
    const { apis } = this.props;
    return (
      <Link to="#" onClick={this.onDrawerToggle}>
        <div className="navbar-item">
          <Icon icon="notifications" iconSize={Icon.SIZE_LARGE} />
          <Drawer
            isOpen={drawerOpen}
            onClose={this.onDrawerToggle}
            size={Drawer.SIZE_SMALL}
            icon="notifications"
            title="Manage your Notifications"
            transitionDuration={200}
            hasBackdrop={false}
          >
            <NotificationContainer apis={apis} />
          </Drawer>
        </div>
      </Link>
    );
  }
}

Notifications.propTypes = {
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Notifications;
