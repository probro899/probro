import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';
import * as actions from '../../actions';

const NavElement = (props) => {
  const {
    iconName,
    name,
    active,
    match,
    url,
  } = props;
  return (
    <Link to={`${match.url}/${url}`} className={active ? 'sideNavElement active' : 'sideNavElement'}>
      <Icon icon={IconNames[iconName]} iconSize="15" color="rgba(78, 185, 255, 1)" style={{ verticalAlign: 'baseline' }} />
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
  iconName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  active: PropTypes.bool,
};

class SideNav extends Component {
  state = {}

  componentDidMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: 'profileIcon' },
    });
  }

  render() {
    const navElements = [{ iconName: 'PERSON', name: 'Profile', url: 'profile' },
      { iconName: 'PROJECTS', name: 'Classes', url: 'classes' },
      { iconName: 'PARAGRAPH', name: 'Blog', url: 'blog' },
      { iconName: 'COG', name: 'Settings', url: 'settings' },
      { iconName: 'DRAW', name: 'Drawing Board', url: 'drawing-board' },
      // { iconName: 'CHAT', name: 'Messages', url: 'messages' },
      { iconName: 'PEOPLE', name: 'Connections', url: 'connection' },
    ];
    const { match, navigate } = this.props;
    return (
      <div className="sideNav">
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
    );
  }
}

SideNav.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  navigate: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { navigate } = state;
  return { navigate };
};

export default connect(mapStateToProps, { ...actions })(SideNav);
