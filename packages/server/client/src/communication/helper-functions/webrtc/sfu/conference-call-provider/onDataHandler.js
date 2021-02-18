/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import callUpgrader from './callUpgrader';

export default (props) => (data) => {
  // console.log('Data in dataHandler', JSON.parse(data), props);
  const { updateWebRtc, updateDatabaseSchema } = props;
  const { webRtc, database } = store.getState();
  const jsData = JSON.parse(data);
  const { uid, type, callType } = jsData;
  if (jsData.callType) {
    const { connectedUsers } = webRtc;
    const connectedUser = connectedUsers[jsData.uid];
    const currentMediaType = webRtc.connectedUsers[jsData.uid].type;
    if (type === 'callUpgrade') {
      const { localCallHistory } = webRtc;
      const { mediaType } = localCallHistory;
      if (mediaType === 'video' || mediaType === 'screenshare') {
        callUpgrader(localCallHistory.chatHistory.connectionId, 'audio', true);
        updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, mediaType: 'audio', callEnd: false });
      }

      // update activeUser in board if not updated
      const currentActiveBoard = database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId];
      if (currentActiveBoard.activeStatus !== uid) {
        updateDatabaseSchema('Board', { id: currentActiveBoard.id, activeStatus: uid });
      }
    }
    if (connectedUser) {
      if (connectedUser.type !== jsData.callType) {
        if (currentMediaType !== 'video' || currentMediaType !== 'screenshare') {
          updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [uid]: { ...webRtc.connectedUsers[jsData.uid], type: callType } });
        }
      }
    }
  }
};
