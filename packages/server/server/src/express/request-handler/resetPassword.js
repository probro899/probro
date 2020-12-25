import reset from '../../auth/reset';

export default async function resetPassword(req, res) {
  // console.log('pasword request handlercalled', req.body);
  try {
    const { token, password } = req.body;
    await reset(token, password);
    res.send('Password reset successful');
  } catch (e) {
    console.error('error in reset password', e);
    res.status(501);
    res.send(e.message);
  }
}
