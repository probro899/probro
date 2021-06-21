import _ from 'lodash';
import db from '../../../db';
import findUserDetails from '../../../api/common/findUserDetails';
import getStarRating from '../../../api/common/getStarRating';
import databaseCache from '../../../cache/database/cache';
import removeOwnData from './removeOwnData';
import flat from '../../../api/flat';

export default async (keyword, sessionId) => {
  const keywordArrtemp = keyword.split(' ');
  // console.log('all keyword', keywordArrtemp);
  const keywordArr = keywordArrtemp.filter(key => key.length > 0);
  const coursePromises = [];
  let courses = await db.execute(async ({ exec }) => {
    keywordArr.forEach((k) => {
      coursePromises.push(exec(`SELECT * FROM Course WHERE (title || subTitle || domain || skill) LIKE '%${k}%'`, []));
    });

    const res = await Promise.all(coursePromises);
    return flat(res);
  });

  courses = _.unionBy(courses, 'id');

  if (sessionId) {
    courses = removeOwnData(courses, sessionId, 'Course');
  }

  courses = courses.map((c, idx) => {
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

  return courses;
};
