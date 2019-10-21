import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Collapse } from '@blueprintjs/core';

const NavElement = (props) => {
  const {
    name,
    active,
    match,
    url,
  } = props;
  return (
    <Link to={`${match.url}/${url}`} className={active ? 'sideNavElement active' : 'sideNavElement'}>
      <span>
      &nbsp;&nbsp;
        {name}
      </span>
    </Link>
  );
};

NavElement.defaultProps = {
  active: false,
};

NavElement.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  active: PropTypes.bool,
};

class SmallScreenSideNav extends React.Component {
  state = { open: false };

  toggleMenu = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }

  render() {
    const { open } = this.state;
    const { navigate, match } = this.props;
    const navElements = [{ name: 'Profile', url: 'profile' },
      { name: 'Classes', url: 'classes' },
      { name: 'Blog', url: 'blog' },
      { name: 'Settings', url: 'settings' },
      { name: 'Drawing Board', url: 'drawing-board' },
      { name: 'Messages', url: 'messages' },
      { name: 'Connections', url: 'connection' },
    ];
    return (
      <div className="pc-small-screen-sidenav">
        <div>
          <Button
            onClick={this.toggleMenu}
            className="nav-button"
            text={navigate.sideNav.name}
            fill
            large
            rightIcon={open ? 'chevron-up' : 'chevron-down'}
            alignText="left"
          />
        </div>
        <Collapse isOpen={open} keepChildrenMounted>
          <div className="pc-collapse-menu">
            {
              navElements.map((obj) => {
                return (
                  <NavElement
                    match={match}
                    url={obj.url}
                    name={obj.name}
                    key={obj.name}
                    iconName={obj.iconName}
                    active={navigate.sideNav.name === obj.name}
                  />
                );
              })
            }
          </div>
        </Collapse>
      </div>
    );
  }
}

SmallScreenSideNav.propTypes = {
  navigate: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(SmallScreenSideNav);
