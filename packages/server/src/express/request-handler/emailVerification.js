import emailVerification from '../../auth/emailVerification';

export default async (req, res) => {
  const emaiVerificationEmail = await emailVerification(req.query.token);
  if (emaiVerificationEmail) {
    console.log('email verification email', emaiVerificationEmail);
    res.statusCode = 200;
    res.send(emaiVerificationEmail);
  } else {
    res.statusCode = 501;
    res.send('Email not verified');
  }
};
