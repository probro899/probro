import React from 'react';
import PropTypes from 'prop-types';
import {FormFileInput} from './Form/FormFileInput';

class Fileinput extends React.Component {
  state = { fileInputText: 'Choose a file...' };

  render() {
    const { data, onChange, value } = this.props;
    const { fileInputText } = this.state;
    return (
      <>
        <FormFileInput 
         onInputChange={e => onChange(data.id, e.target.files[0])}
         label={data.name}
         text={value.name || fileInputText}
        />
      </>
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
