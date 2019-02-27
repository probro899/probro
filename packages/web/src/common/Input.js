import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputGroup, Icon, Label, Tooltip, Position } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const customIcon = (iconName, handleLockClick, password) => {
  if (iconName === 'Search') {
    return (
      { leftIcon: <Icon icon={IconNames.SEARCH} iconSize={Icon.SIZE_LARGE} />, rightIcon: null }
    );
  }
  if (iconName === 'Lock') {
    const rightIcon = (
      <Tooltip content={password ? 'Hide' : 'Show'} position={Position.RIGHT}>
        <Icon
          style={{ marginTop: 3, marginRight: 5, color: '#757575' }}
          icon={password ? IconNames.EYE_OFF : IconNames.EYE_OPEN}
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
    showPassword: true,
  }

  handleLockClick = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  render() {
    const {
      placeholder, iconName, class_, label_, value, form, schema, password, updateFormValue,
    } = this.props;
    const { showPassword } = this.state;
    const { leftIcon, rightIcon } = customIcon(iconName, this.handleLockClick, showPassword);
    return (
      <Label>
        <span className="label-text">{label_}</span>
        <InputGroup
          // [value] is just a convention to use the name of the variable transfered.
          onChange={e => updateFormValue(schema, { [value]: e.target.value })}
          placeholder={placeholder}
          value={form[schema][value]}
          className={class_}
          leftIcon={leftIcon}
          rightElement={rightIcon}
          type={password && showPassword ? 'password' : 'text'}
          large
        />
      </Label>
    );
  }
}
CustomInput.defaultProps = {
  password: false,
  iconName: null,
  updateFormValue: null,
  label_: null,
  class_: 'input',
};
CustomInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  class_: PropTypes.string,
  schema: PropTypes.string.isRequired,
  updateFormValue: PropTypes.func,
  label_: PropTypes.string,
  password: PropTypes.bool,
  value: PropTypes.string.isRequired,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps)(CustomInput);
