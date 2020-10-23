import getErrorReport from '../../api/common/error/getError';
import validateToken from '../../auth/validateToken';

export default async (req, res) => {
  try {
    const { token } = req.body;
    const user = validateToken(token);
    if (user.type === 'admin') {
      const apiRes = await getErrorReport(req.query);
      res.status(200);
      res.send(apiRes);
    } else {
      res.status(501);
      res.send('User validateion faild');
    }
  } catch (e) {
    res.status(501);
    res.send(JSON.stringify(e));
  }
};
