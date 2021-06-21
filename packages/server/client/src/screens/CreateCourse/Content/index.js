import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AboutCourse from './About';
import Syllabus from './Syllabus';
import Pricing from './Pricing';
import { Spinner } from '../../../common';
import Project from './Project';
import Performance from './Performance';
import Reviews from './Reviews';
import Overview from './Overview';

const Content = ({ pathObj, changePath, apis }) => {
  if (!apis) return <Spinner />;
  const { path, courseId } = pathObj;
  return (
    <Switch>
      <Route path={`${path}/overview`}><Overview courseId={courseId} apis={apis.apis} /></Route>
      <Route path={`${path}/students`}><Performance courseId={courseId} apis={apis.apis} /></Route>
      <Route path={`${path}/reviews`}><Reviews courseId={courseId} apis={apis.apis} /></Route>
      <Route path={`${path}/about`}><AboutCourse changePath={changePath} courseId={courseId} apis={apis.apis} /></Route>
      <Route path={`${path}/syllabus`}><Syllabus courseId={courseId} apis={apis.apis} /></Route>
      <Route path={`${path}/pricing`}><Pricing courseId={courseId} apis={apis.apis} /></Route>
      <Route path={`${path}/project`}><Project courseId={courseId} apis={apis.apis} /></Route>
    </Switch>
  );
};

export default Content;
