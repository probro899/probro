import cacheDatabase from '../../cache/database/cache';
import findBlogDetails from './findBlogDetails';

export default (userId) => {
  try {
    const userBlogs = cacheDatabase.get('Blog').filter(b => (b.userId === userId && b.saveStatus === 'publish'));
    const userBlogsDetails = userBlogs.map(b => findBlogDetails(b.id));
    return userBlogsDetails;
  } catch (e) {
    console.error('Error in getUserBlogs', e);
  }
};
