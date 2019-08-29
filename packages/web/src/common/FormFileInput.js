import React from 'react';
import PropTypes from 'prop-types';
import { FileInput, Label } from '@blueprintjs/core';

class Fileinput extends React.Component {
  state = {};

  render() {
    const { data, onChange, value } = this.props;
    return (
      <Label>
        <span className="label-text">{data.name}</span>
        {data.required && <span style={{ color: 'red' }}> *</span>}
        <br />
        <FileInput
          onInputChange={e => onChange(data.id, e.target.files[0])}
          value={value}
          options={data.options}
          {...data}
        />
      </Label>
    );
  }
}
Fileinput.defaultProps = {
  value: {},
};

Fileinput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Fileinput;
