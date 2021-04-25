import db from '../../../db';
import findUserDetails from '../findUserDetails';

export default async () => {
  try {
    // console.log('get empty search');
    const res = await db.execute(async ({ exec }) => {
      const verifiedUsersFromNepal = await exec("SELECT u.id FROM User u INNER JOIN UserDetail ud ON u.id = ud.userId WHERE u.type =  'verified' AND ud.country = 'Nepal'", []);
      const indexUserId = verifiedUsersFromNepal.map((obj) => obj.id).slice(0, 9);
      const allUserDetailsPromises = [];
      indexUserId.forEach(id => allUserDetailsPromises.push(findUserDetails(id)));
      const allIndexUsers = await Promise.all(allUserDetailsPromises);
      return allIndexUsers;
    });

    return res;
  } catch (e) {
    console.error('Error in getEmptySearch', e);
  }
};
