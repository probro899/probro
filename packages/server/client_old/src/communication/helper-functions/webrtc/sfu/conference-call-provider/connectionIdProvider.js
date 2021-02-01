/* eslint-disable no-throw-literal */
import store from '../../../../../store';

export default () => {
  const { webRtc } = store.getState();
  const { localCallHistory } = webRtc;
  if (localCallHistory) {
    const { chatHistory } = localCallHistory;
    if (chatHistory) {
      const { type, connectionId } = chatHistory;
      if (type && connectionId) {
        const isBorad = type === 'board';
        if (isBorad) {
          return connectionId;
        }
      }
      throw { error: 'Type or connectionId not found in chatHistory', errorCode: 103 };
    }
    throw { error: 'Chat history not found', errorCode: 102 };
  }
  throw { error: 'LocalCallHistory not found', errorCode: 101 };
};
