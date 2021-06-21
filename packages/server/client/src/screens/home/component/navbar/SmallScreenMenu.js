/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from '../../../../common/drawer';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../../actions';

const logOutHandler = (apis) => {
  try {
    apis.logout();
  } catch (e) {
    console.error('Logout faild', e);
  }
};

const DropMenu = ({ account, smallScreenToggle, apis }) => {
  return (
    <div className="pc-drop-menu">
      <NavLink exact onClick={smallScreenToggle} to="/" className='pc-drop-menu-link'>Home</NavLink>
      <NavLink onClick={smallScreenToggle} to="/courses" className='pc-drop-menu-link'>Courses</NavLink>
      <NavLink onClick={smallScreenToggle} to="/archive" className='pc-drop-menu-link'>Archive</NavLink>
      <NavLink onClick={smallScreenToggle} to="/search" className='pc-drop-menu-link'>Find Mentor</NavLink>
      <NavLink onClick={smallScreenToggle} to="/pricing" className='pc-drop-menu-link'>Pricing</NavLink>
      {!account.sessionId ? (
        <NavLink onClick={smallScreenToggle} to="/login" className="pc-drop-menu-link">Login</NavLink>
      ) : (
          <NavLink to="#" onClick={(e) => { logOutHandler(apis); smallScreenToggle() } } className="pc-drop-menu-link">Logout</NavLink>
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

  onClick = () => {
    const { smallScreenToggle } = this.props;
    smallScreenToggle();
  }

  render() {
    const { open, smallScreenToggle, account, pcLogo, apis } = this.props;
    return (
      <Drawer
        isOpen={open}
        onClose={smallScreenToggle}
        position="left"
        backdropOpacity={0.5}
        hasBackdrop
        title={
          <NavLink to="/" onClick={this.onClick}>
            <img alt="Proper Class Logo" style={{ objectFit: 'cover', width: 200 }} src={pcLogo} />
          </NavLink>
        }
      >
        <DropMenu smallScreenToggle={smallScreenToggle} account={account} apis={apis} />
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
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(SmallScreenMenu);
