import validateToken from '../../auth/validateToken';

export default async (req, res) => {
  const { token } = req.query;
  try {
    const response = validateToken(token);
    if (response) {
      res.statusCode = 200;
      res.send(JSON.stringify(response));
    } else {
      res.statusCode = 201;
      res.send('Invalid token');
    }
  } catch (e) {
    res.statusCode = 500;
    res.send('Initial data fetch faild');
  }
};
