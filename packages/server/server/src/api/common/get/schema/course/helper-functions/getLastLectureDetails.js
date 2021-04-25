import _ from 'lodash';
import databaseCache from '../../../../../../cache/database/cache';

export default (courseId, userId) => {
  const allCourseHistory = databaseCache.get('CourseCompleteHistory').filter(cch => cch.courseId === courseId && cch.userId === userId).map(c => ({ ...c, lastActivity: c.updatedAt || c.createdAt }));
  const lastLectureHistory = _.orderBy(allCourseHistory, 'lastActivity', 'desc')[0];
  let lastLectureDetail = null;
  let lastSectionDetail = null;
  if (lastLectureHistory) {
    lastLectureDetail = databaseCache.get('Lecture').find(l => l.id === lastLectureHistory.lectureId);
    lastSectionDetail = databaseCache.get('Section').find(s => s.id === lastLectureDetail.sectionId);
  }

 return { lastSectionDetail: { id: lastSectionDetail.id, title: lastSectionDetail.title }, lastLectureDetail: { id: lastLectureDetail.id, title: lastLectureDetail.title } };
};
