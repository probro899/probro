import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../../common';
import registerForm from './structure';
import { register } from '../helper-functions';
import { passwordStrength, emailValidator } from '../utility-functions';

class Register extends Component {
  state = {};

  handleRegistration = async (data) => {
    const { notify } = this.props;
    if (!emailValidator(data.email)) {
      return { error: 'Please enter a valid email' };
    }
    if (passwordStrength(data.password) === 'weak') {
      return { error: 'Please enter a stronger password' };
    }
    if (data.password !== data.confirmPassword) {
      return { error: "Passwords don't match" };
    }
    const res = await register(data);
    if (res.response === 200) {
      notify();
    }
    return res;
  }

  render() {
    return (
      <Form data={registerForm} callback={this.handleRegistration} />
    );
  }
}

Register.propTypes = {
  notify: PropTypes.func.isRequired,
};

export default Register;
