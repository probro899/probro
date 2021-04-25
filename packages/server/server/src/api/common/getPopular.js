import lodash from 'lodash';
import db from '../../db';
import findBlogDetails from './findBlogDetails';
import findUserDetails from './findUserDetails';

// Todo make baninary tree for searching it is expensive for now it is ok

export default async () => {
  try {
    const dataRes = await db.execute(async ({ find }) => {
      const publishBlogs = await find('Blog', { saveStatus: 'publish' });
      const allBlogDetailPromises = [];
      publishBlogs.forEach(b => allBlogDetailPromises.push(findBlogDetails(b.id, b.userId)));
      const allBlogDetail = await Promise.all(allBlogDetailPromises);
      // console.log('allBlogDetail', allBlogDetail);
      const uniqBlogUserId = lodash.uniq(publishBlogs.map(b => b.userId));
      const createdBlogCount = [];
      uniqBlogUserId.forEach((id) => {
        createdBlogCount.push(publishBlogs.filter(b => b.userId === id).length);
      });

      const blogs = allBlogDetail.sort((a, b) => {
        // console.log('a and b', a, b);
        if ((a.blogLike.length + a.blogComment.length) > (b.blogLike.length + b.blogComment.length)) {
          return -1;
        }
        return 1;
      });

      // console.log('uniquser = ', uniqBlogUserId, 'createdBlogCount', createdBlogCount);
      let indexUserId = uniqBlogUserId.map((uid, idx) => ({ id: uid, count: createdBlogCount[idx] })).sort((a, b) => a > b ? 1 : -1).slice(0, 9);
      const allUserDetailsPromises = [];

      if (indexUserId.length < 10) {
        const verifiedUsers = await find('User', { type: 'verified' });
        indexUserId = _.uniq([...indexUserId, ...verifiedUsers].map(u => u.id));
      }
      indexUserId.forEach(id => allUserDetailsPromises.push(findUserDetails(id)));
      const allIndexUsers = await Promise.all(allUserDetailsPromises);
      const verifiedUsers = allIndexUsers.filter(ud => ud.user.type === 'verified');
      const verifiedBlogs = blogs.filter(b => b.blog.user.type === 'verified');
      // console.log(' final verifiedblogs===', verifiedBlogs, 'final verified users ===', verifiedUsers);
      return { blogs: verifiedBlogs || [], users: verifiedUsers };
    });
    // console.log('search response', dataRes);
    return dataRes;
  } catch (e) {
    console.error('Error in getPopular', e);
  }
};
