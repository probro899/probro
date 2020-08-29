import getArchive from '../../api/common/search/getArchive';
import cache from '../../cache';

export default async (req, res) => {
  const { userId } = req.query;
  try {
    const user = cache.users.get(userId);
    // console.log('user in get archive', user);
    const result = await getArchive(user ? user.slug : null);
    res.status = 200;
    res.send(JSON.stringify(result));
  } catch (e) {
    console.log('archive error', e);
    res.status = 501;
    res.send(JSON.stringify(e));
  }
};
