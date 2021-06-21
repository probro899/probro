/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import update from '../../../update/update';
import databaseCache from '../../../../../cache/database/cache';
import Delete from '../../delete';
import vimeoClient from '../../../../vimeo/client';

async function deleteCourse(params) {
  const { id } = params;
  const res = await update.call(this, 'Course', { deleteStatus: 1 }, { id });
  return res;
}


async function deleteResource(params) {
  const resourceInfo = databaseCache.get('Resource').find(r => r.id === params.id);
  if (resourceInfo.type === 'video') {
    const { url } = resourceInfo;
    vimeoClient.request({
      method: 'DELETE',
      path: `/videos/${url}`,
    }, (error, body, status_code, headers) => {
      if (status_code === 204) {
        console.log('Video delete successfull');
      }
    });
  }

 const res = await Delete.call(this, 'Resource', params);
  return res;
}

async function deleteSectionLecture(params) {
 const res = await Delete.call(this, 'Lecture', params);
  const allResources = databaseCache.get('Resource').filter(r => r.lecId === params.id);
  const allResourcePromises = [];
  allResources.forEach(r => allResourcePromises.push(deleteResource.call(this, { id: r.id })));
  await Promise.all(allResourcePromises);
  return res;
}

async function deleteCourseSection(params) {
  const res = await Delete.call(this, 'Section', params);
  const allLectures = databaseCache.get('Lecture').filter(l => l.sectionId === params.id);
  const allLectureDeletePromises = [];
  allLectures.forEach(l => allLectureDeletePromises.push(deleteSectionLecture.call(this, { id: l.id })));
  await Promise.all(allLectureDeletePromises);
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
