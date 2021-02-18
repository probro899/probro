import React from 'react';
import PropTypes from 'prop-types';
import { FormTextArea } from './Form/FormTextArea';

class Textarea extends React.Component {
  state = {};

  render() {
    const { data, onChange, value } = this.props;
    return (
      <FormTextArea
        name={data.name}
        className="pc-text-area"
        placeholder={data.placeholder}
        onChange={e => onChange(data.id, e.target.value)}
        value={value}
        label={data.name}
        resizable
        rows="5"
      />
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
