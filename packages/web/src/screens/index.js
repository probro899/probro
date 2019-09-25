import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './home';
import Login from './home/auth/login';
import Registration from './home/auth/registration';
import { BroHome, ClassManager } from './users/bro';
import Forgot from './home/auth/forgot-password';
import Reset from './home/auth/change-password';
import { CreateBlog, PublicBlog } from './users/pro/blog';
import EmailVerification from './home/auth/email-verification';
import { Communication } from '../common';
// import Communication from './users/components/communication';
import { Archive } from './users/components';
import { PublicProfile } from './home/component';
import { SearchResult } from './home/component/search';
import TakeTour from './home/take-a-tour';

export default () => (
  <Router>
    <div className="home-screen">
      <Switch>
        <Route exact path="/archive" component={Archive} />
        <Route exact path="/take-a-tour" component={TakeTour} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/forgot-password" component={Forgot} />
        <Route path="/class-work/:id/:classId" component={ClassManager} />
        <Route path="/edit-blog/:id/:blogId" component={CreateBlog} />
        <Route path="/create-blog/:id" component={CreateBlog} />
        <Route exact path="/reset/:token" component={Reset} />
        <Route exact path="/email-verification/:token" component={EmailVerification} />
        <Route path="/archive/:blogId/:userId" component={PublicBlog} />
        <Route path="/user/:userId" component={PublicProfile} />
        <Route path="/search/key=:searchKey" component={SearchResult} />
        <Route path="/:id" component={BroHome} />
        <Route exact path="/" component={HomePage} />
      </Switch>
      <Communication />
    </div>
  </Router>
);
