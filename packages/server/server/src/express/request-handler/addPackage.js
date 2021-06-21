import validateToken from '../../auth/validateToken';
import add from '../../api/common/create/add';

export default async (req, res) => {
  console.log('Add Package called', req.bod);
  try {
    const record = req.body;
    const { token } = req.body;
    const user = validateToken(token);
    delete record.token;
    if (user && user.type === 'admin') {
      const resFinal = await add('Package', record);
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
