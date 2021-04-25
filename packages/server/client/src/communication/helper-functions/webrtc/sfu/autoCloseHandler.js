/* eslint-disable import/no-cycle */
import closeHandler from './closeHandler';
import store from '../../../../store';

export default (props, state, time) => {
  const { updateWebRtc } = props;
  setTimeout(async () => {
    const { webRtc } = store.getState();
    const { apis } = webRtc;
    if (!webRtc.isLive &&(webRtc.showOutgoingCall || webRtc.showIncommingCall)) {
      closeHandler(props, state, apis)();
    }
  }, time || 60000);
};
