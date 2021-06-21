import _ from 'lodash';
import databaseCache from '../../../cache/database/cache';
import findUserDetails from '../../../api/common/findUserDetails';
import getStarRating from '../../../api/common/getStarRating';
import validateToken from '../../../auth/validateToken';
import flat from '../../../api/flat';

export default (courseId, sessionId) => {
  try {
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

    const totalNoOfCourseCreadedByThisUser = databaseCache.get('Course').filter(c => (c.createdBy === course.createdBy && c.status === 'publish'));

    const totalNoOfEnrollerOfThisUser = flat(totalNoOfCourseCreadedByThisUser.map(c => databaseCache.get('CourseEnroll').filter(ce => ce.courseId === c.id)));
    const noOfLearners = _.uniqBy(totalNoOfEnrollerOfThisUser, 'userId').length;
    const noOfCourses = totalNoOfCourseCreadedByThisUser.length;

    const allSections = databaseCache.get('Section').filter(s => s.courseId === courseId);
    const allSectionWithLectures = allSections.map(s => ({ ...s, lectures: databaseCache.get('Lecture').filter(l => l.sectionId === s.id) }));

    const allSectionWithLecturesWithResources = allSectionWithLectures.map(s => ({ ...s, lectures: s.lectures.map(l => ({ ...l, resources: databaseCache.get('Resource').filter(r => r.lecId === l.id) })) }));
    // console.log('lectures with resource', JSON.stringify(allSectionWithLecturesWithResources));
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
      courseSection: allSectionWithLecturesWithResources,
      creator,
      rating: getStarRating(),
      reviews: reviewsWithUserDetails,
      courseEnrollDetails,
      priceDetails,
      noOfCourseEnroll: noOfCourseEnroll.length,
      courseCompleteHistory,
      noOfLearnersOfThisCreator: noOfLearners,
      noOfCoursesByThisCreator: noOfCourses,
    };
  } catch (e) {
    console.error('Error in getCourseDetails', e);
  }
};
