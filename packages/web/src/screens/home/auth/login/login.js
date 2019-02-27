import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormGroup } from '@blueprintjs/core';
import { Input, Button } from '../../../../common';
import * as actions from '../../../../actions';

class Log extends Component {
  state = {}

  componentWillMount() {
    const { updateFormValue } = this.props;
    updateFormValue('registerForm', { success: false });
  }

  render() {
    const { form } = this.props;
    return (
      <FormGroup>
        <Input label_="Email" placeholder="Eg, alex@gmail.com " class_="f-element-class" value="email" {...this.props} schema="loginForm" />
        <Input label_="Password" placeholder="Eg, ........" class_="f-element-class" value="password" {...this.props} schema="loginForm" password iconName="Lock" />
        <Button text="Submit" class_="f-element-class" {...this.props} schema="loginForm" />
        {form.loginForm.success && <Redirect push to="/user-id" />}
      </FormGroup>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, { ...actions })(Log);
