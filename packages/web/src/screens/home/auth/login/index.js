import React, { Component } from 'react';
import Log from './login';
import { Card,Elevation } from '@blueprintjs/core';

class Login extends Component{
    render (){
        return(
            <div className="log-or-reg">
                <Card interactive elevation={Elevation.TWO}>
                    <div>
                        <p> Enter Your Login Credentials.</p>
                    </div>
                    <Log />
                </Card>
            </div>
        );
    }
}

export default Login;
