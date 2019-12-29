import store from '../../../../store';
import createPcForEachUser from './createPcForEachUser';

export default (props, state) => async (apis, stream) => {
  console.log('call handler called', stream);
  try {
    let { webRtc } = store.getState();
    const { updateWebRtc, account } = props;
    if (!webRtc.isLive) {
      await createPcForEachUser(webRtc.showCommunication, props, state);
    }
    // eslint-disable-next-line
    webRtc = store.getState().webRtc;
    updateWebRtc('communicationContainer', 'connecting');
    updateWebRtc('showOutgoingCall', true);
    const pcs = Object.values(webRtc.peerConnections);
    const users = Object.keys(webRtc.peerConnections);
    const pcsPromises = pcs.map(pc => pc.pc.createOffer(stream));
    await Promise.all(pcsPromises);
  } catch (e) {
    console.error('error in CallHandler', e);
  }
};
