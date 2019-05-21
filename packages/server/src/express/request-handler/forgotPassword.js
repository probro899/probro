import forgot from '../../auth/forgot';

export default async function (req, res) {
  try {
    const { email } = req.query;
    const forgotRes = await forgot(email);
    if (forgotRes) {
      res.stautsCode = 200;
      res.send('Check your email address for further information');
    }
  } catch (e) {
    console.log('error in forgto passs', e);
    res.stautsCode = 501;
    res.send(JSON.stringify(e.message));
  }
}
