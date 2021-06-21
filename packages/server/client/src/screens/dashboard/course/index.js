import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import EnrolledCourseCard from './EnrolledCourseCard';
import SectionHeader from './SectionHeader';
import CourseCard from './CourseCard';
import { Button } from '../../../common/utility-functions/Button/Button';
import { DeletePopOver } from '../../../common';
import NotFound from '../../../common/NotFound';
import client from '../../../socket';

class Courses extends React.Component {
  state = { apis: {}, courseEditId: null, courseDeleteId: null, deletePopoverOpen: false };

  async componentDidMount() {
    const { updateNav } = this.props;
    const apis = await client.scope('Mentee');
    this.setState({ apis });
    updateNav({ schema: 'sideNav', data: { name: 'Courses' } });
    await apis.getUserCourse();
  }

  deleteCourse = async (type) => {
    const { apis, courseDeleteId } = this.state;
    const { deleteDatabaseSchema } = this.props;
    if (type === 'confirm') {
      await apis.deleteCourse({ id: courseDeleteId });
      this.setState({ deletePopoverOpen: false, courseDeleteId: null });
      deleteDatabaseSchema('Course', { id: courseDeleteId });
      return;
    }
    this.setState({ deletePopoverOpen: false, courseDeleteId: null });
  }

  onMore = (type, id) => {
    if (type === 'delete') {
      this.setState({ courseDeleteId: id, deletePopoverOpen: true });
    } else if (type === 'edit') {
      this.setState({ courseEditId: id });
    }
  }

  render() {
    const { match, database, account } = this.props;
    const { courseEditId, deletePopoverOpen, courseDeleteId } = this.state;
    if (courseEditId) return <Redirect push to={`/edit-course/${account.user.slug}/${courseEditId}/about`} />;
    const enrolledCourses = Object.values(database.Course.byId).filter(o => o.enrollDetails && o.enrollDetails.userId === account.user.id);
    const courses = Object.values(database.Course.byId).filter(o => o.deleteStatus !== 1 && account.user.id === o.createdBy);
    const userDetail = Object.values(database.UserDetail.byId).find(o=>o.userId===account.user.id) || {};
    return (
      <div className="bro-right courses">
        <DeletePopOver
          isOpen={deletePopoverOpen}
          action={this.deleteCourse}
          name={courseDeleteId ? database.Course.byId[courseDeleteId].title : ''}
        />
        <div className="courses-wrapper">
          <div className="header">
            <div>
              <span className="title">Courses </span>
              <small>Manage your courses here</small>
            </div>
            {
              userDetail.type === 'mentor' && (
                <Link to={`/create-course/${match.params.id}/about`}>
                  <Button
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--small"
                    title="Create Course"
                  />
                </Link>
              )
            }
          </div>
          <SectionHeader title="Enrolled Courses" />
          <div className="courses-container">
            {enrolledCourses.length ? enrolledCourses.map((course) => <EnrolledCourseCard course={course} key={`enrolled-${course.id}`} />) : <div className="no-course">
              <NotFound message="You have not enrolled in any course." />
            </div>}
          </div>
          {
            userDetail.type === 'mentor' && (
              <>
                <SectionHeader title="My Courses" />
                <div className="courses-container">
                  {
                    courses.length ? courses.map((course) => <CourseCard onMore={this.onMore} course={course} key={`c-${course.id}`} />)
                      : (<div className="no-course">
                        <p className="no-course__title">You haven't created any course. Create one?</p>
                      </div>
                    )
                  }
                </div>
              </>
            )
          }
          {/* <div className="load-more-btn">
            <Button
              type="button"
              buttonStyle="btn--primary--outline"
              buttonSize="btn--small"
              title="Load More"
            />
          </div> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { ...actions })(Courses);