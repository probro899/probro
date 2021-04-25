import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SectionNavigation from './SectionNavigation';
import About from './About';
import Instructors from './Instructors';
import Syllabus from './Syllabus';
import Reviews from './Reviews';

const Contents = ({ match }) => {
    return (
        <>
            <SectionNavigation match={match} />
            <Switch>
                <Route exact path={`${match.path}/about`}><About /></Route>
                <Route exact path={`${match.path}/instructors`}><Instructors /></Route>
                <Route exact path={`${match.path}/syllabus`}><Syllabus /></Route>
                <Route exact path={`${match.path}/reviews`}><Reviews /></Route>
            </Switch>
        </>
    )
}

export default Contents;
