import store from '../../../../../store';

export default props => (data) => {
  const { updateWebRtc } = props;
  const { webRtc, account } = store.getState();
  const jsData = JSON.parse(data);
  console.log('Data in dataHandler', JSON.parse(data));
  if (jsData.callType) {
    const { connectedUsers } = webRtc;
    if (connectedUsers[jsData.uid].type !== jsData.callType) {
      updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [jsData.uid]: { ...webRtc.connectedUsers[jsData.uid], type: jsData.callType } });
      webRtc.janus.oneToOneCall.data({ text: JSON.stringify({ callType: webRtc.localCallHistory.mediaType, uid: account.user.id }) });
    }
  }
};
