/* eslint-disable import/no-cycle */
import store from '../../../../store';
import janusInit from './init';

export default async (props) => {
  const { webRtc } = store.getState();
  const janusObj = webRtc.janus;
  if (janusObj) {
    const { janus } = janusObj;
    if (janus) {
      const isJanusConnected = janus.isConnected();
      if (isJanusConnected) {
        return isJanusConnected;
      }
      await janus.reconnect();
      return true;
    }
    await janusInit(props);
    return true;
  }
};
