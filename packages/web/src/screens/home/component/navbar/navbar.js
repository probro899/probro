import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Popover, Position, Intent, Icon } from '@blueprintjs/core';
import client from '../../../../socket';
import * as actions from '../../../../actions';
import Notifications from '../notification';
import MessageNotification from './MessageNotification';
import SmallScreenMenu from './SmallScreenMenu';
import { RoundPicture } from '../../../../components';
import { ENDPOINT } from '../../../../config';

const profileIcon = require('../../../../assets/icons/64w/uploadicon64.png');

const DropDownMenu = (onclick, apis) => {
  return (
    <Menu>
      <MenuItem
        icon="dashboard"
        active
        intent={Intent.PRIMARY}
        text="Dashboard"
        onClick={onclick}
      />
      <MenuItem
        icon="log-out"
        intent={Intent.DANGER}
        text="Logout"
        onClick={() => apis.logout()}
      />
    </Menu>
  );
};

class Navbar extends Component {
  state = {
    apis: {},
    redirectDashboard: false,
    smallScreen: false,
  };

  async componentDidMount() {
    const apis = await client.scope('Mentee');
    this.setState({ apis });
    // eslint-disable-next-line no-undef
    window.addEventListener('resize', this.screenResize);
  }

  // checks for the resize of window
  screenResize = (e) => {
    // console.log('to be done for it to be responsive', e.currentTarget.innerWidth);
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
    console.log('props in nav bar', this.props);
    let profilePic;
    Object.values(database.UserDetail.byId).map((obj) => {
      if (account.user && account.user.id === obj.userId) {
        profilePic = obj.image ? `${ENDPOINT}/user/${10000000 + parseInt(account.user.id, 10)}/profile/${obj.image}` : null;
      }
    });
    const { apis, redirectDashboard, smallScreen } = this.state;
    return (
      <div className={`navbar ${className}`}>
        {redirectDashboard && <Redirect exact push to={`/${account.user.slug}/profile`} />}
        <div className="navbar-left">
          <Link
            to="/"
            className={navigate.mainNav.name === 'properClass' ? 'active' : null}
          >
            <div className="navbar-item">
              <span>
                Proper Class
              </span>
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
            to="#"
            className={navigate.mainNav === 'help' ? 'active' : null}
          >
            <div className="navbar-item">
              <span>
                Get Help
              </span>
            </div>
          </Link>
          <Link
            to="/take-a-tour"
            className={navigate.mainNav.name === 'tour' ? 'active' : null}
          >
            <div className="navbar-item">
              <span>
                Take a Tour
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-more-container">
          <Icon icon="menu" className="more-icon" onClick={this.toggleSmallScreen} iconSize={25} color="#666" />
          <SmallScreenMenu
            smallScreenToggle={this.toggleSmallScreen}
            open={smallScreen}
            account={account}
            apis={apis}
          />
        </div>
        <div className="navbar-right">
          {/* Notifications in navigation */}
          {account.user
            && (
            <MessageNotification
              account={account}
              database={database}
              updateWebRtc={updateWebRtc}
            />
            )}
          {account.user && <Notifications account={account} apis={apis} />}
          { account.user
            ? (
              <Link
                to="#"
                className={navigate.mainNav.name === 'profileIcon' ? 'active' : null}
              >
                <Popover
                  content={DropDownMenu(this.onClickHandler, apis)}
                  minimal
                  position={Position.BOTTOM}
                >
                  <div className="navbar-item">
                    <div className="profile-icon">
                      <RoundPicture imgUrl={profilePic || profileIcon} />
                    </div>
                  </div>
                </Popover>
              </Link>
            )
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
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Navbar);
