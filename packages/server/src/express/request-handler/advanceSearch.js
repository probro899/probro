import { advanceSearch } from '../../api/common/search';

export default async (req, res) => {
  console.log(' advance search request handler', req.query);
  try {
    const { keyword, country, interest } = req.query;
    const result = await advanceSearch(keyword, country, interest);
    // console.log('search result in do request handler', result);
    res.status(200);
    res.send(JSON.stringify(result));
  } catch (e) {
    console.error('error in search', e);
    res.status(501);
    res.send(e.message);
  }
};
