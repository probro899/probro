import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Menu, MenuItem, Popover, Position, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import * as actions from '../../../actions';

const profileIcon = require('../../../assets/imageUploadIcon.png');

const dropDownMenu = (props, onclick) => {
  const { main, mainHandler } = props;
  const active = main.activeNav.name === 'Profile';
  return (
    <Menu>
      <MenuItem
        icon="user"
        active={active}
        intent={Intent.PRIMARY}
        text="My Profile"
        onClick={onclick}
      />
      <MenuItem
        icon="log-out"
        intent={Intent.DANGER}
        text="Logout"
        onClick={() => mainHandler('logout')}
      />
    </Menu>
  );
};

dropDownMenu.propTypes = {
  main: PropTypes.objectOf(PropTypes.any).isRequired,
  mainHandler: PropTypes.func.isRequired,
};

class Navbar extends Component {
  state = { showProfile: false };

  onClick = (value) => {
    const { updateMainValue } = this.props;
    updateMainValue('mainNav', { active: value });
  };

  onClickHandler = () => {
    const { updateMainValue } = this.props;
    updateMainValue('activeNav', { name: 'Profile' });
    this.setState({
      showProfile: true,
    });
  }

  render() {
    const { main } = this.props;
    const { showProfile } = this.state;
    // eslint-disable-next-line no-undef
    // const id = sessionStorage.getItem('SESSION_ID');
    const id = 'Abc4343kasdklfjas';
    return (
      <div className="navbar">
        <div className="navbar-left">
          <Link
            to="/"
            className={main.mainNav.active === 'properClass' ? 'active' : null}
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
            className={main.mainNav.active === 'blogs' ? 'active' : null}
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
            className={main.mainNav.active === 'help' ? 'active' : null}
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
            className={main.mainNav.active === 'tour' ? 'active' : null}
            onClick={() => this.onClick('tour')}
          >
            <div className="navbar-item">
              <span>
                Take a Tour
                <Icon icon={IconNames.CARET_DOWN} iconSize={Icon.SIZE_LARGE} />
              </span>
            </div>
          </Link>
          { id
            ? (
              <Link
                to="#"
                className={main.mainNav.active === 'profileIcon' ? 'active' : null}
                onClick={() => this.onClick('profileIcon')}
              >
                <Popover
                  content={dropDownMenu(this.props, this.onClickHandler)}
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
                className={main.mainNav.active === 'login' ? 'active' : null}
                onClick={() => this.onClick('login')}
              >
                <div className="navbar-item">
                  <span>Login</span>
                </div>
              </Link>
            )
          }
        </div>
        {showProfile && id && <Redirect push to={`/${id}/me`} />}
      </div>
    );
  }
}

Navbar.propTypes = {
  main: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMainValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps, { ...actions })(Navbar);
