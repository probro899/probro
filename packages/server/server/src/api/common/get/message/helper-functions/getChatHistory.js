import schema from '@probro/common/src/schema';
import dispatchUserChatHistory from './dispatchUserChatHistory';
import dispatchBoardHistory from './dispatchBoardChatHistory';

export default function getChatHistory(condition) {
  try {
    const { session } = this;
    // console.log('get chatHistory caled', condition);
    const { id } = session.values.user;
    const { type, connectionId, noOfMessage } = condition;
    let res;
    if (type === 'user') {
      res = dispatchUserChatHistory(session, schema, id, connectionId, noOfMessage);
    }

    if (type === 'board') {
      res = dispatchBoardHistory(session, schema, id, connectionId, noOfMessage);
    }
    return { ...condition, status: 200, noOfMessage: noOfMessage + 20, ...res };
  } catch (e) {
    console.error('Error in getChatHistory', e)
  }
}
