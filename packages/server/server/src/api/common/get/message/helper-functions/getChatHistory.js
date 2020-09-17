import schema from '@probro/common/src/schema';
import dispatchUserChatHistory from './dispatchUserChatHistory';
import dispatchBoardHistory from './dispatchBoardChatHistory';

export default function getChatHistory(condition) {
  const { session } = this;
  console.log('get chatHistory caled', condition);
  const { id } = session.values.user;
  const { type, connectionId } = condition;
  if (type === 'user') {
    dispatchUserChatHistory(session, schema, id, connectionId);
  }

  if (type === 'board') {
    dispatchBoardHistory(session, schema, id, connectionId);
  }

  return { ...condition, status: 200 };
}
