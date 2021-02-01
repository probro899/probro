import cacheDatabase from '../../cache/database/cache';
import findBlogDetails from './findBlogDetails';

export default (userId) => {
  const userBlogs = cacheDatabase.get('Blog').filter(b => (b.userId === userId && b.saveStatus === 'publish'));
  const userBlogsDetails = userBlogs.map(b => findBlogDetails(b.id));
  return userBlogsDetails;
};
