/* eslint-disable import/no-cycle */
/* eslint-disable no-confusing-arrow */
import schema from '@probro/common/src/schema';
import databaseCache from '../../../../../cache/database/cache';
import flat from '../../../../flat';
import findUserDetails from '../../../findUserDetails';
import getStarRating from '../../../getStarRating';
import { addCloneProject } from '../../../create/schema/course/createProject';
import getAppointment from '../../../getAppointment';

const addNewProject = async (lecId, refId, ceId, context) => {
  const { session } = context;
  const userId = session.values.user.id;
  const project = databaseCache.get('Board').find(b => b.id === refId);
  const newProject = await addCloneProject(project, context, { id: ceId, userId });
  return newProject;
};

const getProjectDetails = (lecId, refId) => {
  const project = databaseCache.get('Board').find(b => b.refId === refId && b.lecId === lecId);
  if (project) {
    return { ...project, user: findUserDetails(project.userId) };
  }
  return null;
};

export default async function getCourseDetails(params) {
  const { session } = this;
  const { courseId } = params;
  const userId = session.values.user.id;
  let course = databaseCache.get('Course').find(c => c.id === parseInt(courseId, 10));
  const courseEnrolDetails = databaseCache.get('CourseEnroll').find(ce => ce.userId === userId && ce.courseId === courseId);
  const priceDetails = databaseCache.get('CoursePrice').find(cp => cp.courseId === courseId);
  course = {
    ...course,
    creator: findUserDetails(course.createdBy),
    rating: getStarRating(course.id, 'course'),
    priceDetails,
  };
  const allSections = databaseCache.get('Section').filter(s => s.courseId === parseInt(courseId, 10));
  const allLectures = flat(allSections.map(s => databaseCache.get('Lecture').filter(l => l.sectionId === s.id)));
  let newLecture = {};
  let finalAllLectures = allLectures.map(l => ({
    ...l,
    resources: databaseCache.get('Resource')
      .filter(r => r.lecId === l.id)
      .map((r) => {
        if (r.type === 'project' && courseEnrolDetails) {
          const project = getProjectDetails(l.id, parseInt(r.url, 10), courseEnrolDetails.id, this);
          if (!project) {
            newLecture[l.id] = addNewProject(l.id, parseInt(r.url, 10), courseEnrolDetails.id, this);
          }
          return {
            ...r,
            projectDetails: project,
          };
        }
        return r;
      }),
  }));

  const hasNewLecture = Object.values(newLecture);
  if (hasNewLecture.length > 0) {
    const lecIds = Object.keys(newLecture).map(id => parseInt(id, 10));
    const newProjectsRes = await Promise.all(hasNewLecture);
    newLecture = lecIds.reduce((obj, id, idx) => {
      const project = newProjectsRes[idx] || {};
      obj[id] = { ...project, user: findUserDetails(project.userId), appointments: getAppointment(project.id) };
      return obj;
    }, {});
    finalAllLectures = finalAllLectures.map((lec) => newLecture[lec.id]
      ? {
        ...lec,
        resources: lec.resources.map(r => r.type === 'project' ? { ...r, projectDetails: newLecture[lec.id] } : r),
      }
      : lec);
  }

  const allCourseCompleteHistory = databaseCache.get('CourseCompleteHistory').filter(cch => cch.courseId === courseId && cch.userId === session.values.user.id);

  session.dispatch(schema.add('Course', course));
  session.dispatch(schema.add('Board', Object.values(newLecture)));
  session.dispatch(schema.add('Section', allSections));
  session.dispatch(schema.add('Lecture', finalAllLectures));
  session.dispatch(schema.add('CourseCompleteHistory', allCourseCompleteHistory));
  return { status: 200, api: 'getCourseDetails', courseId, course, allSections, allLectures: finalAllLectures, priceDetails, courseCompleteHistory: allCourseCompleteHistory };
}
