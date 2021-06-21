import db from '../../db';
import findUserDetails from '../../api/common/findUserDetails';

export default async (req, res) => {
  const result = await db.execute(async ({ find }) => {
    const users = await find('User');
    console.log('all USers', users);
    const finalUsers = users.map(u => findUserDetails(u.id));
    return finalUsers;
  });
  res.status(200);
  res.send(JSON.stringify(result));
};
