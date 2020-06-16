import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Intent, Icon } from '@blueprintjs/core';
import MetaTags from 'react-meta-tags';
import client from '../../../../socket';
import * as actions from '../../../../actions';
import Notifications from '../notification';
import MessageNotification from './MessageNotification';
import getUnReadNotification from '../notification/helper-functions/getUnreadNotification';
import SmallScreenMenu from './SmallScreenMenu';
import { getChatList } from '../../../../common/communication/chatlist/helper-function';
import { ENDPOINT } from '../../../../config';
import DashboardMenu from './DashboardMenu';
import callClosehandler from '../../../../common/communication/helper-functions/webrtc/mesh/closeHandler';

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
    unreadMessage: 0,
    unreadNotis: 0,
    lastNotifId: null,
  };

  async componentDidMount() {
    const apis = await client.scope('Mentee');
    const { account } = this.props;
    if (account.user) {
      this.getUnreadNotifs(this.props);
    }
    this.setState({ apis });
  }

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps;
    if (account.user) {
      this.getUnreadNotifs(nextProps);
    }
  }

  getUnreadNotifs = (nextProps) => {
    const { database, account } = nextProps;
    if (!account.user) return;
    const chatList = getChatList({ database, account });
    const unreadMessage = chatList.reduce((t, next) => {
      t += next.unSeenNo;
      return t;
    }, 0);
    const notiDetails = getUnReadNotification(this.props);
    this.setState({
      unreadMessage,
      unreadNotis: notiDetails.unSeenNo,
      lastNotifId: notiDetails.lastNotifId,
    });
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

  getMetaTags = () => {
    const { unreadMessage, unreadNotis } = this.state;
    const total = unreadMessage + unreadNotis > 9 ? '9+' : unreadNotis + unreadMessage;
    return (
      <MetaTags>
        {
          total === 0 ? <title>Proper Class</title> : <title>{`(${total}) Proper Class`}</title>
        }
      </MetaTags>
    );
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
    const { apis,unreadNotis, lastNotifId, redirectDashboard, unreadMessage, loading, smallScreen } = this.state;
    return (
      <div className={`navbar ${className}`}>
        {this.getMetaTags()}
        {redirectDashboard && <Redirect exact push to={`/dashboard/${account.user.slug}`} />}
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
              unreadMessage={unreadMessage}
              database={database}
              updateWebRtc={updateWebRtc}
            />
            )}
          {account.sessionId && <Notifications notiNo={unreadNotis} lastNotifId={lastNotifId} {...this.props} apis={apis} />}
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
