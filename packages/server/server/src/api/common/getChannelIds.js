import _ from 'lodash';
import databaseCache from '../../cache/database/cache';
import findUserDetails from './findUserDetails';
import flat from '../flat';
import getBoardLastActivity from './getBoardLastActivity';
import getAppointment from './getAppointment';
import getOrganizations from './get/schema/organization/getOrganizations';

export default async (userId, schema) => {
  try {
    const allDbBoardMembers = databaseCache.get('BoardMember');
    const allBoardMember = allDbBoardMembers.filter(bm => bm.tuserId === userId && !bm.deleteStatus);
    const allBoardTable = databaseCache.get('Board');
    let allBoardWithUser = allBoardMember.map(bm => allBoardTable.find(b => b.id === bm.boardId)).map(b => ({ ...b, appointments: getAppointment(b.id), user: findUserDetails(b.userId) }));
    allBoardWithUser = allBoardWithUser.filter(b => !b.deleteStatus);
    const lastActivityPromises = [];
    allBoardWithUser.forEach((b) => {
      lastActivityPromises.push(getBoardLastActivity(b.id));
    });
    const lastActivityPromisesRes = flat(await Promise.all(lastActivityPromises));
    allBoardWithUser = allBoardWithUser.map((b, idx) => ({ ...b, lastActivity: lastActivityPromisesRes[idx] ? lastActivityPromisesRes[idx].timeStamp : 0 }));
    allBoardWithUser = _.orderBy(allBoardWithUser, ['lastActivity'], ['desc']);
    if (schema === 'Board') {
      return { allBoard: allBoardWithUser };
    }
    const allBlogs = databaseCache.get('Blog').filter(b => b.userId === userId).map(b => ({ ...b, user: findUserDetails(b.userId) }));
    const allBoardColumnTable = databaseCache.get('BoardColumn');
    const allBoardColumns = flat(allBoardWithUser.map(b => allBoardColumnTable.filter(c => c.boardId === b.id)));
    const allUserConnections = databaseCache.get('UserConnection');
    const connectionListMid = allUserConnections.filter(uc => (uc.mId === userId));
    const connectionListUserId = allUserConnections.filter(uc => (uc.userId === userId));
    const connectionList = [...connectionListMid, ...connectionListUserId].map(obj => (
      obj.userId === userId ? { ...obj, user: findUserDetails(obj.mId) } : { ...obj, user: findUserDetails(obj.userId) }
    ));
    const allBoardUsers = flat(allBoardWithUser.map(b => allDbBoardMembers.filter(bm => bm.boardId === b.id))).map(bm => ({ ...bm, user: findUserDetails(bm.tuserId) }));
    // getting organization where need to subscribe
    const allOrganization = getOrganizations(userId);
    const finalOrganizations = allOrganization.filter(o => o.role === 'admin' || o.role === 'manager');

    return {
      allBoard: allBoardWithUser,
      allBlogs,
      connectionList,
      allBoardColumns,
      allBoardMembers: allBoardUsers,
      allOrganization: finalOrganizations,
    };
  } catch (e) {
    console.error('Error in getChannelIds', e);
  }
};
