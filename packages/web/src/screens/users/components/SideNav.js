import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';

const NavElement = (props) => {
  const { iconName, name, active } = props;
  return (
    <div className={active ? 'sideNavElement active' : 'sideNavElement'}>
      <Icon icon={IconNames[iconName]} iconSize="15" color="rgba(78, 185, 255, 1)" style={{ verticalAlign: 'baseline' }} />
      <span>
      &nbsp;&nbsp;
        {name}
      </span>
    </div>
  );
};

NavElement.defaultProps = {
  active: false,
};

NavElement.propTypes = {
  iconName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

class SideNav extends Component {
  state = {}

  render() {
    const navElements = [{ iconName: 'PERSON', name: 'Profile' },
      { iconName: 'HOME', name: 'Classes' },
      { iconName: 'COG', name: 'Settings' },
    ];
    const { main } = this.props;
    return (
      <div className="sideNav">
        {
          navElements.map((obj) => {
            return (
              <NavElement
                name={obj.name}
                key={obj.name}
                iconName={obj.iconName}
                active={main.activeNav === obj.name ? true: false}
              />
            );
          })
        }
      </div>
    );
  }
}

SideNav.propTypes = {
  main: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, { ...actions })(SideNav);
