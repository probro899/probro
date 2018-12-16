import React, { Component } from 'react';
import { FormGroup, Button, Intent, Card, Elevation } from '@blueprintjs/core';

class Log extends Component {
    render() {
        return(
            <div className="login-box">
                <FormGroup>
                    <input
                        className="bp3-input bp3-large bp3-fill"
                        placeholder="User Name"
                    />
                    <input
                        className="bp3-input bp3-large bp3-fill"
                        type="password"
                        placeholder="Password"
                    />
                    <Button 
                    type="submit" className="bp3-large" intent={Intent.PRIMARY} fill 
                    >Login</Button>
                </FormGroup>
            </div>
        );
    }
}
export default Log;
