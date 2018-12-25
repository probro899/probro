import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage, {Login,Registration} from './home';

class Home extends Component {
    render() {
        return(
            <Router>
                <div className="home-screen">
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Registration}/>
                </div>
            </Router>
        );
    }
}

export default Home;
