import emailVerification from '../../auth/emailVerification';

export default async (req, res) => {
  // console.log('email verification handler', req.body);
  try {
    const { token } = req.body;
    const emaiVerificationEmail = await emailVerification(token);
    if (emaiVerificationEmail) {
      res.statusCode = 200;
      res.send(emaiVerificationEmail);
    }
  } catch (e) {
    console.log('email verification error', e);
    res.statusCode = 501;
    res.send(JSON.stringify(e.message));
  }
};
