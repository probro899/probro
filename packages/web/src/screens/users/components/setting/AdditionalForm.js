import React from 'react';
import { additionalForm } from './structure';
import { Form } from '../../../../common';

class AdditionalForm extends React.Component {
  state = {};

  handleAdditionalForm = () => {

  }

  render() {
    return (
      <Form data={additionalForm} callback={this.handleAdditionalForm} />
    );
  }
}

export default AdditionalForm;
