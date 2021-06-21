/* eslint-disable import/no-cycle */
import update from '../../update';

async function updateCourse(params) {
  const record = params[0];
  const condition = params[1];
  const res = await update.call(this, 'Course', { ...record, updatedAt: Date.now() }, condition);
  return res;
}

async function updateCourseSection(params) {
  const record = params[0];
  const condition = params[1];
  const res = await update.call(this, 'Section', { ...record, updatedAt: Date.now() }, condition);
  return res;
}

async function updateSectionLecture(params) {
  const record = params[0];
  const condition = params[1];
  const res = await update.call(this, 'Lecture', { ...record, updatedAt: Date.now() }, condition);
  return res;
}

async function updateResource(params) {
  const record = params[0];
  const condition = params[1];
  const res = await update.call(this, 'Resource', { ...record, updatedAt: Date.now() }, condition);
  return res;
}

async function updateCourseEnroll(params) {
  const record = params[0];
  const condition = params[1];
  const res = await update.call(this, 'CourseEnroll', { ...record, updatedAt: Date.now() }, condition);
  return res;
}

async function updateCoursePrice(params) {
  const record = params[0];
  const condition = params[1];
  const res = await update.call(this, 'CoursePrice', { ...record, updatedAt: Date.now() }, condition);
  return res;
}

async function updateStarRating(params) {
  const record = params[0];
  const condition = params[1];
  const res = await update.call(this, 'StarRating', { ...record, updatedAt: Date.now() }, condition);
  return res;
}


async function updateCourseCompleteHistory(params) {
  const record = params[0];
  const condition = params[1];
  const res = await update.call(this, 'CourseCompleteHistory', { ...record, updatedAt: Date.now() }, condition);
  return res;
}

export default [
  updateCourse,
  updateCourseSection,
  updateSectionLecture,
  updateResource,
  updateCourseEnroll,
  updateCoursePrice,
  updateStarRating,
  updateCourseCompleteHistory,
];
