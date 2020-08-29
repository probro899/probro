import lodash from 'lodash';
import flat from '../../../api/flat';
import cacheDatabase from '../cache';

export default (id) => {
  let connectionListMid = [];
  let connectionListUserId = [];
  const allUserConnections = cacheDatabase.get('UserConnection');
  connectionListMid = allUserConnections.filter(uc => uc.mId === id);
  connectionListUserId = allUserConnections.filter(uc => uc.userId === id);
  const connectionList = [...connectionListMid, ...connectionListUserId];
  const allConnectionUserList = lodash.uniq(flat(connectionList.map(obj => [obj.mId, obj.userId])));
  // console.log('allConnecitonUserList', allConnectionUserList);
  return { connectionList, allConnectionUserList };
};
