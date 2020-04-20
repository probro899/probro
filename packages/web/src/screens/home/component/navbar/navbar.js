import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Intent, Icon } from '@blueprintjs/core';
import client from '../../../../socket';
import * as actions from '../../../../actions';
import Notifications from '../notification';
import MessageNotification from './MessageNotification';
import SmallScreenMenu from './SmallScreenMenu';
import { ENDPOINT } from '../../../../config';
import DashboardMenu from './DashboardMenu';
import callClosehandler from '../../../../common/communication/helper-functions/webrtc/closeHandler';

const pcLogo = require('../../../../assets/logo.png');

const DropDownMenu = (onclick, logoutAction, loading, account) => {
  return (
    <Menu>
      <MenuItem
        icon="dashboard"
        active
        intent={Intent.PRIMARY}
        text="Goto Dashboard"
        onClick={onclick}
        disabled={!account.user}
      />
      <MenuItem
        disabled={loading || !account.user}
        icon="log-out"
        intent={Intent.DANGER}
        text="Logout"
        onClick={logoutAction}
      />
    </Menu>
  );
};

class Navbar extends Component {
  state = {
    apis: {},
    redirectDashboard: false,
    smallScreen: false,
    loading: false,
  };

  async componentDidMount() {
    const apis = await client.scope('Mentee');
    this.setState({ apis });
  }

  logoutAction = async () => {
    const { webRtc } = this.props;
    const { apis } = this.state;
    this.setState({ loading: true });
    try {
      if (webRtc.isLive) {
        await callClosehandler(this.props, null, apis)();
      }
      apis.logout();
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  onClickHandler = () => {
    this.setState({ redirectDashboard: true });
  }

  toggleSmallScreen = () => {
    const { smallScreen } = this.state;
    this.setState({
      smallScreen: !smallScreen,
    });
  }

  render() {
    const {
      account, database, navigate, className,
      updateWebRtc,
    } = this.props;
    let profilePic;
    if (account.user) {
      const profile = Object.values(database.UserDetail.byId).find(o => o.userId === account.user.id);
      profilePic = profile && profile.image ? `${ENDPOINT}/user/${10000000 + parseInt(profile.userId, 10)}/profile/${profile.image}` : null;
    }
    const { apis, redirectDashboard, loading, smallScreen } = this.state;
    return (
      <div className={`navbar ${className}`}>
        {redirectDashboard && <Redirect exact push to={`/${account.user.slug}/profile`} />}
        <div className="navbar-left">
          <Link
            to="/"
            className={navigate.mainNav.name === 'properClass' ? 'active' : null}
          >
            <div className="navbar-item" style={{ padding: '0px 5px' }}>
              <img width={200} alt="Proper Class Logo" src={pcLogo} />
            </div>
          </Link>
          <Link
            to="/archive"
            className={navigate.mainNav.name === 'archive' ? 'active' : null}
          >
            <div className="navbar-item">
              <span>
                Archive
              </span>
            </div>
          </Link>
          <Link
            to="/search"
            className={navigate.mainNav.name === 'search' ? 'active' : null}
          >
            <div className="navbar-item">
              <span>
                Find Mentor
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-more-container">
          <Icon icon="menu" className="more-icon" onClick={this.toggleSmallScreen} />
          <SmallScreenMenu
            smallScreenToggle={this.toggleSmallScreen}
            open={smallScreen}
            account={account}
            apis={apis}
            pcLogo={pcLogo}
          />
        </div>
        <div className="navbar-right">
          {/* Notifications in navigation */}
          {account.sessionId
            && (
            <MessageNotification
              account={account}
              database={database}
              updateWebRtc={updateWebRtc}
            />
            )}
          {account.sessionId && <Notifications {...this.props} apis={apis} />}
          { account.sessionId
            ? <DashboardMenu navigate={navigate} profilePic={profilePic} content={DropDownMenu(this.onClickHandler, this.logoutAction, loading, account)} />
            : (
              <Link
                to="/login"
                className={navigate.mainNav.name === 'login' ? 'active' : null}
              >
                <div className="navbar-item">
                  <span>Login</span>
                </div>
              </Link>
            )
          }
        </div>
      </div>
    );
  }
}

Navbar.defaultProps = {
  className: '',
};

Navbar.propTypes = {
  className: PropTypes.string,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  navigate: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Navbar);
