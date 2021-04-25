import databaseCache from '../../../cache/database/cache';
import findUserDetails from '../../../api/common/findUserDetails';
import getStarRating from '../../../api/common/getStarRating';
import validateToken from '../../../auth/validateToken';

export default (courseId, sessionId) => {
  let courseEnrollDetails = null;
  let courseCompleteHistory = null;
  if (sessionId) {
    const userLoginStatus = validateToken(sessionId);
    if (userLoginStatus) {
      courseEnrollDetails = databaseCache.get('CourseEnroll').find(ce => ce.userId === userLoginStatus.id && ce.courseId === courseId);
      courseCompleteHistory = databaseCache.get('CourseCompleteHistory').filter(cch => cch.courseId === courseId && cch.userId === userLoginStatus.id);
    }
  }

  const noOfCourseEnroll = databaseCache.get('CourseEnroll').filter(ce => ce.courseId === courseId);
  const course = databaseCache.get('Course').find(c => c.id === courseId);
  const allSections = databaseCache.get('Section').filter(s => s.courseId === courseId);
  const allSectionWithLectures = allSections.map(s => ({ ...s, lectures: databaseCache.get('Lecture').filter(l => l.sectionId === s.id) }));
  const reviews = databaseCache.get('StarRating').filter(s => s.courseId === courseId);
  const priceDetails = databaseCache.get('CoursePrice').find(c => c.courseId === courseId);
  const reviewsWithUserDetails = reviews.map((r) => {
    const userDetails = findUserDetails(r.userId);
    return {
      ...r,
      userDetails: { ...userDetails.user, userDetail: userDetails.userDetail },
    };
  });
  const userDetails = findUserDetails(course.createdBy);
  const creator = { ...userDetails.user, userDetail: userDetails.userDetail };
  return {
    ...course,
    courseSection: allSectionWithLectures,
    creator,
    rating: getStarRating(),
    reviews: reviewsWithUserDetails,
    courseEnrollDetails,
    priceDetails,
    noOfCourseEnroll: noOfCourseEnroll.length,
    courseCompleteHistory,
  };
};
