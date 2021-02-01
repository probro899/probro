import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../../common';
import loginForm from './structure';

class Log extends Component {
  state = {}

  render() {
    const { loginHandler } = this.props;
    return (
      <Form data={loginForm} callback={loginHandler} />
    );
  }
}

Log.propTypes = {
  loginHandler: PropTypes.func.isRequired,
};

export default Log;
