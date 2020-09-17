import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import HomePage from './home/landing-page';
import { Login, Registration } from './auth';
import DashBoard from './dashboard';
import ClassManager from './class';
import Forget from './auth/forgot-password';
import Reset from './auth/change-password';
import { CreateBlog, PublicBlog } from './blog';
import EmailVerification from './auth/email-verification';
import Communication from '../common/communication';
import Archive from './blog/archive';
import { PublicProfile } from './home/component';
import { SearchResult } from './home/component/search';
import TakeTour from './home/take-a-tour';
import { About, Privacy, Terms, Support, Career, Report, Business, Services } from '../common/footer/footer-links';
import NotifyBar from '../common/NotifyBar';
import ClassTemplate from './class/template';
import SfuTest from './test/SFU/index';
import ErrorPage from '../common/ErrorPage';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user, popNotification, updateNav } = this.props;
    return (
      <Switch>
        <div className="home-screen">
          {popNotification.active && <NotifyBar onClose={() => updateNav({ schema: 'popNotification', data: { message: '', active: false, intent: '' } })} message={popNotification.message} intent={popNotification.intent} />}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/test" component={SfuTest} />
            <Route exact path="/error" component={ErrorPage} />
            <Route exact path="/about" component={About} />
            <Route exact path="/privacy-policy" component={Privacy} />
            <Route exact path="/terms-and-conditions" component={Terms} />
            <Route path="/search" component={SearchResult} />
            <Route exact path="/support" component={Support} />
            <Route exact path="/career" component={Career} />
            <Route exact path="/report" component={Report} />
            <Route exact path="/business" component={Business} />
            <Route exact path="/services" component={Services} />
            <Route exact path="/archive" component={Archive} />
            <Route exact path="/take-a-tour" component={TakeTour} />
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Registration} />
            <Route path="/forgot-password" component={Forget} />
            <Route path="/class-work/:userSlug/:classId" component={ClassManager} />
            <Route path="/class-template/:userSlug/:classId" component={ClassTemplate} />
            <Route path="/edit-blog/:id/:blogId" component={CreateBlog} />
            <Route path="/create-blog/:id" component={CreateBlog} />
            <Route exact path="/reset/:token" component={Reset} />
            <Route exact path="/email-verification/:token" component={EmailVerification} />
            <Route path="/blog/:userSlug/:blogSlug" component={PublicBlog} />
            <Route path="/user/:userId" component={PublicProfile} />
            <Route path="/dashboard/:id" component={DashBoard} />
            <Redirect to="/error" />
          </Switch>
          {user && <Communication />}
        </div>
      </Switch>
    );
  }
}

const mapStateToProps = ({ account, navigate }) => {
  return { user: account.user, popNotification: navigate.popNotification };
};

MainScreen.defaultProps = {
  user: null,
};

MainScreen.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  popNotification: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { ...actions })(MainScreen);
