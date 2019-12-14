import lodash from 'lodash';
import flat from '../../../api/flat';

export default async (find, id) => {
  let connectionListMid = [];
  let connectionListUserId = [];
  connectionListMid = await find('UserConnection', { mId: id });
  connectionListUserId = await find('UserConnection', { userId: id });
  const connectionList = [...connectionListMid, ...connectionListUserId];
  const allConnectionUserList = lodash.uniq(flat(connectionList.map(obj => [obj.mId, obj.userId])));
  // console.log('allConnecitonUserList', allConnectionUserList);
  return { connectionList, allConnectionUserList };
};
