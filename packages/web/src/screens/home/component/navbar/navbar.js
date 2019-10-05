import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Popover, Position, Intent } from '@blueprintjs/core';
import client from '../../../../socket';
import Notifications from '../notification';

const profileIcon = require('../../../../assets/icons/64w/uploadicon64.png');

const DropDownMenu = (onclick, apis) => {
  return (
    <Menu>
      <MenuItem
        icon="user"
        active
        intent={Intent.PRIMARY}
        text="My Profile"
        onClick={onclick}
      />
      <MenuItem
        icon="log-out"
        intent={Intent.DANGER}
        text="Logout"
        onClick={async () => await apis.logout()}
      />
    </Menu>
  );
};

class Navbar extends Component {
  state = {
    apis: {},
    redirectDashboard: false,
  };

  async componentDidMount() {
    const apis = await client.scope('Mentee');
    this.setState({ apis });
    // eslint-disable-next-line no-undef
    window.addEventListener('resize', this.screenResize);
  }

  // checks for the resize of window
  screenResize = (e) => {
    // eslint-disable-next-line no-console
    // console.log('to be done for it to be responsive', e.currentTarget.innerWidth);
  }

  onClickHandler = () => {
    this.setState({ redirectDashboard: true });
  }

  render() {
    const { account, navigate, className } = this.props;
    const { apis, redirectDashboard } = this.state;
    return (
      <div className={`navbar ${className}`}>
        {redirectDashboard && <Redirect exact push to={`/${account.sessionId}/profile`} />}
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
        <div className="navbar-right">
          {/* Notifications in navigation */}
          {account.sessionId && <Notifications apis={apis} />}
          { account.sessionId
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
                    <img
                      src={profileIcon}
                      className="profile-icon"
                      alt="profile or blank profile"
                    />
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
  navigate: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Navbar);
