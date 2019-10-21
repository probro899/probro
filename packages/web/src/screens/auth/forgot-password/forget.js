import React, { Component } from 'react';
import { Form } from '../../../common';
import forgotForm from './structure';
import { forgot } from '../helper-functions';

class Forgot extends Component {
  state = {}

  render() {
    return (
      <Form data={forgotForm} callback={forgot} />
    );
  }
}

export default Forgot;
