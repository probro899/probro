import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import lazy from 'loadable-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import Toast from '../common/Toast';
import HomePage from './home/landing-page';
import ErrorPage from '../common/ErrorPage';
import TakeTour from './home/take-a-tour';
import Loader from '../common/spinner/index';

// import { Login, Registration } from './auth';
// import DashBoard from './dashboard';
// import ClassManager from './class';
// import Forget from './auth/forgot-password';
// import Reset from './auth/change-password';
// import PublicBlog from './blog/public-blog';
// import CreateBlog from './dashboard/blog/BlogCreate';
// import EmailVerification from './auth/email-verification';
// import Communication from '../communication';
// import Archive from './blog/archive';
// import { PublicProfile } from './home/component';
// import { SearchResult } from './home/component/search';
// import Pricing from './pricing';
// import OrganizationPublicView from './organization';
// import CoursesDetailView from './Courses';
// import CourseListView from './Courses/CourseListView';
// import CreateCourse from './CreateCourse';
// import EnrolledCourse from './EnrolledCourse';
// import { About, Privacy, Terms, Support, Career, Report, Business, Services } from '../common/footer/footer-links';
// import SfuTest from './test/SFU/index';

const SfuTest = lazy(() => import('./test/SFU/index'), { LoadingComponent: Loader });
// const HomePage = lazy(() => import('./home/landing-page'), { LoadingComponent: Loader });
const Communication = lazy(() => import('../communication'), { LoadingComponent: Loader });
const DashBoard = lazy(() => import('./dashboard'), { LoadingComponent: Loader });
const Login = lazy(() => import('./auth/login'), { LoadingComponent: Loader });
const Registration = lazy(() => import('./auth/registration'), { LoadingComponent: Loader });
const Forget = lazy(() => import('./auth/forgot-password'), { LoadingComponent: Loader });
const Reset = lazy(() => import('./auth/change-password'), { LoadingComponent: Loader });
const EmailVerification = lazy(() => import('./auth/email-verification'), { LoadingComponent: Loader });
const ClassManager = lazy(() => import('./class'), { LoadingComponent: Loader });
const CreateBlog = lazy(() => import('./dashboard/blog/BlogCreate'), { LoadingComponent: Loader });
const PublicBlog = lazy(() => import('./blog/public-blog'), { LoadingComponent: Loader });
const Archive = lazy(() => import('./blog/archive'), { LoadingComponent: Loader });
const PublicProfile = lazy(() => import('./home/component/public-profile'), { LoadingComponent: Loader });
const SearchResult = lazy(() => import('./home/component/search/SearchResult'), { LoadingComponent: Loader });
// const NotifyBar = lazy(() => import('../common/NotifyBar'), { LoadingComponent: Loader });
const Pricing = lazy(() => import('../screens/pricing'), { LoadingComponent: Loader });
const OrganizationPublicView = lazy(() => import('./organization'), { LoadingComponent: Loader });
const CoursesDetailView = lazy(() => import('./Courses'), { LoadingComponent: Loader });
const CourseListView = lazy(() => import('./Courses/CourseListView'), { LoadingComponent: Loader });
const CreateCourse = lazy(() => import('./CreateCourse'), { LoadingComponent: Loader });
const EnrolledCourse = lazy(() => import('./EnrolledCourse'), { LoadingComponent: Loader });
const About = lazy(() => import('../common/footer/footer-links/About'), { LoadingComponent: Loader });
const Privacy = lazy(() => import('../common/footer/footer-links/Privacy'), { LoadingComponent: Loader });
const Terms = lazy(() => import('../common/footer/footer-links/Terms'), { LoadingComponent: Loader });
const Support = lazy(() => import('../common/footer/footer-links/Support'), { LoadingComponent: Loader });
const Career = lazy(() => import('../common/footer/footer-links/Career'), { LoadingComponent: Loader });
const Report = lazy(() => import('../common/footer/footer-links/Report'), { LoadingComponent: Loader });
const Business = lazy(() => import('../common/footer/footer-links/Business'), { LoadingComponent: Loader });
const Services = lazy(() => import('../common/footer/footer-links/Services'), { LoadingComponent: Loader });

const ScrollTop = ({ history, children }) => {
  useEffect(() => {
    const unlisten = history.listen(() => window.scrollTo(0, 0));
    return () => unlisten();
  }, []);

  return <>{children}</>;
};

const MainScreen = (props) => {
  const { user, popNotification, updateNav, history } = props;
  return (
    <ScrollTop history={history}>
      <React.StrictMode>
        <Switch>
          <div className="home-screen">
            <Toast
              isOpen={popNotification.active}
              onClose={() => updateNav({ schema: 'popNotification', data: { message: '', active: false, intent: '' } })}
              message={popNotification.message}
              intent={popNotification.intent}
              position="top"
            />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/test" component={SfuTest} />
              <Route exact path="/error" component={ErrorPage} />
              <Route exact path="/about" component={About} />
              <Route exact path="/privacy-policy" component={Privacy} />
              <Route exact path="/terms-and-conditions" component={Terms} />
              <Route exact path="/search" component={SearchResult} />
              <Route exact path="/support" component={Support} />
              <Route exact path="/career" component={Career} />
              <Route exact path="/report" component={Report} />
              <Route exact path="/business" component={Business} />
              <Route exact path="/services" component={Services} />
              <Route exact path="/archive" component={Archive} />
              <Route exact path="/take-a-tour" component={TakeTour} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Registration} />
              <Route exact path="/forgot-password" component={Forget} />
              <Route path="/classroom/:userSlug/:classId" component={ClassManager} />
              {/* blog paths */}
              <Route path="/edit-blog/:id/:blogId" component={CreateBlog} />
              <Route path="/create-blog/:id" component={CreateBlog} />
              {/* course paths */}
              <Route path="/edit-course/:userId/:courseId" component={CreateCourse} />
              <Route path="/create-course/:userId" component={CreateCourse} />
              <Route exact path="/reset/:token" component={Reset} />
              <Route exact path="/email-verification/:token" component={EmailVerification} />
              <Route path="/blog/:userSlug/:blogSlug" component={PublicBlog} />
              <Route path="/user/:userId" component={PublicProfile} />
              <Route path="/dashboard/:id" component={DashBoard} />
              <Route exact path="/pricing" component={Pricing} />
              <Route exact path="/upgrade/organization/:orgId" component={Pricing} />
              <Route path="/organization/:orgId" component={OrganizationPublicView} />
              <Route path="/course/:courseSlug" component={CoursesDetailView} />
              <Route exact path="/courses" component={CourseListView} />
              <Route path="/enrolled/:courseSlug" component={EnrolledCourse} />
              <Redirect to="/error" />
            </Switch>
            {user && <Communication />}
          </div>
        </Switch>
      </React.StrictMode>
    </ScrollTop>
  );
};

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
