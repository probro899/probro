import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Drawer } from '@blueprintjs/core';
import * as actions from '../../../../actions';

const logOutHandler = (apis, webRtc) => {
  // console.log('Log out handler called', webRtc);
  try {
    apis.logout();
  } catch (e) {
    // console.error('Logout faild', e);
  }
};

const DropMenu = ({ account, activeNav, apis, webRtc }) => {
  return (
    <div className="pc-drop-menu">
      <Link to="/" className={activeNav === 'properClass' ? 'pc-drop-menu-link active' : 'pc-drop-menu-link'}>Home</Link>
      <Link to="/archive" className={activeNav === 'archive' ? 'pc-drop-menu-link active' : 'pc-drop-menu-link'}>Archive</Link>
      <Link to="/search" className={activeNav === 'search' ? 'pc-drop-menu-link active' : 'pc-drop-menu-link'}>Find Mentor</Link>
      {/* <Link to="/take-a-tour" className="pc-drop-menu-link">Take a Tour</Link> */}
      {!account.sessionId ? (
        <Link to="/login" className="pc-drop-menu-link">Login</Link>
      ) : (
        <Link to="#" onClick={logOutHandler(apis, webRtc)} className="pc-drop-menu-link">Logout</Link>
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
    const { open, smallScreenToggle, account, pcLogo, navigate, apis, webRtc } = this.props;
    return (
      <Drawer
        className="pc-dropdown-drawer"
        usePortal
        isOpen={open}
        onClose={smallScreenToggle}
        size="60%"
        position="left"
        lazy
        title={<img alt="Proper Class Logo" style={{ objectFit: 'contain', width: '100%' }} src={pcLogo} />}
        transitionDuration={200}
      >
        <DropMenu account={account} activeNav={navigate.mainNav.name} apis={apis} webRtc />
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
