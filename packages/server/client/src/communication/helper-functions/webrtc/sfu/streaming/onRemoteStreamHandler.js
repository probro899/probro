/* eslint-disable no-undef */
import store from '../../../../../store';

export default props => async (stream) => {
  const { updateWebRtc } = props;
  const { webRtc } = store.getState();
  await updateWebRtc('remoteStream', stream);
  const element = document.getElementById('remote-stream');
  console.log('onRemoteStream handler', stream, element);
  element.srcObject = stream;
  // console.log('remote stream handler', userId, store.getState().webRtc);
};
