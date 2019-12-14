export default async (find, id) => {
  const tuserMessage = await find('UserMessage', { tuserId: id });
  const fuserMessage = await find('UserMessage', { fuserId: id });
  const userMessages = [...fuserMessage, ...tuserMessage];
  const userMessageSeenStatusPromises = [];
  userMessages.forEach(um => userMessageSeenStatusPromises.push(find('UserMessageSeenStatus', { umId: um.id })));
  const userMessageSeenStatus = await Promise.all(userMessageSeenStatusPromises);
  return { userMessages, userMessageSeenStatus };
};
