import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormGroup } from '@blueprintjs/core';
import { Input, Button } from '../../../../common';
import * as actions from '../../../../actions';

class Register extends Component {
  state = {};

  render() {
    const { form } = this.props;
    return (
      <FormGroup>
        <Input placeholder="Eg. Nabin" class_="f-element-class" label_="First Name" value="firstName" {...this.props} schema="registerForm" />
        <Input placeholder="Eg. Prasad" class_="f-element-class" label_="Middle Name" value="middleName" {...this.props} schema="registerForm" />
        <Input placeholder="Eg. Shah" class_="f-element-class" label_="Last Name" value="lastName" {...this.props} schema="registerForm" />
        <Input placeholder="Eg. hello@gmail.com" class_="f-element-class" label_="Email" value="email" {...this.props} schema="registerForm" />
        <Input password placeholder="At least 8 characters" class_="f-element-class" label_="Password" iconName="Lock" value="password" {...this.props} schema="registerForm" />
        <Input password placeholder="Re-type your password" class_="f-element-class" label_="Confrim Password" iconName="Lock" value="confirmPassword" {...this.props} schema="registerForm" />
        <Button text="Submit" class_="f-element-class" {...this.props} schema="registerForm" />
        {form.registerForm.success && <Redirect push to="/login" />}
      </FormGroup>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, { ...actions })(Register);
