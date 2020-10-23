/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import closeHandler from '../closeHandler';
import exceptionHandler from './exceptionHandler';

export default async (props, unpublishedId) => {
  try {
    const { webRtc } = store.getState();
    const { updateWebRtc } = props;
    const { apis, localCallHistory } = webRtc;
    if (localCallHistory) {
      const { chatHistory } = localCallHistory;
      if (chatHistory) {
        const boardId = chatHistory.connectionId;
        const ids = Object.keys(webRtc.connectedUsers);
        const values = Object.values(webRtc.connectedUsers);
        const idx = values.findIndex(obj => obj.publisherId === unpublishedId);
        const newIds = [...ids.slice(0, idx), ...ids.slice(idx + 1)];
        const newValues = [...values.slice(0, idx), ...values.slice(idx + 1)];
        const newConnectedUsers = newIds.reduce((t, e, index) => {
          t[e] = newValues[index];
          return t;
        }, {});

        await updateWebRtc('connectedUsers', newConnectedUsers);

        if (newValues.length < 2) {
          closeHandler(props)();
          if (apis) {
            apis.closeSfuCall({ id: boardId, activeStatus: null });
          }
        }
      } else {
        throw 'chatHistory not found';
      }
    } else {
      throw 'localCallHistory not found';
    }
  } catch (e) {
    exceptionHandler({ error: e, errorCode: 124 });
  }
};
