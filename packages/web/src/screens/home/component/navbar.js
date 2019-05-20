import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Menu, MenuItem, Popover, Position, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import client from '../../../socket';

const profileIcon = require('../../../assets/imageUploadIcon.png');

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
        onClick={async () =>  await apis.logout()}
      />
    </Menu>
  );
};

class Navbar extends Component {
  state = {
    apis: {},
    redirectDashboard: false,
    // this is to indicate which navigation item is active at the moment
    mainNav: 'properClass',
  };

  async componentDidMount() {
    const apis = await client.scope('Mentee');
    this.setState({ apis });
  }

  onClick = (value) => {
    this.setState({ mainNav: value });
  };

  onClickHandler = () => {
    this.setState({ redirectDashboard: true });
  }

  render() {
    const { account } = this.props;
    const { apis, redirectDashboard, mainNav } = this.state;
    return (
      <div className="navbar">
        {redirectDashboard && <Redirect exact push to={`/${account.sessionId}/me`} />}
        <div className="navbar-left">
          <Link
            to="/"
            className={mainNav === 'properClass' ? 'active' : null}
            onClick={() => this.onClick('properClass')}
          >
            <div className="navbar-item">
              <span>
                Proper Class
              </span>
            </div>
          </Link>
          <Link
            to="#"
            className={mainNav === 'blogs' ? 'active' : null}
            onClick={() => this.onClick('blogs')}
          >
            <div className="navbar-item">
              <span>
                Blogs
                <Icon icon={IconNames.CARET_DOWN} iconSize={Icon.SIZE_LARGE} />
              </span>
            </div>
          </Link>
          <Link
            to="#"
            className={mainNav === 'help' ? 'active' : null}
            onClick={() => this.onClick('help')}
          >
            <div className="navbar-item">
              <span>
                Get Help
                <Icon icon={IconNames.CARET_DOWN} iconSize={Icon.SIZE_LARGE} />
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-right">
          <Link
            to="#"
            className={mainNav === 'tour' ? 'active' : null}
            onClick={() => this.onClick('tour')}
          >
            <div className="navbar-item">
              <span>
                Take a Tour
                <Icon icon={IconNames.CARET_DOWN} iconSize={Icon.SIZE_LARGE} />
              </span>
            </div>
          </Link>
          { account.sessionId
            ? (
              <Link
                to="#"
                className={mainNav === 'profileIcon' ? 'active' : null}
                onClick={() => this.onClick('profileIcon')}
              >
                <Popover
                  content={DropDownMenu(this.onClickHandler, apis)}
                  minimal
                  position={Position.BOTTOM}
                >
                  <div className="navbar-item">
                    <img
                      src={profileIcon}
                      height="45px"
                      alt="profile or blank profile"
                      style={{ border: '1px solid white', borderRadius: '425px', padding: '3px' }}
                    />
                  </div>
                </Popover>
              </Link>
            )
            : (
              <Link
                to="/login"
                className={mainNav === 'login' ? 'active' : null}
                onClick={() => this.onClick('login')}
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

Navbar.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps)(Navbar);
