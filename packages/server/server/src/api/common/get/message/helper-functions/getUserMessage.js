import cacheDatabase from '../../../../../cache/database/cache';
import flat from '../../../../flat';

export default (id) => {
  const allUserMessages = cacheDatabase.get('UserMessage');
  const allUserMessageSeenStatus = cacheDatabase.get('UserMessageSeenStatus');
  const allUserConnections = cacheDatabase.get('UserConnection');
  const connectionListMid = allUserConnections.filter(uc => uc.mId === id);
  const connectionListUserId = allUserConnections.filter(uc => uc.userId === id);
  const connectionList = [...connectionListMid, ...connectionListUserId];
  const tuserMessage = allUserMessages.filter(um => um.tuserId === id);
  const fuserMessage = allUserMessages.filter(um => um.fuserId === id);
  const userMessages = [...fuserMessage, ...tuserMessage];
  const userMessageSeenStatus = flat(userMessages.map(um => allUserMessageSeenStatus.filter(ums => ums.umId === um.id)));
  return { userMessages, userMessageSeenStatus, connectionList };
};
