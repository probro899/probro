import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Icon } from '@blueprintjs/core';
import MetaTags from 'react-meta-tags';
import client from '../../../../socket';
import * as actions from '../../../../actions';
import Notifications from '../notification';
import MessageNotification from './MessageNotification';
import getUnReadNotification from '../notification/helper-functions/getUnreadNotification';
import SmallScreenMenu from './SmallScreenMenu';
import { ENDPOINT } from '../../../../config';
import DashboardMenu from './DashboardMenu';
import callClosehandler from '../../../../communication/helper-functions/webrtc/mesh/closeHandler';
import { Button } from '../../../../common/utility-functions/Button/Button';

const DropDownMenu = (onclick, logoutAction, loading, account) => {
  return (
    <Menu
      style={{
        width: '100px'
      }}
    >
      <MenuItem
        style={{

          fontSize: '12px',
          marginBottom: '5px',
          backgroundColor: '#175fc7'
        }}
        // className="dashboard-menu-items"
        icon="dashboard"
        active
        // intent={Intent.PRIMARY}
        text="Go To Dashboard"
        onClick={onclick}
        disabled={!account.user}

      />
      <MenuItem
        style={{

          fontSize: '12px',

        }}
        disabled={loading || !account.user}
        icon="log-out"
        // intent={Intent.DANGER}
        text="Log Out"
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
    msgSound: false,
    notiSound: false,
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
    const { account, webRtc } = nextProps;
    const { unreadMessage, unreadNotis } = this.state;
    if (!account.user) return;
    const chatList = webRtc.chatList || [];
    const unreadMessageT = chatList.reduce((t, next) => {
      t += next.unSeenNo;
      return t;
    }, 0);
    const notiDetails = getUnReadNotification(this.props);
    this.setState({
      unreadMessage: unreadMessageT,
      unreadNotis: notiDetails.unSeenNo,
      lastNotifId: notiDetails.lastNotifId,
      msgSound: unreadMessage < unreadMessageT,
      notiSound: unreadNotis < notiDetails.unSeenNo,
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
    const { navigate } = this.props;
    const total = unreadMessage + unreadNotis > 9 ? '9+' : unreadNotis + unreadMessage;
    return (
      <MetaTags>
        {
          total === 0 ? <title>{navigate.page.title}</title> : <title>{`(${total}) ${navigate.page.title}`}</title>
        }
      </MetaTags>
    );
  }

  render() {
    // console.log('navbar called', this.props)
    const {
      account, database, navigate, className,
      updateWebRtc,
    } = this.props;
    let profilePic;
    if (account.user) {
      const profile = Object.values(database.UserDetail.byId).find(o => o.userId === account.user.id);
      profilePic = profile && profile.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(profile.userId, 10)}/profile/${profile.image}` : null;
    }
    const { apis, unreadNotis, lastNotifId, redirectDashboard, unreadMessage, loading, smallScreen, msgSound, notiSound } = this.state;
    // console.log('navigation', navigate.mainNav);
    return (
      <div className={`navbar ${className}`}>
        {/* <div>hlw test</div> */}
        {this.getMetaTags()}
        {redirectDashboard && <Redirect exact push to={`/dashboard/${account.user.slug}`} />}
        <div className="navbar-left">
          <Link
            to="/"
            className={navigate.mainNav.name === 'properClass' ? 'active' : null}
          >
            <div className="navbar-item" style={{ padding: '0px 5px' }}>
              <LazyLoadImage width={200} alt="Proper Class Logo" src="/assets/graphics/realLogo.png" />
            </div>
          </Link>
        </div>
        <div className="navbar-center">
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
          <Link
            to="/pricing"
            className={navigate.mainNav.name === 'pricing' ? 'active' : null}
          >
            <div className="navbar-item">
              <span>
                Pricing
              </span>
            </div>
          </Link>
        </div>

        <div className="navbar-right">

          <Icon icon="menu" height='40' width='40' className="more-icon" onClick={this.toggleSmallScreen} />

          <div className="right-most-elements">
            <SmallScreenMenu
              smallScreenToggle={this.toggleSmallScreen}
              open={smallScreen}
              account={account}
              apis={apis}
              pcLogo='/assets/graphics/realLogo.png'
            />

            {/* Notifications in navigation */}
            {account.sessionId
              && (
                <MessageNotification
                  account={account}
                  unreadMessage={unreadMessage}
                  database={database}
                  updateWebRtc={updateWebRtc}
                  msgSound={msgSound}
                />
              )}
            {account.sessionId && <Notifications notiSound={notiSound} notiNo={unreadNotis} lastNotifId={lastNotifId} {...this.props} apis={apis} />}
            {account.sessionId
              ? <DashboardMenu navigate={navigate} profilePic={profilePic} content={DropDownMenu(this.onClickHandler, this.logoutAction, loading, account)} />
              : (
                <Link
                  to="/login"
                  className={navigate.mainNav.name === 'login' ? 'active' : null}
                >
                  {/* <div className="navbar-item no-right-margin">
                    <span className="login-btn">Login</span>
                  </div> */}
                  <Button
                    onClick={() => { }}
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--medium"
                    title="Login"
                  // iconPosition="left"
                  // icon={<FaBeer />}
                  />
                </Link>
              )
            }
          </div>
        </div>
      </div >
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
