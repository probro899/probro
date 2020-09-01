/* eslint-disable import/no-cycle */
import closeHandler from './closeHandler';
import store from '../../../../../store';

export default (props, state, time) => {
  const { updateWebRtc } = props;
  // console.log('auto close handler called');
  setTimeout(async () => {
    const { webRtc } = store.getState();
    const { apis } = webRtc;
    if (!webRtc.isLive && !webRtc.localCallHistory.callEnd) {
      closeHandler(props, state, apis)();
      updateWebRtc('showIncommingCall', false);
      updateWebRtc('communicationContainer', 'history');
      // change('history');
    }
  }, time || 60000);
};
