import findUserDetails from '../../api/common/findUserDetails';

export default async function getUser(req, res) {
  console.log('getUser request handler', req.query);
  try {
    const { userId } = req.query;
    const result = await findUserDetails(userId, true);
    // console.log('getuser result in do request handler', result);
    res.status(200);
    res.send(JSON.stringify(result));
  } catch (e) {
    console.error('error in getUser', e);
    res.status(501);
    res.send(e.message);
  }
}
