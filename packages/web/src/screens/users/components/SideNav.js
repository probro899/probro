import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';

const NavElement = (props) => {
  const {
    iconName,
    name,
    active,
    match,
  } = props;
  return (
    <Link to={`${match.url}/${name.toLowerCase()}`} className={active ? 'sideNavElement active' : 'sideNavElement'}>
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
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  active: PropTypes.bool,
};

class SideNav extends Component {
  state = {}

  componentWillMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: 'profileIcon' },
    });
  }

  render() {
    const navElements = [{ iconName: 'PERSON', name: 'Profile' },
      { iconName: 'HOME', name: 'Classes' },
      { iconName: 'PARAGRAPH', name: 'Blog' },
      { iconName: 'COG', name: 'Settings' },
    ];
    const { match, navigate } = this.props;
    return (
      <div className="sideNav">
        {
          navElements.map((obj) => {
            return (
              <NavElement
                match={match}
                name={obj.name}
                key={obj.name}
                iconName={obj.iconName}
                active={navigate.sideNav.name === obj.name ? true: false}
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
