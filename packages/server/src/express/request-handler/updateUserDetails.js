import validateToken from '../../auth/validateToken';
import updateUserDetails from '../../api/updateUserDetails';

export default async (req, res) => {
  const record = req.body;
  try {
    const user = validateToken(record.token);
    delete record.token;
    if (user) {
      const updateRes = await updateUserDetails(record, user);
      if (updateRes) {
        res.statusCode = 200;
        res.send('Profile successfully updated');
      }
    } else {
      res.statusCode = 201;
      res.send(JSON.stringify('Invalid token'));
    }
  } catch (e) {
    console.log('error in updateProfile', e);
    res.statusCode = 201;
    res.send(JSON.stringify(e));
  }
};
