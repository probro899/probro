import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default (
  <Switch>
    {/* <Route path="/details/:proId" schema="ServiceTypeBrandModel" schemaField={{ proId: 'slug' }} /> */}
    <Route exact path="/" />
    <Route exact path="/test" />
    <Route exact path="/error" />
    <Route exact path="/about" />
    <Route exact path="/privacy-policy" />
    <Route exact path="/terms-and-conditions" />
    <Route exact path="/search" />
    <Route exact path="/support" />
    <Route exact path="/career" />
    <Route exact path="/report" />
    <Route exact path="/business" />
    <Route exact path="/services" />
    <Route exact path="/archive" />
    <Route exact path="/take-a-tour" />
    <Route exact path="/login" />
    <Route exact path="/register" />
    <Route exact path="/forgot-password" />
    <Route exact path="/pricing" />
    <Route exact path="/courses" />

    {/* dynamic */}
    <Route path="/blog/:userSlug/:blogSlug" schema="Blog" />
    <Route path="/user/:userId" schema="User" />
    <Route path="/organization/:orgId" schema="Organization" />
    <Route path="/course/:courseId/:topic" schema="Course" />
  </Switch>
);
