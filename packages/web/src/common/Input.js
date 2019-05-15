import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Icon, Label, Tooltip, Position } from '@blueprintjs/core';

const customIcon = (icon, handleLockClick, hidden) => {
  if (icon.side === 'left') {
    return (
      {
        leftIcon:
  <Icon onClick={handleLockClick} iconName={icon.name} iconSize={Icon.SIZE_LARGE} />,
        rightIcon: null,
      }
    );
  }
  if (icon.side === 'right') {
    const rightIcon = (
      <Tooltip content={hidden === true ? 'show' : 'hide'} position={Position.RIGHT}>
        <Icon
          style={{ marginTop: 3, marginRight: 5, color: '#757575' }}
          icon={icon.name}
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
  state = {
    hidden: false,
  }

  componentWillMount = () => {
    const { data } = this.props;
    this.setState({ hidden: data.hidden });
  }

  handleLockClick = () => {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden });
  }

  render() {
    const { hidden } = this.state;
    const { data, onChange, value } = this.props;
    let icons = {};
    if (data.icon) {
      icons = customIcon(data.icon, this.handleLockClick, hidden);
    }
    return (
      <Label>
        <span className="label-text">{data.name}</span>
        <InputGroup
          onChange={e => onChange(data.id, e.target.value)}
          value={value}
          type={hidden ? 'password' : 'text'}
          leftIcon={icons.leftIcon}
          rightElement={icons.rightIcon}
          {...data}
        />
      </Label>
    );
  }
}
CustomInput.defaultProps = {
  value: '',
};

CustomInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CustomInput;
