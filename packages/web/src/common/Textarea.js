import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Label } from '@blueprintjs/core';

class Textarea extends React.Component {
  state = {};

  render() {
    const { data, onChange, value } = this.props;
    return (
      <Label>
        <span className="label-text">{data.name}</span>
        {data.required && <span style={{ color: 'red' }}> *</span>}
        <TextArea
          growVertically
          large
          onChange={e => onChange(data.id, e.target.value)}
          value={value}
          options={data.options}
          fill
          style={{
            resize: 'none',
          }}
          {...data}
        />
      </Label>
    );
  }
}
Textarea.defaultProps = {
  value: '',
};

Textarea.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Textarea;
