/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import exceptionHandler from './exceptionHandler';

export default (props) => (msg, jsep) => {
  try {
    const { webRtc } = store.getState();
    console.log('streaming onMessage event called', msg);
    const { localCallHistory } = webRtc;
    const { updateWebRtc } = props;
    const { janus } = webRtc;
    const { result, error, error_code } = msg;

    if (result) {
      if (result.status) {
        const { status } = result;
        if (status === 'starting') {
          console.log('stream starting');
        } else if (status === 'started') {
          console.log('stream started');
        } else if (status === 'stopped') {
          console.log('stream stoped');
        }
      }
    } else if (msg.error) {
      console.error('error in streamer', msg);
    }
    if (jsep) {
      console.log('Handling SDP as well...', jsep);
      const stereo = (jsep.sdp.indexOf('stereo=1') !== -1);
      const { streaming } = janus;
      // Offer from the plugin, let's answer
      streaming.createAnswer(
        {
          jsep,
          media: { audioSend: false, videoSend: false, data: true },
          success: (jsep) => {
            console.debug('Got SDP!', jsep);
            const body = { request: 'start' };
            streaming.send({ message: body, jsep: jsep });
          },
          error: (e) => {
            console.error('WebRTC error:', e);
          },
        });
    }
  } catch (e) {
    exceptionHandler({ error: JSON.stringify(e), errorCode: 138 });
  }
};
