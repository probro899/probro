/* eslint-disable import/no-cycle */
import update from '../../../update/update';
import databaseCache from '../../../../../cache/database/cache';
import Delete from '../../delete';
import { async } from 'regenerator-runtime';

async function deleteCourse(params) {
  const { id } = params;
  const res = await update.call(this, 'Course', { deleteStatus: 1 }, { id });
  return res;
}

async function deleteCourseSection(params) {
  const res = await Delete.call(this, 'Section', params);
  const allLectures = databaseCache.get('Lecture').filter(l => l.sectionId === params.id);
  const allLectureDeletePromises = [];
  allLectures.forEach(l => allLectureDeletePromises.push(Delete.call(this, 'Lecture', { id: l.id })));
  const allLectureDeleteRes = await Promise.all(allLectureDeletePromises);
  return res;
}

async function deleteSectionLecture(params) {
 const res = await Delete.call(this, 'Lecture', params);
  return res;
}

async function deleteResource(params) {
 const res = await Delete.call(this, 'Resource', params);
  return res;
}

async function deleteCourseEnroll(params) {
 const res = await Delete.call(this, 'CourseEnroll', params);
  return res;
}

async function deleteCoursePrice(params) {
 const res = await Delete.call(this, 'CoursePrice', params);
  return res;
}

async function deleteStarRating(params) {
 const res = await Delete.call(this, 'StarRating', params);
  return res;
}

async function deleteCourseCompleteHistory(params) {
  const res = await Delete.call(this, 'CourseCompleteHistory', params);
  return res;
}

export default [
  deleteCourse,
  deleteCourseSection,
  deleteSectionLecture,
  deleteResource,
  deleteCourseEnroll,
  deleteCoursePrice,
  deleteStarRating,
  deleteCourseCompleteHistory,
];
