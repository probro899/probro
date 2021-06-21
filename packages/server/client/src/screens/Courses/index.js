import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookie from '../../redux/account/cookies';
import client from '../../socket';
import clientQuery from '../../clientConfig';
import { GET_COURSE_DETAILS } from '../../queries';
import * as actions from '../../actions';
import { Navbar } from '../home/component';
import Footer from '../../common/footer';
import Cover from './Cover';
import Contents from './Contents';
import { Spinner } from '../../common';
import Card from '../../common/Card';
import CourseSidebar from './Contents/Sidebar';
import ReactHelmet from '../../common/react-helmet';
import EnrollSection from './Contents/Sidebar/EnrollSection';

class CoursesDetailView extends React.Component {
  state = { loading: true, course: {}, redirect: false, loginRedirect: false, apis: null };

  async componentDidMount() {
    const { match } = this.props;
    const sessionId = Cookie.get('pc-session');
    const res = await clientQuery.query({ query: GET_COURSE_DETAILS, variables: { courseId: parseInt(match.params.courseSlug, 10), sessionId }, fetchPolicy: 'network-only' });
    this.setState({ course: res.data.getCourseDetails, loading: false });
    this.getApi();
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { account } = this.props;
    if (account.user !== prevProps.account.user) {
      this.getApi();
    }
    return null;
  }

  getApi = async () => {
    const { account } = this.props;
    const { apis } = this.state;
    if (!apis && account.user) {
      const apis = await client.scope('Mentee');
      this.setState({ apis });
    }
  }

  checkEnrolled = () => {
    const { course } = this.state;
    return course.courseEnrollDetails && course.courseEnrollDetails.status === 'enrolled';
  }

  onEnroll = () => {
    const { account } = this.props;
    if (!account.user) {
      this.setState({ loginRedirect: true });
    } else {
      const enrolled = this.checkEnrolled();
      if (enrolled) this.setState({ redirect: true });
    }
  }

  render() {
    const { loading, apis, course, redirect, loginRedirect } = this.state;
    const { match, account } = this.props;
    if (redirect) return <Redirect to={`/enrolled/${course.id}`} />;
    if (loginRedirect) return <Redirect to="/login" />;
    if (loading) return <Spinner />;
    const enrolled = this.checkEnrolled();
    return (
      <>
        <ReactHelmet match={match} headerData={{ title: course.title, description: course.description.replace(/<[^>]+>/g, '').slice(0, 200) }} />
        <Navbar />
        <div className="pc-course-detail-page pc-container">
          <div className="pc-course-detail-page-wrap">
            <div className="pcc-right-section">
              <Cover course={course} />
              <Contents match={match} course={course} apis={apis} enrolled={enrolled} />
            </div>
            <CourseSidebar onEnroll={this.onEnroll} course={course} enrolled={enrolled} account={account} apis={apis} />
          </div>
        </div>
        <div className="mobile-only mobile-course-fixed">
          <Card>
            <EnrollSection
              course={course}
              onEnroll={this.onEnroll}
              enrolled={enrolled}
            />
          </Card>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = ({ account }) => ({ account });
export default connect(mapStateToProps, { ...actions })(CoursesDetailView);
