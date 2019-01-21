import React, { Component } from 'react';
import { FormGroup } from '@blueprintjs/core';
import { Input, Button } from '../../../../common';

class Register extends Component {
  state = {};

  render() {
    return (
      <FormGroup>
        <Input placeholder="Eg. Nabin" class_="f-element-class" label_="First Name" />
        <Input placeholder="Eg. Shah" class_="f-element-class" label_="Last Name" />
        <Input placeholder="Eg. hello@gmail.com" class_="f-element-class" label_="Email" />
        <Input placeholder="At least 6 characters" class_="f-element-class" label_="Password" iconName="Lock" />
        <Input placeholder="Re-type your password" class_="f-element-class" label_="Confrim Password" iconName="Lock" />
        <Button text="Submit" class_="f-element-class" />
      </FormGroup>
    );
  }
}
export default Register;
