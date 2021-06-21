import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SectionNavigation from './SectionNavigation';
import About from './About';
import Instructors from './Instructors';
import Syllabus from './Syllabus';
import Reviews from './Reviews';

const Contents = ({ match, apis, course, enrolled }) => {
  const { path } = match;
  return (
    <>
      <SectionNavigation match={match} />
      <Switch>
        <Route exact path={`${path}/about`}><About course={course} /></Route>
        <Route exact path={`${path}/instructors`}><Instructors creator={course.creator} /></Route>
        <Route exact path={`${path}/syllabus`}><Syllabus course={course} /></Route>
        <Route exact path={`${path}/reviews`}><Reviews course={course} apis={apis} enrolled={enrolled} /></Route>
      </Switch>
    </>
  );
};

export default Contents;
