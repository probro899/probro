import { globalSearch } from '../../api/common/search/index';

export default async function doSearch(req, res) {
  // console.log('search request handler', req.query);
  try {
    const { keyword } = req.query;
    const result = await globalSearch(keyword);
    // console.log('search result in do request handler', result);
    res.status(200);
    res.send(JSON.stringify(result));
  } catch (e) {
    console.error('error in search', e);
    res.status(501);
    res.send(e.message);
  }
}
