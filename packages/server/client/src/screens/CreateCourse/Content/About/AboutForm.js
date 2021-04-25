import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../../../actions';

import { Editor, Spinner } from '../../../../common';
import { FormTextInput } from '../../../../common/Form/FormTextInput';
import { FormSelectField } from '../../../../common/Form/FormSelectField';
import FormFileInput from '../../../../common/FormFileInput';
import Taginput from '../../../../common/Taginput';
import { courseLevelOptions, courseDomainOptions, courseSubDomainOptions } from './structure';
import { uploadFile } from '../../../../common/utility-functions';

class AboutForm extends React.Component {
    state = {
        loading: false,
        courseId: null,
        title: '',
        subTitle: '',
        description: '',
        logo: {},
        skill: [],
        level: 'basic',
        domain: 'business',
        subDomain: 'itCertification',
    };

    async componentDidMount() {
        const { courseId, apis } = this.props;
        if (courseId) {
            this.setState({ loading: true });
            const res = await apis.getCourseDetails({ courseId: parseInt(courseId, 10) });
            const { title, subTitle, description, level, domain, subDomain, skill, logo } = res.course;
            this.setState({ loading: false, courseId: parseInt(courseId, 10), title, subTitle, level, domain, description, subDomain, logo: { name: logo || '' }, skill: JSON.parse(skill) || [] });
        }
    }

    componentWillUnmount() {
        this.autoSave.cancel();
    }

    uploadLogo = async (id, value) => {
        const { courseId, title } = this.state;
        const { account, apis, setAlert } = this.props;
        if (title.trim().length === 0) {
            setAlert({ showAlert: true, message: 'Title of the course can not be empty. Please add the title first!', status: 'danger' })
            return;
        }
        this.setState({ [id]: value });
        try {
            const res = await uploadFile('course', value, account.sessionId);
            if (res.status === 200) {
                await apis.updateCourse([{ 'logo': res.data }, { id: courseId }]);
                this.setState({ logo: { name: res.data } });
            }
        } catch (e) {
            console.log('Error', e);
        }
    }

    autoSave = _.debounce((id) => {
        this.saveCourse(id);
    }, 1000);

    saveCourse = async (id) => {
        const { courseId, title } = this.state;
        const { apis, account, changePath, setAlert, alert } = this.props;
        if (id === 'title') {
            if (title.trim().length === 0) {
                setAlert({ showAlert: true, message: 'Title of the course can not be empty. Please add the title first!', status: 'danger' })
                return;
            } else {
                if (alert.showAlert) {
                    setAlert({ showAlert: false, message: '' });
                }
            }
        }
        if (courseId) {
            let value = this.state[id];
            if (id === 'skill') value = JSON.stringify(value);
            await apis.updateCourse([{ [id]: value }, { id: courseId }]);
            return;
        }
        // create new course
        const res = await apis.addCourse({ createdBy: account.user.id, [id]: this.state[id] });
        this.setState({ courseId: res });
        changePath({ path: `/edit-course/${account.user.slug}/${res}`, courseId: res });
    }

    onChange = (id, value) => {
        const { title } = this.state;
        const { setAlert } = this.props;
        if (id !== 'title' && title.trim().length === 0) {
            setAlert({ showAlert: true, message: 'Title of the course can not be empty. Add the title first', status: 'danger' })
            return;
        }
        this.setState({ [id]: value });
        this.autoSave(id);
    }

    render() {
        const { title, loading, subTitle, description, level, logo, domain, subDomain, skill } = this.state;
        if (loading) return <Spinner />
        return (
            <form>
                <div className="form-group">
                    <FormTextInput label="Course title" name="title" value={title} placeholder="Insert your course title." hasError={true} onChange={(e) => this.onChange('title', e.target.value)} />
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
                                options={courseLevelOptions}
                                onChange={(e) => this.onChange('level', e.target.value)}
                                value={level}
                            />
                        </div>
                        <div className="form-group">
                            <FormSelectField
                                options={courseDomainOptions}
                                onChange={(e) => this.onChange('domain', e.target.value)}
                                value={domain}
                            />
                        </div>
                        <div className="form-group">
                            <FormSelectField
                                options={courseSubDomainOptions}
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
            </form>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(AboutForm);
