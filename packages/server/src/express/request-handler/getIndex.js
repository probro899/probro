import getIndexApi from '../../api/common/getIndex';

export default async function getIndex(req, res) {
  console.log('getIndex request handler', req.query);
  try {
    const result = await getIndexApi();
    console.log('getIndex result in do request handler', result);
    res.status(200);
    res.send(JSON.stringify(result));
  } catch (e) {
    console.error('error in getIndex', e);
    res.status(501);
    res.send(e.message);
  }
}
