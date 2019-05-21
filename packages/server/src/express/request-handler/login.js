import login from '../../auth/login';

export default async (req, res) => {
  try {
    const record = req.body;
    const status = await login(record);
    res.send(status);
  } catch (error) {
    console.log('error in login', error);
    res.status(500);
    res.send(JSON.stringify(error.message));
  }
};
