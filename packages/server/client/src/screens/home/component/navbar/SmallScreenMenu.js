/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Drawer } from '@blueprintjs/core';
import * as actions from '../../../../actions';

const logOutHandler = (apis) => {
  try {
    apis.logout();
  } catch (e) {
    console.error('Logout faild', e);
  }
};

const DropMenu = ({ account, activeNav, apis }) => {
  return (
    <div className="pc-drop-menu">
      <Link to="/" className={activeNav === 'properClass' ? 'pc-drop-menu-link active' : 'pc-drop-menu-link'}>Home</Link>
      <Link to="/archive" className={activeNav === 'archive' ? 'pc-drop-menu-link active' : 'pc-drop-menu-link'}>Archive</Link>
      <Link to="/search" className={activeNav === 'search' ? 'pc-drop-menu-link active' : 'pc-drop-menu-link'}>Find Mentor</Link>
      {!account.sessionId ? (
        <Link to="/login" className="pc-drop-menu-link">Login</Link>
      ) : (
        <Link to="#" onClick={logOutHandler.bind(this, apis)} className="pc-drop-menu-link">Logout</Link>
      )}
    </div>
  );
};

DropMenu.propTypes = {
  activeNav: PropTypes.string.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
};

class SmallScreenMenu extends React.Component {
  state = {};

  render() {
    const { open, smallScreenToggle, account, pcLogo, navigate, apis } = this.props;
    return (
      <Drawer
        className="pc-dropdown-drawer"
        usePortal
        isOpen={open}
        onClose={smallScreenToggle}
        size="80%"
        position="left"
        autoFocus={false}
        lazy
        title={<img alt="Proper Class Logo" style={{ objectFit: 'cover', width: 200 }} src={pcLogo} />}
      >
        <DropMenu account={account} activeNav={navigate.mainNav.name} apis={apis} />
      </Drawer>
    );
  }
}

SmallScreenMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  smallScreenToggle: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  pcLogo: PropTypes.string.isRequired,
  navigate: PropTypes.objectOf(PropTypes.any).isRequired,

};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(SmallScreenMenu);
