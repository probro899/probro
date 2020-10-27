import deleteError from '../../api/common/error/deleteError';
import validateToken from '../../auth/validateToken';

export default async (req, res) => {
  // console.log('delete error called', req.body);
  try {
    const record = req.body;
    const { token } = record;
    const user = validateToken(token);
    if (user.type === 'admin') {
      const apiRes = await deleteError(record);
      res.status(200);
      res.send(JSON.stringify(apiRes));
    } else {
      res.status(501);
      res.send('User validateion faild');
    }
  } catch (e) {
    res.status(501);
    res.send(JSON.stringify(e));
  }
};
