import lodash from 'lodash';
import db from '../../../db';
import findUserDetails from '../findUserDetails';
import getPopular from './getPopular';
import flat from '../../flat';
import findBlogDetails from '../findBlogDetails';

export default async (userId) => {
  console.log('User id in getArchive api', userId);
  const popularRes = await getPopular();
  if (!userId) {
    return { basedOnHistory: { blogs: popularRes.blogs }, popularOnPc: { blogs: popularRes.blogs, users: popularRes.users } };
  }

  const userDetails = await findUserDetails(userId, true, true);
  // console.log('User Detials', userDetails);
  const { country, field, address } = userDetails.userDetail;
  const skills = userDetails.userSkill[0] ? JSON.parse(userDetails.userSkill[0].skill) : null;
  const fields = field ? JSON.parse(field) : null;

  const keyArr = lodash.uniq(flat([country, fields, address, skills].filter(d => d)).map(k => k.toLowerCase()));

  // console.log(keyArr);
  const mainRes = await db.execute(async ({ exec }) => {
    const allBlogPromises = [];
    keyArr.forEach((k) => {
      allBlogPromises.push(exec(`SELECT * FROM Blog WHERE title LIKE '%${k}%' AND [saveStatus]=?`, ['publish']));
    });
    const allBlog = await Promise.all(allBlogPromises);
    const allBlogResult = flat(allBlog).map(b => b.id);
    // console.log('allBlog', allBlog, allBlogResult);
    const allBologDetailsPrmises = [];
    lodash.uniq(allBlogResult).forEach(id => allBologDetailsPrmises.push(findBlogDetails(id, userId)));
    const allBlogDetails = await Promise.all(allBologDetailsPrmises);
    // console.log('all blog details', allBlogDetails);
    // const finalBlogDetals = allBlogResult.map((blog, idx) => ({ blog, ...allBlogDetails[idx] })) || [];
    return { blogs: allBlogDetails };
  });
  console.log('Main Response', mainRes);
  const finalBlogsRes = mainRes.blogs.length > 0 ? mainRes.blogs : popularRes.blogs;
  return { basedOnHistory: { blogs: finalBlogsRes }, popularOnPc: { blogs: popularRes.blogs, users: popularRes.users } };
};
