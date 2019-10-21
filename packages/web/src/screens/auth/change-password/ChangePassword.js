import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../../common';
import { changePassword } from '../helper-functions';

class ChangePassword extends Component {
  state = {};

  render() {
    const { pForm } = this.props;
    return (
      <Form data={pForm} callback={changePassword} />
    );
  }
}

ChangePassword.propTypes = {
  pForm: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChangePassword;
