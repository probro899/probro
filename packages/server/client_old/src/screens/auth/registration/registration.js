import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../../common';
import registerForm from './structure';

class Register extends Component {
  state = {};

  render() {
    const { handleRegistration } = this.props;
    return (
      <Form data={registerForm} callback={handleRegistration} />
    );
  }
}

Register.propTypes = {
  handleRegistration: PropTypes.func.isRequired,
};

export default Register;
