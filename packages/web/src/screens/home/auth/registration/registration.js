import React, { Component } from 'react';
import { FormGroup, Card, Elevation } from '@blueprintjs/core';
import { Input,Button } from '../../../../common';

class Register extends Component {
    render() {
        return(
            <FormGroup>
                <Input placeholder="First Name" class_="f-element-class"/>
                <Input placeholder="Last Name" class_="f-element-class"/>
                <Input placeholder="Sex" class_="f-element-class"/>
                <Input placeholder="Password" class_="f-element-class"/>
                <Button text="Submit" class_="f-element-class"/>
            </FormGroup>
        );
    }
}
export default Register;
