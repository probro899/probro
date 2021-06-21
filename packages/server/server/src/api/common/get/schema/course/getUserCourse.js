import _ from 'lodash';
import schema from '@probro/common/src/schema';
import databaseCache from '../../../../../cache/database/cache';
import findUserDetails from '../../../findUserDetails';
import getStarRating from '../../../getStarRating';
import getLastLectureDetails from './helper-functions/getLastLectureDetails';

export default function getUserCourse() {
  const { session } = this;
  const uId = session.values.user.id;
  const totalCourseEnroll = databaseCache.get('CourseEnroll').filter(c => c.userId === uId);
  const allEnrollCourses = totalCourseEnroll.map(ce => ({ ...databaseCache.get('Course').find(c => c.id === ce.courseId), enrollDetails: ce }));
  const ownCourses = databaseCache.get('Course').filter(c => c.createdBy === uId && !c.deleteStatus);
  const enrollCoursesWithHistory = allEnrollCourses.map(c => ({ ...c, courseCompleteHistory: getLastLectureDetails(c.id, uId) }));
  const allCourses = _.uniqBy([...enrollCoursesWithHistory, ...ownCourses], 'id');
  const allCoursesWithExtraDetails = allCourses.map(c => ({ ...c, creator: findUserDetails(c.createdBy), rating: getStarRating(c.id, 'course'), priceDetails: databaseCache.get('CoursePrice').find(cp => cp.courseId === c.id) }));
  session.dispatch(schema.init('Course', allCoursesWithExtraDetails));
  return { status: 200, api: 'getUserCourse' };
}
