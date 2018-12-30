import React, { Component } from 'react';
import Register from './registration';
import { Card,Elevation } from '@blueprintjs/core';

class Registration extends Component{
    render(){
        return(
            <div className="o-log-or-reg">
                <div className="log-or-reg">
                    <Card interactive elevation={Elevation.TWO}>
                        <div>
                            <p> Enter Your Credentials.</p>
                        </div>
                        <Register />
                    </Card>
                </div>
            </div>
        );
    }
}

export default Registration;
