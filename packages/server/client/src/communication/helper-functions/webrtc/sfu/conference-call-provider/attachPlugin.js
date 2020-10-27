/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import janusPlugInAttachment from '../../../../../webrtc/sfu/pluginAttachment';
import eventHandler from './eventListner';
import onErrorHandler from './errorHandler';
import onLocalStreamHandler from './onLocalStreamHandler';
import onRemoteStreamHandler from './onPublisherStream';
import onDataChannelAvailable from './onDataChannelAvailable';
import onDataHandler from './onDataHandler';
import exceptionHandler from './exceptionHandler';

export default async (props) => {
  const { updateWebRtc } = props;
  const { webRtc } = store.getState();
  const { janus } = webRtc.janus;
  const attachPluginRes = await janusPlugInAttachment(
    janus,
    'conferenceCall',
    eventHandler(props),
    onErrorHandler,
    onLocalStreamHandler(props),
    onRemoteStreamHandler(props),
    onDataHandler(props),
    onDataChannelAvailable(props)
  );
  const { conferenceCall, error } = attachPluginRes;
  if (conferenceCall) {
    const updatedWebRtc = store.getState().webRtc;
    await updateWebRtc('janus', { ...updatedWebRtc.janus, conferenceCall });
  }

  if (error) {
    exceptionHandler({ error, errorCode: 142 });
  }
};
