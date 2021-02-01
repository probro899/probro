import store from '../../../../../store';

const setResetForStreamUpdate = async (props) => {
  const { updateWebRtc } = props;
  const { webRtc } = store.getState();
  if (!webRtc.updateStream) {
    await updateWebRtc('updateStream', true);
    setTimeout(() => {
      updateWebRtc('updateStream', false);
    }, 5000);
  }
};

export default props => (data) => {
  const { updateWebRtc } = props;
  const { webRtc, account } = store.getState();
  const jsData = JSON.parse(data);
  // console.log('Data in dataHandler', JSON.parse(data));
  if (jsData.callType) {
    const { connectedUsers } = webRtc;
    const connectedUser = connectedUsers[jsData.uid];
    if (connectedUser) {
      setResetForStreamUpdate(props);
      if (connectedUser.type !== jsData.callType) {
        updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [jsData.uid]: { ...webRtc.connectedUsers[jsData.uid], type: jsData.callType } });
        webRtc.janus.oneToOneCall.data({ text: JSON.stringify({ callType: webRtc.localCallHistory.mediaType, uid: account.user.id }) });
      }
    }
  }
};
