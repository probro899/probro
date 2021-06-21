import React, { useState } from 'react';
import { MdAddBox } from 'react-icons/md';
import { connect } from 'react-redux';
import { RiVideoAddFill } from 'react-icons/ri';
import { AiFillFileAdd } from 'react-icons/ai';
import { updateNav, updateDatabaseSchema } from '../../../../../actions';
import VideoUploader from './VideoUploader';
import UploadedVideoList from './UploadedVideoList';
import SelectProject from './SelectProject';
import ProjectList from './ProjectList';
import syllabusLectureManipulator from '../helper-functions';

const LectureMenu = ({ apis, Board, course, updateDatabaseSchema, updateNav, uploadLectureVideo, startDeletion, lecture }) => {
  const [showVideoForm, toggleVideoForm] = useState(false);
  const [showProjectForm, toggleProjectForm] = useState(false);
  const uploadVideo = () => toggleVideoForm(!showVideoForm);
  const hasVideo = lecture.resources && lecture.resources.filter(o => o.type === 'video').length > 0;
  const projects = Object.values(Board.byId).filter((o) => o.cId === course.courseId && o.lecId === lecture.id);
  const hasProject = projects.length > 0;

  const setProject = async (projId) => {
    if (!projId) {
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Please select a project.', intent: 'error' } });
      return;
    }
    try {
      await apis.updateBoard([{ lecId: lecture.id }, { id: projId }]);
      const resourceObj = { url: projId, lecId: lecture.id, type: 'project' };
      const res = await apis.addResource(resourceObj);
      syllabusLectureManipulator('resourceAdd', course.syllabusList, [{ ...resourceObj, id: res }, { sectionId: lecture.sectionId, id: lecture.id }]);
      updateDatabaseSchema('Board', { id: projId, lecId: lecture.id });
    } catch (e) {
      alert('Unknown Error');
    }
    toggleProjectForm(false);
  };

  const deleteProject = async (projId) => {
    const deleteObject = lecture.resources.find((o) => o.type === 'project');
    try {
      await apis.updateBoard([{ lecId: null }, { id: projId }]);
      await apis.deleteResource({ id: deleteObject.id });
      updateDatabaseSchema('Board', { id: projId, lecId: null });
    } catch (e) {
      alert('Unknown Error', e);
    }
  };

  return (
    <div className="syllabus-section-list-wrap">
      <div className="sslw-container">
        <div className="sslw-wrapper">
          <div className="add-item-menu">
            <button disabled={!!hasVideo || !!hasProject} type="button" className="btn-tertiary" onClick={() => toggleVideoForm(!showVideoForm)}>
              <span><RiVideoAddFill size={15} /></span> Video
            </button>
            <button disabled={!!hasVideo || !!hasProject} type="button" onClick={() => toggleProjectForm(!showProjectForm)} className="btn-tertiary">
              <span><AiFillFileAdd size={15} /></span> Project
            </button>
            <button type="button" className="btn-tertiary" disabled>
              <span><MdAddBox size={15} /></span> Quiz
            </button>
          </div>
          {showProjectForm && (
            <SelectProject
              onSuccess={setProject}
              onCancel={() => toggleProjectForm(false)}
            />
          )}
          <ProjectList projects={projects} deleteProject={deleteProject} />
          {showVideoForm && (
            <VideoUploader
              lecture={lecture}
              callback={uploadVideo}
              uploadLectureVideo={uploadLectureVideo}
            />
          )}
          <UploadedVideoList
            toggleVideoForm={toggleVideoForm}
            startDeletion={startDeletion}
            lecture={lecture}
            resources={lecture.resources}
          />
        </div>
      </div>
    </div>
  );
};

const mapsStateToProps = ({ course, database }) => ({ course, Board: database.Board });
export default connect(mapsStateToProps, { updateNav, updateDatabaseSchema })(LectureMenu);
