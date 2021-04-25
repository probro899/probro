import validateToken from '../../auth/validateToken';
import { verifyUser } from '../../api/common/update/schema/user/index';

export default async (req, res) => {
  try {
    const { token, userId } = req.body;
    const user = validateToken(token);
    if (user && user.type === 'admin') {
      const resFinal = await verifyUser({ userId });
      if (resFinal) {
        res.status(200);
        res.send(JSON.stringify(resFinal));
      }
    } else {
      res.status(501);
      res.send('Authorization Faild');
    }
  } catch (e) {
    console.log('error in request handler  verify token', e.message);
    res.status(501).send({ status: 501, message: e.message });
  }
};
