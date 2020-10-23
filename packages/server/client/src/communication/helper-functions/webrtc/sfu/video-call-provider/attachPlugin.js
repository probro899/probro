/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import janusPlugInAttachment from '../../../../../webrtc/sfu/pluginAttachment';
import eventHandler from './eventListner';
import onErrorHandler from './errorHandler';
import onLocalStreamHandler from './onLocalStreamHandler';
import onRemoteStreamHandler from './onRemoteStreamHandler';
import onDataChannelAvailable from './onDataChannelAvailable';
import onDataHandler from './onDataHandler';
import exceptionHandler from './exceptionHandler';

export default async (props) => {
  const { updateWebRtc } = props;
  const { webRtc, account } = store.getState();
  const { janus } = webRtc.janus;
  const attachPluginRes = await janusPlugInAttachment(
    janus,
    'oneToOneCall',
    eventHandler(props),
    onErrorHandler,
    onLocalStreamHandler(props),
    onRemoteStreamHandler(props),
    onDataHandler(props),
    onDataChannelAvailable(props)
  );
  const { oneToOneCall, error } = attachPluginRes;
  const userId = account.user.id;
  if (oneToOneCall) {
    const updatedWebRtc = store.getState().webRtc;
    oneToOneCall.send({ message: { request: 'register', username: `${userId}` } });
    await updateWebRtc('janus', { ...updatedWebRtc.janus, oneToOneCall });
  }
  if (error) {
    exceptionHandler({ error, errorCode: 141 });
  }
};
