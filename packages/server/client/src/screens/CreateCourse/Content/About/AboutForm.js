import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateNav } from '../../../../actions';
import updateCourse from '../../../../actions/courseAction';
import { Editor, Spinner } from '../../../../common';
import { FormTextInput } from '../../../../common/Form/FormTextInput';
import { FormSelectField } from '../../../../common/Form/FormSelectField';
import FormFileInput from '../../../../common/FormFileInput';
import Taginput from '../../../../common/Taginput';
import { uploadFile } from '../../../../common/utility-functions';
import { courseDomainConstant, courseSubDomainConstant, courseLevelConstant } from '../../../../constants/courseConstants';
import animateProgress from '../../../../common/utility-functions/animateProgress';

class AboutForm extends React.Component {
  state = { error: false, loading: false };

  async componentDidMount() {
    const { courseId, apis, setAlert, updateCourse } = this.props;
    if (courseId) {
      this.setState({ loading: true });
      const res = await apis.getCourseDetails({ courseId: parseInt(courseId, 10) });
      const { title, subTitle, description, level, domain, subDomain, skill, logo, status } = res.course;
      if (status === 'review') {
        setAlert({ showAlert: true, status: 'info', message: 'This course is under review. You will be notified once it is reviewed. Thank you for your patience.' });
      }
      updateCourse({ courseId: parseInt(courseId, 10), status, title, subTitle, level, domain, description, subDomain, logo: { name: logo || '' }, skill: JSON.parse(skill) || [] });
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    this.autoSave.cancel();
  }

  uploadLogo = async (id, value) => {
    const { account, course, updateCourse, updateNav, apis, setAlert } = this.props;
    const { title, courseId } = course;
    if (title.trim().length === 0) {
      setAlert({ showAlert: true, message: 'Title of the course can not be empty. Please add the title first!', status: 'danger' })
      this.setState({ error: true });
      return;
    }
    updateCourse({ [id]: value });
    animateProgress('start', updateNav);
    try {
      const res = await uploadFile('course', value, account.sessionId);
      if (res.status === 200) {
        await apis.updateCourse([{ 'logo': res.data }, { id: courseId }]);
        updateCourse({ logo: { name: res.data } });
        animateProgress('end', updateNav);
      }
    } catch (e) {
      console.info('Error', e);
    }
  }

  autoSave = _.debounce((id) => {
    this.saveCourse(id);
  }, 1000);

  saveCourse = async (id) => {
    const { error } = this.state;
    const { apis, account, updateNav, course, changePath, setAlert } = this.props;
    const { title, courseId } = course;
    if (id === 'title') {
      if (title.trim().length === 0) {
        setAlert({ showAlert: true, message: 'Title of the course can not be empty. Please add the title first!', status: 'danger' })
        this.setState({ error: true });
        return;
      }
      if (error) {
        setAlert({ showAlert: false, message: '' });
        this.setState({ error: false });
      }
    }
    animateProgress('start', updateNav);
    if (courseId) {
      let value = course[id];
      if (id === 'skill') value = JSON.stringify(value);
      const res = await apis.updateCourse([{ [id]: value }, { id: courseId }]);
      if (res) animateProgress('end', updateNav);
      return;
    }
    const res = await apis.addCourse({ createdBy: account.user.id, [id]: course[id] });
    if (res) {
      animateProgress('end', updateNav);
      updateCourse({ courseId: res });
      changePath({ path: `/edit-course/${account.user.slug}/${res}`, courseId: res });
    }
  }

  onChange = (id, value) => {
    const { setAlert, course, updateCourse } = this.props;
    const { title } = course;
    if (id !== 'title' && title.trim().length === 0) {
      setAlert({ showAlert: true, message: 'Title of the course can not be empty. Add the title first', status: 'danger' })
      return;
    }
    updateCourse({ [id]: value });
    this.autoSave(id);
  }

  render() {
    const { loading, error } = this.state;
    const { title, subTitle, description, level, logo, domain, subDomain, skill } = this.props.course;
    if (loading) return <Spinner />;
    return (
      <>
        <div className="form-group">
          <FormTextInput label="Course title" name="title" value={title} placeholder="Insert your course title." hasError={error} onChange={(e) => this.onChange('title', e.target.value)} />
        </div>
        <div className="form-group">
          <FormFileInput data={{ name: 'Logo', id: 'logo' }} value={logo} onChange={this.uploadLogo} />
        </div>
        <div className="form-group">
          <FormTextInput label="Course Subtitle" name="subTitle" value={subTitle} placeholder="Insert your course subtitle." onChange={(e) => this.onChange('subTitle', e.target.value)} />
        </div>
        <div className="form-group">
          <Editor label="Course Description" id="description" value={description} name="description" onChange={this.onChange} />
        </div>
        <div className="basic-info-wrapper">
          <p>Basic info</p>
          <div className="course-basic-form">
            <div className="form-group">
              <FormSelectField
                options={[{ label: '-- Select Level --', value: '' }, ...Object.values(courseLevelConstant)]}
                onChange={(e) => this.onChange('level', e.target.value)}
                value={level}
              />
            </div>
            <div className="form-group">
              <FormSelectField
                options={[{ label: '-- Select Domain --', value: ''}, ...Object.values(courseDomainConstant)]}
                onChange={(e) => this.onChange('domain', e.target.value)}
                value={domain}
              />
            </div>
            <div className="form-group">
              <FormSelectField
                options={[{ label: '-- Select Subdomain --', value: ''}, ...Object.values(courseSubDomainConstant)]}
                onChange={(e) => this.onChange('subDomain', e.target.value)}
                value={subDomain}
              />
            </div>
          </div>
          <div className="skill-you-learn">
            <p>Skills you will learn</p>
            <div className="form-group">
              <Taginput data={{ id: 'skill', name: '' }} onChange={this.onChange} value={skill} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ account, course }) => ({ account, course });
export default connect(mapStateToProps, { updateNav, updateCourse })(AboutForm);
