import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import login from './home/auth/index';
class Index extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Route exact path="/login" component={login} />
                </div>
            </Router>
        );
    }
}

export default Index;
