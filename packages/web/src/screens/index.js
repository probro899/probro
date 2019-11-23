import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './home';
import { Login, Registration } from './auth';
import DashBoard from './dashboard/Home';
import ClassManager from './class/ClassManager';
import Forget from './auth/forgot-password';
import Reset from './auth/change-password';
import { CreateBlog, PublicBlog } from './blog';
import EmailVerification from './auth/email-verification';
import { Communication } from '../common';
import Archive from './blog/archive';
import { PublicProfile } from './home/component';
import { SearchResult } from './home/component/search';
import TakeTour from './home/take-a-tour';
import { About } from '../common/footer/footer-links';

export default () => (
  <Router>
    <div className="home-screen">
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/archive" component={Archive} />
        <Route exact path="/take-a-tour" component={TakeTour} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/forgot-password" component={Forget} />
        <Route path="/class-work/:id/:classId" component={ClassManager} />
        <Route path="/edit-blog/:id/:blogId" component={CreateBlog} />
        <Route path="/create-blog/:id" component={CreateBlog} />
        <Route exact path="/reset/:token" component={Reset} />
        <Route exact path="/email-verification/:token" component={EmailVerification} />
        <Route path="/archive/:blogId/:userId" component={PublicBlog} />
        <Route path="/user/:userId" component={PublicProfile} />
        <Route path="/search/key=:searchKey" component={SearchResult} />
        <Route path="/:id" component={DashBoard} />
        <Route exact path="/" component={HomePage} />
      </Switch>
      <Communication />
    </div>
  </Router>
);
