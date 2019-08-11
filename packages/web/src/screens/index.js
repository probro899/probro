import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './home';
import Login from './home/auth/login';
import Registration from './home/auth/registration';
import { BroHome, ClassManager } from './users/bro';
import Forgot from './home/auth/forgot-password';
import Reset from './home/auth/change-password';
import { CreateBlog } from './users/pro/blog';
import EmailVerification from './home/auth/email-verification';
// import { Communication } from '../common';
import { Archive } from './users/components';
import { PublicProfile } from './home/component';
import Communication from './users/components/communication';

export default () => (
  <Router>
    <div>
      <div className="home-screen">
        <Switch>
          <Route exact path="/archive" component={Archive} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/forgot-password" component={Forgot} />
          <Route path="/class-work/:id/:classId" component={ClassManager} />
          <Route path="/write-blog/:id" component={CreateBlog} />
          <Route path="/reset/:token" component={Reset} />
          <Route path="/email-verification/:token" component={EmailVerification} />
          <Route path="/user/:userId" component={PublicProfile} />
          <Route path="/:id" component={BroHome} />
          <Route exact path="/" component={HomePage} />
        </Switch>
        {/* <Communication /> */}
        <Communication />
      </div>
    </div>
  </Router>
);
