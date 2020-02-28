import cacheDatabase from '../cache';

export default (id) => {
  const allUserMessages = cacheDatabase.get('UserMessage');
  const tuserMessage = allUserMessages.filter(um => um.tuserId === id);
  const fuserMessage = allUserMessages.filter(um => um.fuserId === id);
  const userMessages = [...fuserMessage, ...tuserMessage];
  // console.log('all User messge', userMessages);
  const userMessageSeenStatus = userMessages.map(um => cacheDatabase.get('UserMessageSeenStatus').filter(ums => ums.umId === um.id));
  // console.log('getUser message res', userMessages, userMessageSeenStatus);
  return { userMessages, userMessageSeenStatus };
};
