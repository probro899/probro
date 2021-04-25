import React from 'react';
import { Spinner } from '../../../../common';
import Alert from '../../../../common/Alert';
import AddNewSectionButton from './AddNewSectionButton';
import AddNewSectionForm from './AddNewSectionForm';
import SyllabusItem from './SyllabusItem';


class SyllabusContent extends React.Component {
    state = { loading: false, alertOpen: true, sectionFormOpen: false, syllabusList: [] };

    async componentDidMount() {
        const { courseId, apis } = this.props;
        if (courseId) {
            this.setState({ loading: true });
            const res = await apis.getCourseDetails({ courseId: parseInt(courseId, 10) });
            const { allSections, allLectures } = res;
            console.info("response", res);
            this.setState({
                loading: false,
                syllabusList: allSections.map(obj => ({ title: obj.title, id: obj.id, objective: obj.objective, lectures: allLectures.filter(o => o.sectionId === obj.id) })),
            });   
        }
    }

    toggleAlert = () => this.setState({ alertOpen: !this.state.alertOpen })
    toggleForm = () => this.setState({ sectionFormOpen: !this.state.sectionFormOpen })

    addSection = async (data) => {
        const { syllabusList } = this.state;
        const { apis, courseId } = this.props;
        let obj = { ...data, courseId }
        const res = await apis.addCourseSection(obj);
        obj.id = res;
        this.setState({ syllabusList: [...syllabusList, { ...obj, lectures: [] }] });
        this.toggleForm();
    }

    addLecture = async (sectionId, data) => {
        const { syllabusList } = this.state;
        const { apis } = this.props;
        let lecture = { ...data, sectionId };
        const res = await apis.addSectionLecture(lecture);
        lecture.id = res;
        syllabusList.map(o => {
            if (o.id === sectionId) { o.lectures.push(lecture); }
            return o;
        });
        this.setState({ syllabusList });
    }

    render() {
        const { loading, alertOpen, sectionFormOpen, syllabusList } = this.state;
        if (loading) return <Spinner />;
        return (
            <>
                <div className="syllabus-editor">
                    <Alert isOpen={alertOpen} onClose={this.toggleAlert} status="success" title="Due to increased volume of new courses being submitted for review, the Quality Review Process may take up to 6 days. In order to avoid any additional delays." />
                    <p>Start putting together your course by creating sections, lectures and practice (quizzes, coding exercises and assignments).</p>
                </div>
                <div className="syllabus-list-wrapper">
                    <ul className="syllabus-list">
                        {syllabusList.map((obj, idx) => <SyllabusItem addLecture={this.addLecture} key={obj.id} section={idx + 1} item={obj} />)}
                        <li className="add-section-item add-new-section">
                            <AddNewSectionButton toggleContent={this.toggleForm} showContent={sectionFormOpen} />
                        </li>
                        {sectionFormOpen && (<li className="syllabus-item">
                            <div className="syllabus-list-item-wrap">
                                <div className="list-item-section-wrapper">
                                    <AddNewSectionForm addSection={this.addSection} onClose={this.toggleForm} />
                                </div>
                            </div>
                        </li>)}
                    </ul>
                </div>
            </>
        )
    }
}

export default SyllabusContent;
