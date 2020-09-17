// import findUserDetails from '../../../findUserDetails';
import cacheDatabase from '../../../../../cache/database/cache';
import flat from '../../../../flat';

export default function dispatchUserChatHistory(session, schema, id, connectionId) {
  const dbUserMessages = cacheDatabase.get('UserMessage');
  const dbUserMessageSeenStatus = cacheDatabase.get('UserMessageSeenStatus');
  const userMessages = dbUserMessages.filter(um => um.connectionId === connectionId);
  const userMessageSeenStatus = flat(userMessages.map(um => dbUserMessageSeenStatus.filter(ums => ums.umId === um.id)));
  // const userMessagesWithUser = userMessages.map((um) => {
  //   if (um.tuserId === id) {
  //     return {
  //       ...um,
  //       user: findUserDetails(um.fuserId),
  //     };
  //   }
  //   return {
  //     ...um,
  //     user: findUserDetails(um.tuserId),
  //   };
  // });
  // const finalSeenStatus = userMessageSeenStatus.map(us => ({ ...us, user: findUserDetails(us.userId) }));
  session.dispatch(schema.add('UserMessage', userMessages));
  session.dispatch(schema.add('UserMessageSeenStatus', userMessageSeenStatus));
}
