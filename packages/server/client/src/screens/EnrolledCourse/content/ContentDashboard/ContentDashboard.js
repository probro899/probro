import React from 'react';
import { Route, Switch } from 'react-router';
import DashboardNavigation from './DashboardNavigation';
import Overview from './Overview';
import ContentContainer from './ContentContainer';

const ContentDashboard = () => {
    return (
        <>
            <DashboardNavigation />
            <Switch>
                <Route exact path="/enrolled/overview" >
                    <ContentContainer >
                        <Overview />
                    </ContentContainer>
                </Route>
                <Route exact path="/enrolled" >
                    <ContentContainer >
                        <Overview />
                    </ContentContainer>
                </Route>
            </Switch>
        </>
    )
}

export default ContentDashboard;
