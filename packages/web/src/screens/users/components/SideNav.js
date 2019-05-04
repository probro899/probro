import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';

const NavElement = (props) => {
  const {
    iconName,
    name,
    active,
    onClick,
    onKeyDown,
    role,
  } = props;
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div role={role} className={active ? 'sideNavElement active' : 'sideNavElement'} onClick={onClick} onKeyDown={onKeyDown}>
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
  role: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

class SideNav extends Component {
  state = {}

  onClick = (_name) => {
    const { updateMainValue } = this.props;
    updateMainValue('activeNav', { name: _name });
  }

  // jus to handle the eslint error we have to pass a keyboard event handler for div
  onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      this.focus();
    }
  }

  render() {
    const navElements = [{ iconName: 'PERSON', name: 'Profile' },
      { iconName: 'HOME', name: 'Classes' },
      { iconName: 'COG', name: 'Settings' },
      { iconName: 'PARAGRAPH', name: 'Blogs' },
    ];
    const { main } = this.props;
    return (
      <div className="sideNav">
        {
          navElements.map((obj) => {
            return (
              <NavElement
                role="menuitem"
                onClick={() => this.onClick(obj.name)}
                onKeyDown={this.onKeyDown}
                name={obj.name}
                key={obj.name}
                iconName={obj.iconName}
                active={main.activeNav.name === obj.name ? true: false}
              />
            );
          })
        }
      </div>
    );
  }
}

SideNav.propTypes = {
  updateMainValue: PropTypes.func.isRequired,
  main: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, { ...actions })(SideNav);
