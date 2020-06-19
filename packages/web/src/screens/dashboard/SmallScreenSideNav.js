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
    toggleMenu,
    url,
  } = props;
  return (
    <Link to={url ? `${match.url}/${url}` : match.url} onClick={toggleMenu} className={active ? 'sideNavElement active' : 'sideNavElement'}>
      <span>
      &nbsp;&nbsp;
        {name}
      </span>
    </Link>
  );
};

NavElement.defaultProps = {
  active: false,
  url: null,
};

NavElement.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  active: PropTypes.bool,
  toggleMenu: PropTypes.func.isRequired,
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
    const navElements = [{ name: 'Profile', url: null },
      { name: 'Classes', url: 'classes' },
      { name: 'Connections', url: 'connection' },
      { name: 'Drawing Board', url: 'drawing-board' },
      { name: 'Blog', url: 'blog' },
      { name: 'Settings', url: 'settings' },
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
                    toggleMenu={this.toggleMenu}
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
