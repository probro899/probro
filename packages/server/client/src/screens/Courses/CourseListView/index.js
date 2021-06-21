import React from 'react';
import { connect } from 'react-redux';
import cookies from '../../../redux/account/cookies';
import clientConfig from '../../../clientConfig';
import { GET_COURSE, COURSE_SEARCH } from '../../../queries';
import * as actions from '../../../actions';
import { Navbar } from '../../home/component';
import Footer from '../../../common/footer';
import animateProgress from '../../../common/utility-functions/animateProgress';
import CourseCard from '../../dashboard/course/CourseCard';
import SectionHeader from '../../dashboard/course/SectionHeader';
import HeaderBanner from '../../../common/HeaderBanner';
import { Spinner } from '../../../common';
import SearchBox from './SearchBox';
import { getUrlParams, setUrlParams } from '../../../common/utility-functions/getSetUrlParams';
import ReactHelmet from '../../../common/react-helmet';
import NotFound from '../../../common/NotFound';

class CourseListView extends React.Component {
  constructor(props) {
    super(props);
    const params = getUrlParams();
    this.state = { searchKey: params.search || '', loading: true, courses: [] };
  }

  async componentDidMount() {
    const { updateNav } = this.props;
    const { searchKey } = this.state;
    updateNav({ schema: 'mainNav', data: { name: 'courses' } });
    if (searchKey) {
      await this.searchCourses(searchKey);
    } else {
      await this.getCoursesInitial();
    }
    this.setState({ loading: false });
  }

  getCoursesInitial = async () => {
    const sessionId = cookies.get('pc-session');
    const res = await clientConfig.query({ query: GET_COURSE, variables: { sessionId }, fetchPolicy: 'network-only' });
    this.setState({ courses: res.data.getCourse || [] });
  }

  searchCourses = async (searchKey) => {
    const sessionId = cookies.get('pc-session');
    const { updateNav } = this.props;
    animateProgress('start', updateNav);
    const res = await clientConfig.query({ query: COURSE_SEARCH, variables: { sessionId, keyword: searchKey }, fetchPolicy: 'network-only' });
    animateProgress('end', updateNav);
    this.setState({ courses: res.data.courseSearch || [] });
  }

  keyChange = (val) => {
    this.setState({ searchKey: val });
    setUrlParams({ search: val.trim() });
    if (val.trim()) {
      this.searchCourses(val.trim());
    }
  }

  render() {
    const { loading, courses, searchKey } = this.state;
    if (loading) return <Spinner wClass="spinner-wrapper" />;
    return (
      <>
        <ReactHelmet {...this.props} />
        <Navbar />
        <HeaderBanner title="Start Learning Today" subTitle="Join Proper Class to watch, play, learn, make, and discover." bgColor="#0f2e54" />
        <div className="course-list-view pc-container">
          <SearchBox onChange={this.keyChange} searchKey={searchKey} />
          <SectionHeader title="Top Courses" />
          <div className="courses-container">
            {courses.length ? courses.map((course) => <CourseCard publicListing key={`cor-${course.id}`} course={course} />) : <NotFound />}
          </div>
          {/* <div className="load-more-btn">
            <Button type="button" buttonStyle="btn--primary--outline" buttonSize="btn--small" title="Load More" />
          </div> */}
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(CourseListView);
