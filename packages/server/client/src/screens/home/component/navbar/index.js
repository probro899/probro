import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineDashboard, AiOutlineLogout } from "react-icons/ai";
import { Menu, MenuItem } from '../../../../common/Menu';
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
import ProgressBar from '../../../../common/ProgressBar';
import CenterMenus from './CenterMenus';

const DropDownMenu = (onclick, logoutAction, loading, account) => {
  return (
    <Menu style={{ width: '100px' }}>
      <MenuItem
        style={{ fontSize: '12px', marginBottom: '5px', backgroundColor: '#175fc7' }}
        icon={<AiOutlineDashboard size={20} />}
        active
        text="Dashboard"
        onClick={onclick}
        disabled={!account.user}
      />
      <MenuItem
        style={{ fontSize: '12px' }}
        disabled={loading || !account.user}
        icon={<AiOutlineLogout size={20} />}
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
    if (account.user) this.getUnreadNotifs(this.props);
    this.setState({ apis });
  }

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps;
    if (account.user) this.getUnreadNotifs(nextProps);
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

  onClickHandler = () => this.setState({ redirectDashboard: true });

  toggleSmallScreen = () => {
    const { smallScreen } = this.state;
    this.setState({ smallScreen: !smallScreen });
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
    const { account, database, navigate, className, updateWebRtc } = this.props;
    let profilePic;
    if (account.user) {
      const profile = Object.values(database.UserDetail.byId).find(o => o.userId === account.user.id);
      profilePic = profile && profile.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(profile.userId, 10)}/profile/${profile.image}` : null;
    }
    const { apis, unreadNotis, lastNotifId, redirectDashboard, unreadMessage, loading, smallScreen, msgSound, notiSound } = this.state;
    return (
      <div className={`navbar ${className}`}>
        <ProgressBar width={navigate.progress.percent} />
        {this.getMetaTags()}
        {redirectDashboard && <Redirect exact push to={`/dashboard/${account.user.slug}`} />}
        <div className="navbar-left">
          <NavLink to="/">
            <div className="navbar-item" style={{ padding: '0px 5px' }}>
              <img width={200} alt="Proper Class Logo" src="/assets/graphics/logo.svg" />
            </div>
          </NavLink>
        </div>
        <CenterMenus />
        <div className="navbar-right">
          <GiHamburgerMenu size={40} className="more-icon" onClick={this.toggleSmallScreen} />
          <div className="right-most-elements">
            <SmallScreenMenu
              smallScreenToggle={this.toggleSmallScreen}
              open={smallScreen}
              account={account}
              apis={apis}
              pcLogo='/assets/graphics/logo.svg'
            />
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
                <NavLink to="/login">
                  <Button onClick={() => { }} type="button" buttonStyle="btn--primary--solid" buttonSize="btn--medium" title="Login" />
                </NavLink>
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
