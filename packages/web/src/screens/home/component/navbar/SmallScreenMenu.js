import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Drawer } from '@blueprintjs/core';

const DropMenu = ({ account, apis }) => {
  return (
    <div className="pc-drop-menu">
      <Link to="/" className="pc-drop-menu-link">Home</Link>
      {account.sessionId && <Link to={`/${account.sessionId}/profile`} className="pc-drop-menu-link">Profile</Link>}
      <Link to="/archive" className="pc-drop-menu-link">Archive</Link>
      <Link to="#" className="pc-drop-menu-link">Get Help</Link>
      <Link to="/take-a-tour" className="pc-drop-menu-link">Take a Tour</Link>
      {!account.sessionId ? (
        <Link to="/login" className="pc-drop-menu-link">Login</Link>
      ) : (
        <Link to="" onClick={async () => await apis.logout()} className="pc-drop-menu-link">Logout</Link>
      )}
    </div>
  );
};

DropMenu.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
};

class SmallScreenMenu extends React.Component {
  state = {};

  render() {
    const { open, smallScreenToggle, account, apis } = this.props;
    return (
      <Drawer
        className="pc-dropdown-drawer"
        usePortal
        isOpen={open}
        onClose={smallScreenToggle}
        size="60%"
        position="left"
        lazy
        title="PROPER CLASS"
        transitionDuration={200}
      >
        <DropMenu account={account} apis={apis} />
      </Drawer>
    );
  }
}

SmallScreenMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  smallScreenToggle: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SmallScreenMenu;
