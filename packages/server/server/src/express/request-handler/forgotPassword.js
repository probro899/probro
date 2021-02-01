import forgot from '../../auth/forgot';

export default async function (req, res) {

  try {
    const { email } = req.body;
    // console.log('email in forgot password', email);
    const forgotRes = await forgot(email);
    if (forgotRes) {
      res.statusCode = 200;
      res.send({ response: 200, message: 'Check your email address for further information' });
    }
  } catch (e) {
    console.log('error in forgto passs', e);
    res.statusCode = 501;
    res.send(JSON.stringify(e.message));
  }
}
