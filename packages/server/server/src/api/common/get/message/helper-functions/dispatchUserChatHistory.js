import cacheDatabase from '../../../../../cache/database/cache';
import flat from '../../../../flat';

export default function dispatchUserChatHistory(session, schema, id, connectionId) {
  const dbUserMessages = cacheDatabase.get('UserMessage');
  const dbUserMessageSeenStatus = cacheDatabase.get('UserMessageSeenStatus');
  const userMessages = dbUserMessages.filter(um => um.connectionId === connectionId);
  const userMessageSeenStatus = flat(userMessages.map(um => dbUserMessageSeenStatus.filter(ums => ums.umId === um.id)));
  session.dispatch(schema.add('UserMessageSeenStatus', userMessageSeenStatus));
  session.dispatch(schema.add('UserMessage', userMessages));
}
