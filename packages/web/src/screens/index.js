import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './home';
import Login from './home/auth/login';
import Registration from './home/auth/registration';
import { BroHome, ClassManager } from './users/bro';
import Forgot from './home/auth/forgot-password';
import Reset from './home/auth/change-password';
import { CreateBlog } from './users/pro/blog';
import EmailVerification from './home/auth/email-verification';
import { Communication } from '../common';

export default () => (
  <Router>
    <div className="home-screen">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Registration} />
      <Route exact path="/:id/me" component={BroHome} />
      <Route exact path="/write-blog/:id" component={CreateBlog} />
      <Route exact path="/class-work/:id/:classId" component={ClassManager} />
      <Route exact path="/forgot-password" component={Forgot} />
      <Route exact path="/email-verification/:token" component={EmailVerification} />
      <Route exact path="/reset/:token" component={Reset} />
      <Communication />
    </div>
  </Router>
);
