import React from 'react';
import PropTypes from 'prop-types';
import { FormTextInput } from './Form/FormTextInput';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Tooltip } from '../common/Form/Tooltip';


const customIcon = (icon, handleLockClick, hidden) => {
  if (icon.side === 'right') {
    const rightIcon = (
      <Tooltip content={hidden === true ? <span >Show</span> : <span>Hide</span>} position="top">
        {
          hidden === true ? <AiFillEye
            style={{ marginRight: 5, color: '#757575', fontSize: '20px', cursor: 'pointer' }}
            onClick={handleLockClick}
          /> : <AiFillEyeInvisible
              style={{ marginRight: 5, color: '#757575', fontSize: '20px', cursor: 'pointer' }}
              onClick={handleLockClick}
            />
        }

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

  componentDidMount() {
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
      <FormTextInput
        name={data.name}
        type={hidden ? 'password' : 'text'}
        placeholder={data.placeholder}
        onChange={e => onChange(data.id, e.target.value)}
        className="pc-input-group"
        value={value}
        label={data.name}
        isRequired={data.required}
        rightElement={data.hidden && icons.rightIcon}
        {...data}
      />
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
