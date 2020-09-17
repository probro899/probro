import databaseCache from '../../cache/database/cache';
import findUserDetails from './findUserDetails';
import flat from '../flat';

export default (userId) => {
  const allBlogs = databaseCache.get('Blog').filter(b => b.userId === userId).map(b => ({ ...b, user: findUserDetails(b.userId) }));
  const allBoardMember = databaseCache.get('BoardMember').filter(bm => bm.tuserId === userId && !bm.deleteStatus);
  const allBoardTable = databaseCache.get('Board');
  const allBoardColumnTable = databaseCache.get('BoardColumn');
  const allBoardWithUser = allBoardMember.map(bm => allBoardTable.find(b => b.id === bm.boardId)).map(b => ({ ...b, user: findUserDetails(b.userId) }));
  const allBoardColumns = flat(allBoardWithUser.map(b => allBoardColumnTable.filter(c => c.boardId === b.id)));
  const allUserConnections = databaseCache.get('UserConnection');
  const connectionListMid = allUserConnections.filter(uc => uc.mId === userId);
  const connectionListUserId = allUserConnections.filter(uc => uc.userId === userId);
  const connectionList = [...connectionListMid, ...connectionListUserId].map(obj => (
    obj.userId === userId ? { ...obj, user: findUserDetails(obj.mId) } : { ...obj, user: findUserDetails(obj.userId) }
  ));
  return { allBoard: allBoardWithUser, allBlogs, connectionList, allBoardColumns };
};
