import lodash from 'lodash';
import db from '../../db';

export default async function findBlogDetails(blogId, userId, getBlog) {
  const res = db.execute(async ({ find, findOne }) => {
    let blog;
    if (getBlog) {
      blog = await findOne('Blog', { id: blogId });
    }
    // const blogDetail = await find('BlogDetail', { blogId });
    const blogComment = await find('BlogComment', { blogId });
    const blogLike = await find('BlogLike', { blogId });
    const allUserIds = lodash.uniq([parseInt(userId, 10), ...blogComment.map(bc => bc.userId), ...blogLike.map(bl => bl.userId)]);
    // console.log('allUserIds', allUserIds);
    const userListPromises = [];
    const userDetailPromises = [];
    // console.log('allUserIds', allUserIds);
    allUserIds.filter(i => i).forEach((id) => {
      userListPromises.push(findOne('User', { id }));
      userDetailPromises.push(findOne('UserDetail', { userId: id }));
    });
    const userList = await Promise.all(userListPromises);
    const userDetailList = await Promise.all(userDetailPromises);
    // console.log('usreList', userList);
    const userDetails = userList.map((u, idx) => ({ user: { id: u.id, firstName: u.firstName, lastName: u.lastName, middleName: u.middleName }, userDetail: userDetailList[idx] }));
    return { blogComment, blogLike, userDetails, blog };
  });
  return res;
}
