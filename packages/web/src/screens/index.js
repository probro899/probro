import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './home/auth/login';
import Registration from './home/auth/registration';
class Index extends Component {
    render() {
        return(
            <Router>
                <div className="screen-home">
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Registration}/>
                </div>
            </Router>
        );
    }
}

export default Index;
