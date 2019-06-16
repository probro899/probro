import React from 'react';
import { advancedForm } from './structure';
import { Form } from '../../../../common';

class AdvancedForm extends React.Component {
  state = {};

  handleAdvancedForm = () => {

  }

  render() {
    return (
      <Form data={advancedForm} callback={this.handleAdvancedForm} />
    );
  }
}

export default AdvancedForm;
