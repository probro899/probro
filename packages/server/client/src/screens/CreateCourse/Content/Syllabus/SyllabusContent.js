import React from 'react';
import { connect } from 'react-redux';
import updateCourse from '../../../../actions/courseAction';
import { DeletePopOver, Spinner } from '../../../../common';
import AddNewSectionButton from './AddNewSectionButton';
import AddNewSectionForm from './AddNewSectionForm';
import syllabusLectureManipulator from './helper-functions';
import SyllabusItem from './SyllabusItem';

class SyllabusContent extends React.Component {
  state = { loading: false, deleteObject: { type: 'section', name: '', popoverOpen: false, sectionId: null, lectureId: null, resourceId: null }, sectionFormOpen: false, syllabusList: [] };

  async componentDidMount() {
    const { courseId, apis, updateCourse } = this.props;
    if (courseId) {
      this.setState({ loading: true });
      const res = await apis.getCourseDetails({ courseId: parseInt(courseId, 10) });
      const { allSections, allLectures, course } = res;
      this.setState({ loading: false });
      updateCourse({ courseId: course.id, status: course.status, syllabusList: allSections.map(obj => ({ title: obj.title, id: obj.id, objective: obj.objective, lectures: allLectures.filter(o => o.sectionId === obj.id) })) });
    }
  }

  toggleForm = () => this.setState({ sectionFormOpen: !this.state.sectionFormOpen })

  addSection = async (data) => {
    // const { syllabusList } = this.state;
    const { apis, updateCourse, course } = this.props;
    const { syllabusList, courseId } = course;
    let obj = { ...data, courseId }
    const res = await apis.addCourseSection(obj);
    obj.id = res;
    updateCourse({ syllabusList: [...syllabusList, { ...obj, lectures: [] }] });
    this.toggleForm();
  }

  updateSection = async (data) => {
    const { apis, course, updateCourse } = this.props;
    const { syllabusList } = course;
    await apis.updateCourseSection(data);
    updateCourse({ syllabusList: [...syllabusList.map(o => {
      if (data[1].id === o.id) {
        return { ...o, ...data[0] };
      }
      return o;
    })]});
  }

  addLecture = async (sectionId, data) => {
    const { apis, course, updateCourse } = this.props;
    const { syllabusList } = course;
    let lecture = { ...data, sectionId };
    const res = await apis.addSectionLecture(lecture);
    lecture.id = res;
    updateCourse({ syllabusList: syllabusLectureManipulator('add', syllabusList, lecture) });
  }

  updateLecture = async (sectionId, lectureId, data) => {
    const { apis, updateCourse, course } = this.props;
    const { syllabusList } = course;
    await apis.updateSectionLecture([{ ...data }, { id: lectureId }]);
    updateCourse({ syllabusList: syllabusLectureManipulator('update', syllabusList, [{ ...data }, { id: lectureId, sectionId }]) });
  }

  deleteAction = async (type) => {
    const { deleteObject } = this.state;
    const { apis, course, updateCourse } = this.props;
    const { syllabusList } = course;
    if (type === 'confirm') {
      if (deleteObject.type === 'section') {
        await apis.deleteCourseSection({ id: deleteObject.sectionId });
        updateCourse({ syllabusList: syllabusList.filter(o => o.id !== deleteObject.sectionId)});
      } else if (deleteObject.type === 'lecture') {
        await apis.deleteSectionLecture({ id: deleteObject.lectureId });
        updateCourse({ syllabusList: syllabusLectureManipulator('delete', syllabusList, { id: deleteObject.lectureId }) }); 
      }
      else if (deleteObject.type === 'resource') {
        await apis.deleteResource({ id: deleteObject.resourceId });
        updateCourse({ syllabusList: syllabusLectureManipulator('resourceDelete', syllabusList, { id: deleteObject.resourceId, sectionId: deleteObject.sectionId, lectureId: deleteObject.lectureId })});
      }
    }
    this.setState({ deleteObject: { type: '', name: '', popoverOpen: false, id: null } });
  }

  startDeletion = (type, sectionId, lectureId, resourceId) => {
    const { course } = this.props;
    const { syllabusList } = course;
    let name = '';
    if (type === 'section') {
      name = syllabusList.find(o => o.id === sectionId).title;
    } else if (type === 'lecture') {
      name = syllabusList.find(o => o.id === sectionId).lectures.find(o => o.id === lectureId).title;
    } else if (type === 'resource') {
      name = syllabusList.find(o => o.id === sectionId).lectures.find(o => o.id ===lectureId).resources.find(o => o.id === resourceId).name;
    }
    this.setState({ deleteObject: { type, name, popoverOpen: true, sectionId, lectureId, resourceId }});
  }

  uploadLectureVideo = async (data, instance) => {
    const { apis, course } = this.props;
    const { syllabusList } = course;
    const sectionId = data.sectionId;
    delete data.sectionId;
    if (instance) {
      const res = await apis.updateResource([{ ...data }, { id: instance.id }]);
      if (res) {
        syllabusLectureManipulator('resourceUpdate', syllabusList, [{ ...data }, { sectionId, lectureId: data.lecId, id: instance.id }]);
        if (res) return { status: 200 };
      }
    } else {
      const res = await apis.addResource(data);
      if (res) {
        syllabusLectureManipulator('resourceAdd', syllabusList, [{ ...data, id: res }, { sectionId, id: data.lecId }])
        if (res) return { status: 200 };
      }
    }
  }

  render() {
    const { loading, deleteObject, sectionFormOpen } = this.state;
    const { course, apis } = this.props;
    const { syllabusList } = course;
    if (loading) return <Spinner />;
    return (
      <>
        <div className="syllabus-editor">
          <p>Start putting together your course by creating sections, lectures, quizes etc.</p>
        </div>
        <div className="syllabus-list-wrapper">
          <ul className="syllabus-list">
            {syllabusList.map((obj, idx) => (
              <SyllabusItem
                updateSection={this.updateSection}
                uploadLectureVideo={this.uploadLectureVideo}
                updateLecture={this.updateLecture}
                startDeletion={this.startDeletion}
                addLecture={this.addLecture}
                key={obj.id}
                section={idx + 1}
                item={obj}
                apis={apis}
              />
            ))}
            <li className="add-section-item add-new-section">
              <AddNewSectionButton toggleContent={this.toggleForm} showContent={sectionFormOpen} />
            </li>
            {sectionFormOpen && (
              <li className="syllabus-item">
                <div className="syllabus-list-item-wrap">
                  <div className="list-item-section-wrapper">
                    <AddNewSectionForm callback={this.addSection} onClose={this.toggleForm} />
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
        <DeletePopOver
          isOpen={deleteObject.popoverOpen}
          action={this.deleteAction}
          name={deleteObject.name}
        />
      </>
    );
  }
}

const mapStateToProps = ({ course }) => ({ course });
export default connect(mapStateToProps, { updateCourse })(SyllabusContent);

