import React, { Component } from 'react';
import Register from './registration';
import { Card,Elevation } from '@blueprintjs/core';

class Registration extends Component{
    render(){
        return(
            <div className="log-or-reg">
                <Card interactive elevation={Elevation.TWO}>
                    <div>
                        <p> Enter Your Login Credentials.</p>
                    </div>
                    <Register />
                </Card>
            </div>
        );
    }
}

export default Registration;
