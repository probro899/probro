import userRegistration from '../../auth/userRegistration';

export default async (req, res) => {
  try {
    const resFinal = await userRegistration(req.body);
    // console.log('final response', resFinal);
    if (resFinal) {
      res.status(200);
      res.send(JSON.stringify(resFinal));
    }
  } catch (e) {
    if (e.message === 'Emailisalreadytaken') {
      res.status(201);
      res.send('Email is already taken');
    }
    console.log('error in request handler', e.message);
    res.status(501).send({ status: 501, message: e.message });
  }
};
