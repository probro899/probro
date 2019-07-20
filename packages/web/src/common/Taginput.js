import React from 'react';
import PropTypes from 'prop-types';
import { TagInput, Label } from '@blueprintjs/core';

class Taginput extends React.Component {
  state = {};

  onChange = (e) => {
    console.log('tag input', e);
  };

  render() {
    const { data } = this.props;
    return (
      <Label>
        <span className="label-text">{data.name}</span>
        <TagInput {...data} />
      </Label>
    );
  }
}

Taginput.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Taginput;
