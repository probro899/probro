import store from '../../../../store';
import closeHanlder from './closeHandler';

export default (props, msg) => {
  const { webRtc } = store.getState();
  console.log('callAcceptHandler', webRtc);
  const { updateWebRtc } = props;
  updateWebRtc('isLive', true);
  updateWebRtc('showIncommingCall', false);
  updateWebRtc('communicationContainer', 'connecting');
};
