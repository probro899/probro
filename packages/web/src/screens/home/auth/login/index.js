import React, { Component } from 'react';
import Log from './login';
import { Link } from 'react-router-dom';
import { Card,Elevation } from '@blueprintjs/core';

class Login extends Component{
    render (){
        return(
            <div className="o-log-or-reg">
                <div className="log-or-reg">
                    <Card interactive elevation={Elevation.TWO}>
                        <div>
                            <p> Enter Your Login Credentials.</p>
                        </div>
                        <Log />
                        <div>
                            <p>Do not have an account? <Link to="/register">Register</Link></p>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Login;
