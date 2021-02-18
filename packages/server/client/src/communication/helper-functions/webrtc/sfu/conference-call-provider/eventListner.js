/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import unpublishedHandler from './unpublishedHandler';
import createOffer from './createOffer';
import publisherHandler from './publishersHandler';
import exceptionHandler from './exceptionHandler';

export default (props) => async (msg, jsep) => {
  try {
    // console.log('event listner in conference call', msg);
    const { updateWebRtc } = props;
    const { videoroom, error, error_code } = msg;
    const event = videoroom;
    const { webRtc } = store.getState();
    const { janus } = webRtc;
    const { conferenceCall } = janus;
    if (event === 'joined') {
      const createOfferRes = await createOffer(conferenceCall);
      if (createOfferRes.error) {
        throw createOfferRes;
      }
      publisherHandler(msg, props);
      await updateWebRtc('janus', { ...webRtc.janus, joinStatus: true });
    } else if (event === 'event') {
      const { unpublished } = msg;
      publisherHandler(msg, props);
      if (unpublished) {
        unpublishedHandler(props, unpublished);
      }
    }
    if (jsep) {
      if (jsep.type === 'answer') {
        conferenceCall.handleRemoteJsep({ jsep });
      }
    }
    if (error_code && error) {
      throw error;
    }
  } catch (e) {
    console.error('Error in event listner', e);
    exceptionHandler({ error: JSON.stringify(e), errorCode: 115 });
  }
};
