import _ from 'lodash';
import databaseCache from '../../cache/database/cache';
import findUserDetails from './findUserDetails';
import flat from '../flat';

export default (userId, schema) => {
  const allDbBoardMembers = databaseCache.get('BoardMember');
  const allBoardMember = allDbBoardMembers.filter(bm => bm.tuserId === userId && !bm.deleteStatus);
  const allBoardTable = databaseCache.get('Board');
  const allBoardWithUser = allBoardMember.map(bm => allBoardTable.find(b => b.id === bm.boardId)).map(b => ({ ...b, user: findUserDetails(b.userId) }));
  if (schema === 'Board') {
    return { allBoard: allBoardWithUser };
  }
  const allBlogs = databaseCache.get('Blog').filter(b => b.userId === userId).map(b => ({ ...b, user: findUserDetails(b.userId) }));
  const allBoardColumnTable = databaseCache.get('BoardColumn');
  const allBoardColumns = flat(allBoardWithUser.map(b => allBoardColumnTable.filter(c => c.boardId === b.id)));
  const allUserConnections = databaseCache.get('UserConnection');
  const connectionListMid = allUserConnections.filter(uc => uc.mId === userId);
  const connectionListUserId = allUserConnections.filter(uc => uc.userId === userId);
  const connectionList = [...connectionListMid, ...connectionListUserId].map(obj => (
    obj.userId === userId ? { ...obj, user: findUserDetails(obj.mId) } : { ...obj, user: findUserDetails(obj.userId) }
  ));
  const allBoardUsers = flat(allBoardWithUser.map(b => allDbBoardMembers.filter(bm => bm.boardId === b.id))).map(bm => ({ ...bm, user: findUserDetails(bm.tuserId) }));
  return { allBoard: allBoardWithUser, allBlogs, connectionList, allBoardColumns, allBoardMembers: allBoardUsers };
};
