import store from '../../../../../store';

export default props => (data) => {
  console.log('onDataChannelAvailableHandler called');
  // const { webRtc, account } = store.getState();
  // const { janus, localCallHistory } = webRtc;
  // janus.oneToOneCall.data({ text: JSON.stringify({ callType: localCallHistory.mediaType, uid: account.user.id }) });
};
