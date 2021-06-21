import databaseCache from '../../../cache/database/cache';
import findUserDetails from '../../../api/common/findUserDetails';
import getStarRating from '../../../api/common/getStarRating';

export default (isIndividual) => {
  // console.log('getUser params', isIndividual);
  let allCourses = [];
  if (isIndividual) {
    allCourses = databaseCache.get('Course').filter(c => c.status === 'publish' && c.createdBy === isIndividual);
  } else {
    allCourses = databaseCache.get('Course').filter(c => c.status === 'publish');
  }
  const finalCourses = allCourses.map((c, idx) => {
    const userDetails = findUserDetails(c.createdBy);
    const creator = { ...userDetails.user, userDetail: userDetails.userDetail };
    const priceDetails = databaseCache.get('CoursePrice').find(cp => cp.courseId === c.id);
    return {
      ...c,
      creator,
      rating: getStarRating(),
      priceDetails,
    };
  });
  // console.log('final courseDetails', finalCourses);
  return finalCourses;
};
