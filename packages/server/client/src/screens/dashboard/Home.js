import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Navbar } from '../home/component';
import Profile from './profile';
import Setting from './setting';
import DrawingBoard from './drawing-board';
import Connection from './connection';
import Class from '../class/Class';
import Appointment from './appointment';
import Blog from './blog';
import { Spinner } from '../../common';
import OrganizationDashboard from './organizationDashboard';
import Courses from './course';
import SmallScreenSideNav from './sidenav/SmallScreenSideNav';
import SideNav from './sidenav';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { account, match } = this.props;

    if (!account.sessionId) return <Redirect to="/" />;
    if (!account.user) return <Spinner />;
    if (account.user.slug !== match.params.id) return <Redirect to="/" />;
    return (
      <>
        <Navbar />
        <div className="broWrapper">
          <SmallScreenSideNav match={match} />
          <SideNav match={match} />
          <Switch>
            <Route exact path={`${match.path}`} component={Profile} />
            <Route exact path={`${match.path}/classes`} component={Class} />
            <Route exact path={`${match.path}/blog`} component={Blog} />
            <Route exact path={`${match.path}/courses`} component={Courses} />
            <Route exact path={`${match.path}/settings/basic`} component={Setting} />
            <Route exact path={`${match.path}/settings/advanced`} component={Setting} />
            <Route exact path={`${match.path}/drawing-board`} component={DrawingBoard} />
            <Route exact path={`${match.path}/connection`} component={Connection} />
            <Route exact path={`${match.path}/appointment`} component={Appointment} />
            <Route path={`${match.path}/organization/:orgId`} component={OrganizationDashboard} />
            <Redirect to="/error" />
          </Switch>
        </div>
      </>
    );
  }
}

HomePage.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps)(HomePage);
