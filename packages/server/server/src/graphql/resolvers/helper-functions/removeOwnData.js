import validateToken from '../../../auth/validateToken';
import databaseCache from '../../../cache/database/cache';

export default (data, sessionId, schema) => {
  let filterData = [];
  const user = validateToken(sessionId);
  const userId = user.id;
  try {
    switch (schema) {
      case 'Course':
        filterData = data.filter(d => d.createdBy !== userId);
        break;
      case 'Blog':
        filterData = data.filter(d => d.userId !== userId);
        filterData = filterData.map(b => {
          const bookmark = databaseCache.get('BlogBookmark').find(bm => bm.userId === userId && bm.blogId === b.id && !bm.deleteStatus);
          return { ...b, bookmark };
        });
        break;
      default:
        return data;
    }
    return filterData;
  } catch (e) {
    console.error('session error', e);
    return data;
  }
};
