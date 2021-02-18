/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from '../../../../common/drawer';
import { Link } from 'react-router-dom';
import * as actions from '../../../../actions';

const logOutHandler = (apis) => {
  try {
    apis.logout();
  } catch (e) {
    console.error('Logout faild', e);
  }
};

const DropMenu = ({ account, activeNav, smallScreenToggle, apis }) => {
  return (
    <div className="pc-drop-menu">
      <Link onClick={smallScreenToggle} to="/" className={activeNav === 'properClass' ? 'pc-drop-menu-link active' : 'pc-drop-menu-link'}>Home</Link>
      <Link onClick={smallScreenToggle} to="/archive" className={activeNav === 'archive' ? 'pc-drop-menu-link active' : 'pc-drop-menu-link'}>Archive</Link>
      <Link onClick={smallScreenToggle} to="/search" className={activeNav === 'search' ? 'pc-drop-menu-link active' : 'pc-drop-menu-link'}>Find Mentor</Link>
      {!account.sessionId ? (
        <Link onClick={smallScreenToggle} to="/login" className="pc-drop-menu-link">Login</Link>
      ) : (
          <Link to="#" onClick={(e) => { logOutHandler(apis); smallScreenToggle() } } className="pc-drop-menu-link">Logout</Link>
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

  onClick = () => {
    const { smallScreenToggle } = this.props;
    smallScreenToggle();
  }

  render() {
    const { open, smallScreenToggle, account, pcLogo, navigate, apis } = this.props;
    return (
      <Drawer
        isOpen={open}
        onClose={smallScreenToggle}
        position="left"
        backdropOpacity={0.5}
        hasBackdrop
        title={
          <Link to="/" onClick={this.onClick}>
            <img alt="Proper Class Logo" style={{ objectFit: 'cover', width: 200 }} src={pcLogo} />
          </Link>
        }
      >
        <DropMenu smallScreenToggle={smallScreenToggle} account={account} activeNav={navigate.mainNav.name} apis={apis} />
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
