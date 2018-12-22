import React, { Component } from 'react';
import { FormGroup } from '@blueprintjs/core';
import { Input,Button } from '../../../../common';

class Log extends Component {
    render() {
        return(
            <FormGroup>
                <Input placeholder="Username" class_="f-element-class"/>
                <Input placeholder="Password" class_="f-element-class"/>
                <Button text="Submit" class_="f-element-class"/>
            </FormGroup>
        );
    }
}
export default Log;
