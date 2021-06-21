import _ from 'lodash';
import db from '../../../db';
import findUserDetails from '../../../api/common/findUserDetails';
import databaseCache from '../../../cache/database/cache';
import removeOwnData from './removeOwnData';
import flat from '../../../api/flat';

export default async (keyword, topic, sessionId) => {
  const keywordArrtemp = `${keyword} ${topic}`.split(' ');
  const keywordArr = keywordArrtemp.filter(key => key.length > 0);
  const coursePromises = [];
  let blogs = await db.execute(async ({ exec }) => {
    keywordArr.forEach((k) => {
      coursePromises.push(exec(`SELECT * FROM Blog WHERE title LIKE '%${k}%' AND [saveStatus]=?`, ['publish']));
    });

    const res = await Promise.all(coursePromises);
    return flat(res);
  });

  blogs = _.unionBy(blogs, 'id');

  if (sessionId) {
    blogs = removeOwnData(blogs, sessionId, 'Blog');
  }

  blogs = blogs.map((b, idx) => {
    const userDetails = findUserDetails(b.userId);
    const creator = { ...userDetails.user, userDetail: userDetails.userDetail };
    const miniContent = b.content.replace(/(<([^>]+)>)/gi, '').slice(0, 150);
    const noOfLikes = databaseCache.get('BlogLike').filter(bl => bl.blogId === b.id).length;
    const noOfComments = databaseCache.get('BlogComment').filter(bc => bc.blogId === b.id).length;
    return {
      ...b,
      user: creator,
      content: miniContent,
      noOfLikes,
      noOfComments,
    };
  });

  return blogs;
};
