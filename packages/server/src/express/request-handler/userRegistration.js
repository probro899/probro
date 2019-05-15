import { userRegistration } from '../../api';

export default async (req, res) => {
  try {
    const resFinal = await userRegistration(req.body);
    console.log('final response', resFinal);
    if (resFinal) {
      res.status = 200;
      res.send(JSON.stringify(resFinal));
    }
  } catch (e) {
    res.status = 201;
    res.send(JSON.stringify(e.message));
    throw e;
  }
};
