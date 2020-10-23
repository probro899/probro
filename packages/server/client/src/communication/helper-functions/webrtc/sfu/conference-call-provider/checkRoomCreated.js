import store from '../../../../../store';

export default () => {
  const { webRtc } = store.getState();
  const { janus } = webRtc;
  if (janus) {
    const { conferenceCall } = janus;
    if (conferenceCall) {
      const isConferenceConnected = conferenceCall.session.isConnected();
      if (isConferenceConnected) {
        return conferenceCall;
      }
      throw { error: 'Conference call session is not connected', errorCode: 108 };
    }
    throw { error: 'Conference Call not created', errorCode: 107 };
  }
  throw { error: 'Janus not found in store', errorCode: 106 };
};
