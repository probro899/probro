import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Icon, Label, Tooltip, Button, Position } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const customIcon = (iconName, handleLockClick, showPassword) => {
  if (iconName === 'Search') {
    return (
      { leftIcon: <Icon icon={IconNames.SEARCH} iconSize={Icon.SIZE_LARGE} />, rightIcon: null }
    );
  }
  if (iconName === 'Lock') {
    const rightIcon = (
      <Tooltip content={showPassword ? 'Hide' : 'Show'} position={Position.RIGHT}>
        <Icon
          style={{ marginTop: 3, marginRight: 5, color: '#757575' }}
          icon={!showPassword ? IconNames.EYE_OFF : IconNames.EYE_OPEN}
          onClick={handleLockClick}
          iconSize="20"
        />
      </Tooltip>
    );
    return (
      { leftIcon: null, rightIcon }
    );
  }
  return ({ leftIcon: null, rightIcon: null });
};

class CustomInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPassword: false };
  }

  handleLockClick = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  render() {
    const { placeholder, iconName, class_, label_ } = this.props;
    const { showPassword } = this.state;
    const { leftIcon, rightIcon } = customIcon(iconName, this.handleLockClick, showPassword);
    return (
      <Label>
        <span className="label-text">{label_}</span>
        <InputGroup
          placeholder={placeholder}
          className={class_}
          leftIcon={leftIcon}
          rightElement={rightIcon}
          type={showPassword ? 'text' : 'password'}
          large
        />
      </Label>
    );
  }
}
CustomInput.defaultProps = {
  class_: 'input',
};
CustomInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  class_: PropTypes.string,
  label_: PropTypes.string.isRequired,
};
export default CustomInput;
