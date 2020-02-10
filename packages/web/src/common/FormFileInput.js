import React from 'react';
import PropTypes from 'prop-types';
import { FileInput, Label } from '@blueprintjs/core';

class Fileinput extends React.Component {
  state = { fileInputText: 'Choose a file...' };

  render() {
    const { data, onChange, value } = this.props;
    const { fileInputText } = this.state;
    return (
      <Label>
        <span className="label-text">{data.name}</span>
        {data.required && <span style={{ color: 'red' }}> *</span>}
        <br />
        <FileInput
          onInputChange={e => onChange(data.id, e.target.files[0])}
          value={value}
          text={value.name || fileInputText}
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
