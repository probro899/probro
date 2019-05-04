import { userRegistration } from '../../api';

export default async (req, res) => {
  console.log('userRegisteration handler called', req.body);
  try {
    const resFinal = await userRegistration(req.body);
    if (resFinal) {
      res.statusCode = 200;
      res.send(resFinal);
    }
  } catch (e) {
    res.statusCode = 201;
    res.send(e);
    throw e;
  }
};
