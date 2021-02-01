import cacheDatabase from '../../../../../cache/database/cache';
import flat from '../../../../flat';

export default function dispatchUserChatHistory(session, schema, id, connectionId, noOfMessage) {
  // console.log('dispatchUser called', connectionId, noOfMessage);
  const dbUserMessages = cacheDatabase.get('UserMessage');
  const dbUserMessageSeenStatus = cacheDatabase.get('UserMessageSeenStatus');
  const userMessages = dbUserMessages.filter(um => um.connectionId === connectionId);
  const userMessageSeenStatus = flat(userMessages.map(um => dbUserMessageSeenStatus.filter(ums => ums.umId === um.id)));
  let slice1 = userMessages.length - (parseInt(noOfMessage, 10) + 20);
  if ((slice1 < 20 && slice1 > 0) || slice1 < 0) {
    slice1 = 0;
  }

  if (slice1 >= 0) {
    const slice2 = userMessages.length - parseInt(noOfMessage, 10);
    const dataTobeSend = userMessages.slice(slice1, slice2);
    session.dispatch(schema.add('UserMessageSeenStatus', userMessageSeenStatus));
    session.dispatch(schema.add('UserMessage', dataTobeSend));
  }
  return { totalMessage: userMessages.length };
}
