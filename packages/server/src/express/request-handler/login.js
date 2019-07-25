import login from '../../auth/login';

export default async (req, res) => {
  try {
    const record = req.body;
    const status = await login(record);
    if (status) {
      res.status(200);
      res.send(JSON.stringify(status));
    }
  } catch (error) {
    console.log('error in login', error);
    res.status(201);
    res.send(JSON.stringify(error.message));
  }
};
