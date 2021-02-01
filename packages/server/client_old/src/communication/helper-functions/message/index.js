/* eslint-disable no-lonely-if */
import sendUserMessage from './sendUserMessage';
import sendBoardMessage from './sendBoardMessage';

const updateStore = (props, id, todo, tempId, status) => {
  const { webRtc, addDatabaseSchema, message, account, deleteDatabaseSchema } = props;
  if (webRtc.chatHistory.type === 'board') {
    if (todo === 'add') {
      addDatabaseSchema('BoardMessage',
        {
          id,
          boardId: webRtc.chatHistory.connectionId,
          message,
          userId: account.user.id,
          timeStamp: Date.now(),
          url: null,
          remarks: null,
          readStatus: 0,
          status: 'loading',
        });
    } else {
      deleteDatabaseSchema('BoardMessage', { id: tempId });
      addDatabaseSchema('BoardMessage',
        {
          id,
          boardId: webRtc.chatHistory.connectionId,
          message,
          userId: account.user.id,
          timeStamp: Date.now(),
          url: null,
          remarks: null,
          readStatus: 0,
          status,
        });
    }
  } else {
    if (todo === 'add') {
      addDatabaseSchema('UserMessage', {
        id,
        tuserId: webRtc.chatHistory.user.user.id,
        fuserId: account.user.id,
        timeStamp: Date.now(),
        connectionId: webRtc.chatHistory.connectionId,
        message,
        url: null,
        readStatus: 0,
        status: 'loading',
      });
    } else {
      deleteDatabaseSchema('UserMessage', { id: tempId });
      addDatabaseSchema('UserMessage', {
        id,
        tuserId: webRtc.chatHistory.user.user.id,
        fuserId: account.user.id,
        timeStamp: Date.now(),
        connectionId: webRtc.chatHistory.connectionId,
        message,
        url: null,
        readStatus: 0,
        status,
      });
    }
  }
};

export default async function sendMessage(props) {
  // console.log('props in sendMessage', props);
  const { resend, deleteDatabaseSchema } = props;
  if (resend) {
    deleteDatabaseSchema('UserMessage', { id: resend });
  }
  const tempId = Date.now();
  const { webRtc } = props;
  if (webRtc.chatHistory.type === 'board') {
    updateStore(props, tempId, 'add');
    const boardMessageRes = await sendBoardMessage(props);
    if (boardMessageRes) {
      updateStore(props, boardMessageRes, 'deleteAdd', tempId);
    } else {
      updateStore(props, boardMessageRes, 'deleteAdd', tempId, 'error');
    }
  } else {
    updateStore(props, tempId, 'add');
    const userMessageRes = await sendUserMessage(props);
    if (userMessageRes) {
      updateStore(props, userMessageRes, 'deleteAdd', tempId);
    } else {
      updateStore(props, userMessageRes, 'deleteAdd', tempId, 'error');
    }
  }
}
