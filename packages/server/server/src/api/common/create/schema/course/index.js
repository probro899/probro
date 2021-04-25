/* eslint-disable import/no-cycle */
import urlSlug from 'url-slug';
import add from '../../add';
 
async function addCourse(record) {
  console.log('record in course add api', record);
  const { title } = record;
  const tempSlug = urlSlug(title);
  const slug = `${tempSlug}-${Date.now()}`;
  const res = await add.call(this, 'Course', { ...record, createdAt: Date.now(), slug });
  return res;
}

async function addCourseSection(params) {
  const res = await add.call(this, 'Section', { ...params, createdAt: Date.now() });
  return res;
}

async function addSectionLecture(params) {
  const res = await add.call(this, 'Lecture', { ...params, createdAt: Date.now() });
  return res;
}

async function addResource(params) {
  const res = await add.call(this, 'Resource', { ...params, createdAt: Date.now() });
  return res;
}

async function addCourseEnroll(params) {
  const res = await add.call(this, 'CourseEnroll', { ...params, createdAt: Date.now() });
  return res;
}

async function addCoursePrice(params) {
  const res = await add.call(this, 'CoursePrice', { ...params, createdAt: Date.now() });
  return res;
}

async function addStarRating(params) {
  const res = await add.call(this, 'StarRating', { ...params, createdAt: Date.now() });
  return res;
}

async function addCourseCompleteHistory(params) {
  const res = await add.call(this, 'CourseCompleteHistory', { ...params, createdAt: Date.now() });
  return res;
}

export default [
  addCourse,
  addCourseSection,
  addSectionLecture,
  addResource,
  addCourseEnroll,
  addCoursePrice,
  addStarRating,
  addCourseCompleteHistory,
];
