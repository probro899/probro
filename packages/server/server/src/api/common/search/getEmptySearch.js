import db from '../../../db';
import findUserDetails from '../findUserDetails';

export default async () => {
  // console.log('get empty search');
  const res = await db.execute(async ({ find }) => {
    const findRes = await find('UserDetail', { country: 'Nepal', type: 'mentor' });
    const indexUserId = findRes.map((obj) => obj.userId).slice(0, 9);
    const allUserDetailsPromises = [];
    indexUserId.forEach(id => allUserDetailsPromises.push(findUserDetails(id)));
    const allIndexUsers = await Promise.all(allUserDetailsPromises);
    return allIndexUsers;
  });
  // console.log('Find res', res);
  return res;
};
