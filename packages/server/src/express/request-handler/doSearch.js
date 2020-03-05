import { globalSearch } from '../../api/common/search/index';
import getPopular from '../../api/common/search/getPopular';

export default async function doSearch(req, res) {
  console.log('search request handler', req.query);
  try {
    const { key, country, industry } = req.query;
    let result;
    if (!key && !country && !industry) {
      result = await getPopular();
    } else {
      result = await globalSearch(key, country, industry);
    }
    // console.log('search result in do request handler', result);
    res.status(200);
    res.send(JSON.stringify(result));
  } catch (e) {
    console.error('error in search', e);
    res.status(501);
    res.send(e.message);
  }
}
