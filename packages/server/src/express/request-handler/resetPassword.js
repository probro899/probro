import reset from '../../auth/reset';

export default async function resetPassword(req, res) {
  try {
    const { token, password } = req.query;
    await reset(token, password);
    res.send('Password reset successful');
  } catch (e) {
    console.error('error in reset password', e);
    res.status(501);
    res.send(e.message);
  }
}
