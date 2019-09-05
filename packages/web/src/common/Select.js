import React from 'react';
import PropTypes from 'prop-types';
import { HTMLSelect, Label } from '@blueprintjs/core';

class Select extends React.Component {
  state = {};

  render() {
    const { data, onChange, value } = this.props;
    return (
      <Label>
        <span className="label-text">{data.name}</span>
        {data.required && <span style={{ color: 'red' }}> *</span>}
        <HTMLSelect
          onChange={e => onChange(data.id, e.target.value)}
          value={value}
          options={data.options}
          {...data}
        />
      </Label>
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
