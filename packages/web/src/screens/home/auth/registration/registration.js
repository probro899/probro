import React, { Component } from 'react';
import { Form } from '../../../../common';
import registerForm from './structure';
import { register } from '../helper-functions';

class Register extends Component {
  state = {};

  render() {
    return (
      <Form data={registerForm} callback={register} />
    );
  }
}

export default Register;
