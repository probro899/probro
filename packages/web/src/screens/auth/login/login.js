import React, { Component } from 'react';
import { Form } from '../../../common';
import loginForm from './structure';
import { login } from '../helper-functions';

class Log extends Component {
  state = {}

  render() {
    return (
      <Form data={loginForm} callback={login} />
    );
  }
}

export default Log;
