import schema from '@probro/common/src/schema';
import databaseCache from '../../../../../cache/database/cache';
import flat from '../../../../flat';
import findUserDetails from '../../../findUserDetails';
import getStarRating from '../../../getStarRating';

export default function getCourseDetails(params) {
  const { session } = this;
  const { courseId } = params;
  let course = databaseCache.get('Course').find(c => c.id === parseInt(courseId, 10));
  const priceDetails = databaseCache.get('CoursePrice').find(cp => cp.courseId === courseId);
  course = {
    ...course,
    creator: findUserDetails(course.createdBy),
    rating: getStarRating(course.id, 'course'),
    priceDetails,
  };
  const allSections = databaseCache.get('Section').filter(s => s.courseId === parseInt(courseId, 10));
  const allLectures = flat(allSections.map(s => databaseCache.get('Lecture').filter(l => l.sectionId === s.id)));
  const allCourseCompleteHistory = databaseCache.get('CourseCompleteHistory').filter(cch => cch.courseId === courseId && cch.userId === session.values.user.id);
  // console.log('allCourseCompleteHistory', allCourseCompleteHistory);
  session.dispatch(schema.add('Course', course));
  session.dispatch(schema.add('Section', allSections));
  session.dispatch(schema.add('Lecture', allLectures));
  session.dispatch(schema.add('CourseCompleteHistory', allCourseCompleteHistory));
  return { status: 200, api: 'getCourseDetails', courseId, course, allSections, allLectures, priceDetails, courseCompleteHistory: allCourseCompleteHistory };
}
