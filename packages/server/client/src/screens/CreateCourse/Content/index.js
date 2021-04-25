import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import AboutCourse from './About';
import Syllabus from './Syllabus';
import Pricing from './Pricing';
import client from '../../../socket';
import { Spinner } from '../../../common';

const Content = ({ pathObj, changePath }) => {
    const [apis, setApis] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        (async () => {
            const apis = await client.scope('Mentee');
            setApis({ apis });
            setLoading(false);
        })();
    }, []);

    if (loading) return <Spinner />;
    return (
        <Switch>
            <Route path={`${pathObj.path}/about`}><AboutCourse changePath={changePath} courseId={pathObj.courseId} apis={apis.apis} /></Route>
            <Route path={`${pathObj.path}/syllabus`}><Syllabus courseId={pathObj.courseId} apis={apis.apis} /></Route>
            <Route path={`${pathObj.path}/pricing`}><Pricing courseId={pathObj.courseId} apis={apis.apis} /></Route>
        </Switch>
    )
}

export default Content;
