import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage, { Login, Registration } from './home';

export default () => (
  <Router>
    <div className="home-screen">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Registration} />
    </div>
  </Router>
);
