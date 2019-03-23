import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './home';
import Login from './home/auth/login';
import Registration from './home/auth/registration';
import BroHome from './users/bro';

export default () => (
  <Router>
    <div className="home-screen">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Registration} />
      <Route exact path="/:id/me" component={BroHome} />
    </div>
  </Router>
);
