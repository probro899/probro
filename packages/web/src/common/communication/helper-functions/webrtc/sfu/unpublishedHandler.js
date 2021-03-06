/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import closeHandler from './closeHandler';

export default (props, unpublishedId) => {
  try {
    const { webRtc } = store.getState();
    const { updateWebRtc } = props;
    const { apis, localCallHistory } = webRtc;
    const boardId = localCallHistory.chatHistory.connectionId;
    const ids = Object.keys(webRtc.connectedUsers);
    const values = Object.values(webRtc.connectedUsers);
    const idx = values.findIndex(obj => obj.publisherId === unpublishedId);
    const newIds = [...ids.slice(0, idx), ...ids.slice(idx + 1)];
    const newValues = [...values.slice(0, idx), ...values.slice(idx + 1)];
    const newConnectedUsers = newIds.reduce((t, e, index) => {
      t[e] = newValues[index];
      return t;
    }, {});
    updateWebRtc('connectedUsers', newConnectedUsers);
    // console.log('Un published handler called  after', newConnectedUsers);
    if (newValues.length < 2) {
      closeHandler(props)();
      if (apis) {
        apis.closeSfuCall({ id: boardId, activeStatus: null });
      }
    }
  } catch (e) {
    console.error('Problem in sfuclose call', e);
  }
};
