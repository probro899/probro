import React from 'react';
import { basicForm } from './structure';
import { Form } from '../../../../common';

class BasicForm extends React.Component {
  state = {};

  handleBasicForm = () => {

  }

  render() {
    return (
      <Form data={basicForm} callback={this.handleBasicForm} />
    );
  }
}

export default BasicForm;
