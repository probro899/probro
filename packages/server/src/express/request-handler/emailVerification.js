import emailVerification from '../../auth/emailVerification';

export default async (req, res) => {
  try {
    const emaiVerificationEmail = await emailVerification(req.query.token);
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
