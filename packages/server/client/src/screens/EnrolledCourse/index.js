import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';
import client from '../../socket';
import { Navbar } from '../home/component';
import { ContentDisplay, ContentDashboard } from './content';
import { Spinner } from '../../common';
import CourseNavigation from './sidebar/CourseNavigation';

class EnrolledCourse extends React.Component {
    state = { loading: true, screenWidth: window.innerWidth, course: {}, apis: null, activeLecture: {} };

    componentDidMount() {
      window.addEventListener('resize', this.screenResize);
      this.getApi();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.screenResize);
    }

    screenResize = _.debounce(() => {
      this.setState({ screenWidth: window.innerWidth });
    }, 500)

    getCourseData = async (apis) => {
        const { match } = this.props;
        let lectureId = new URLSearchParams(this.props.location.search).get("lecture");
        let activeLecture = null;
        const res = await apis.getCourseDetails({ courseId: parseInt(match.params.courseSlug, 10) });
        let sections = res.allSections.map(section => {
            return {
                ...section, lectures: res.allLectures.filter(o => o.sectionId === section.id).map(lecture => {
                    if (lectureId && parseInt(lectureId, 10) === lecture.id) activeLecture = lecture;
                    return { ...lecture, history: res.courseCompleteHistory.find(o => o.lectureId === lecture.id) };
                })
            }
        })
        sections = sections.filter(o => o.lectures.length !== 0)
        if (!activeLecture) activeLecture = sections[0].lectures[0];
        this.setState({ course: { ...res.course, courseSection: sections }, activeLecture, loading: false });
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        const { account } = this.props;
        if (account.user !== prevProps.account.user) this.getApi();
        return null;
    }

    getApi = async () => {
        const { account, match } = this.props;
        const { apis } = this.state;
        if (!apis && account.user) {
            const apis = await client.scope('Mentee');
            this.setState({ apis });
            this.getCourseData(apis);
        }
    }

    changeUrl = (lectureId) => {
        const { match, history } = this.props;
        const newUrl = `${match.url}?lecture=${lectureId}`;
        history.replace(newUrl, { isActive: true });
    }

    switchLecture = (sectionId, lectureId) => {
        const { course } = this.state;
        const lecture = course.courseSection.find(o => o.id === sectionId).lectures.find(o => o.id === lectureId);
        this.setState({ activeLecture: lecture });
        this.changeUrl(lectureId);
    }

    toggleLectureCompletion = async (sectionId, lectureId, history) => {
        const { apis, course } = this.state;
        const { account } = this.props;
        let res = null;
        let historyObj = null;
        if (!history) {
            historyObj = { userId: account.user.id, courseId: course.id, lectureId: lectureId, status: 'completed' };
            res = await apis.addCourseCompleteHistory(historyObj);
        } else {
            res = await apis.updateCourseCompleteHistory([{ status: history.status === 'completed' ? 'incomplete' : 'completed' }, { id: history.id }]);
        }
        this.setState({
            course: {
                ...course,
                courseSection: course.courseSection.map(section => {
                    if (section.id === sectionId) {
                        return {
                            ...section, lectures: section.lectures.map(lecture => {
                                if (lecture.id === lectureId) {
                                    if (!history) {
                                        return { ...lecture, history: { ...historyObj, id: res } };
                                    } else {
                                        return { ...lecture, history: { ...lecture.history, status: history.status === 'completed' ? 'incomplete' : 'completed' } };
                                    }
                                }
                                return lecture;
                            })
                        }
                    }
                    return section;
                }),
            },
        });
    }

    changeLecture = (type) => {
        const { course, activeLecture } = this.state;
        if (type === 'prev') {
            for (let i = 0; i < course.courseSection.length; i++) {
                if (course.courseSection[i].id === activeLecture.sectionId) {
                    for (let j = 0; j < course.courseSection[i].lectures.length; j++) {
                        const lecture = course.courseSection[i].lectures[j];
                        if (activeLecture.id === lecture.id) {
                            let al = null;
                            if (j < 1) {
                                al = course.courseSection[i - 1].lectures[course.courseSection[i - 1].lectures.length - 1];
                            } else {
                                al = course.courseSection[i].lectures[j - 1];
                            }
                            this.setState({ activeLecture: al });
                            this.changeUrl(al.id);
                            return;
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < course.courseSection.length; i++) {
                if (course.courseSection[i].id === activeLecture.sectionId) {
                    for (let j = 0; j < course.courseSection[i].lectures.length; j++) {
                        const lecture = course.courseSection[i].lectures[j];
                        if (activeLecture.id === lecture.id) {
                            let al = null;
                            if (j === course.courseSection[i].lectures.length - 1) {
                                al = course.courseSection[i + 1].lectures[0];
                            } else {
                                al = course.courseSection[i].lectures[j + 1];
                            }
                            this.setState({ activeLecture: al });
                            this.changeUrl(al.id);
                            return;
                        }
                    }
                }
            }
        }
    }

    getNavigator = () => {
      const { course, activeLecture } = this.state;
      return (
        <CourseNavigation
          course={course}
          activeLecture={activeLecture}
          toggleLectureCompletion={this.toggleLectureCompletion}
          switchLecture={this.switchLecture}
        />
      )
    }

    render() {
        const { loading, course, activeLecture, screenWidth } = this.state;
        const { account } = this.props;
        if (!account.sessionId) return <Redirect to="/" />;
        if (loading) return <Spinner />;
        const lenSections = course.courseSection.length;
        const firstLecture = course.courseSection[0].lectures[0];
        const lastLecture = course.courseSection[lenSections - 1].lectures[course.courseSection[lenSections - 1].lectures.length - 1];
        return (
            <>
                <Navbar />
                <div className="enrolled-course-container">
                    <div className="course-content-column">

                        <div className="course-content-wrapper">
                            <div className="content-output">
                              <ContentDisplay
                                controlLectures={{ firstLecture, lastLecture }}
                                changeLecture={this.changeLecture}
                                lecture={activeLecture}
                              />
                            </div>
                            <div className="course-details">
                              <ContentDashboard
                                lecture={activeLecture}
                                course={course}
                                courseNavigator={screenWidth < 1200 && this.getNavigator()}
                              />
                            </div>
                        </div>
                        {
                          screenWidth > 1199 && (
                            <div className="course-sidebar">
                              <div className="sidebar-contents">{this.getNavigator()}</div>
                            </div>
                          )
                        }
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = ({ account }) => ({ account });
export default connect(mapStateToProps, { ...actions })(EnrolledCourse);
