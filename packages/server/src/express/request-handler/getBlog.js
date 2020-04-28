import findBlogDetails from '../../api/common/findBlogDetails';

export default async function getBlog(req, res) {
  // console.log('getBlog request handler', req.query);
  try {
    const { userId, blogId } = req.query;
    const result = await findBlogDetails(blogId, userId, true);
    res.status(200);
    res.send(JSON.stringify(result));
  } catch (e) {
    console.error('error in getBlog', e);
    res.status(501);
    res.send(e.message);
  }
}
