import React from 'react';
import PropTypes from 'prop-types';
import { FormSelectField } from './Form/FormSelectField';

class Select extends React.Component {
  state = {};

  render() {
    const { data, onChange, value } = this.props;
    return (
      <FormSelectField
        onChange={e => onChange(data.id, e.target.value)}
        type={data.fieldtype}
        name={data.name}
        value={value}
        isRequired={data.required}
        options={data.options.sort((a, b) => (a.value > b.value ? 1 : -1))}
        {...data}
      />
    );
  }
}

Select.defaultProps = {
  value: '',
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Select;
