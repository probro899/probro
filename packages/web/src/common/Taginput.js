import React from 'react';
import PropTypes from 'prop-types';
import { TagInput, Label } from '@blueprintjs/core';

class Taginput extends React.Component {
  state = {};

  render() {
    const { data, onChange, value } = this.props;
    return (
      <Label>
        <span className="label-text">{data.name}</span>
        {data.required && <span style={{ color: 'red' }}> *</span>}
        <TagInput
          onAdd={e => onChange(data.id, e)}
          onChange={e => onChange(data.id, e)}
          {...data}
          className="tag-input"
          values={value}
        />
      </Label>
    );
  }
}

Taginput.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Taginput;
