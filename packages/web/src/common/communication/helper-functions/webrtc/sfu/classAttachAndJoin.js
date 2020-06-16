import store from '../../../../../store';
import pluginAttachment from '../../../../../webrtc/sfu/pluginAttachment';
import onCloseHandler from './onCloseHandler';
import onMessageEventHandler from './onMessageEventHandler';
import onErrorHandler from './onErrorHandler';
import onLocalStreamHandler from './onLocalStreamHandler';
import onRemoteStreamHandler from './onRemoteStreamHandler';
import onDataHandler from './onDataHandler';
import onDataChannelAvailable from './onDataChannelAvailable';

export default (state, props) => {
  const { updateWebRtc } = props;
  const { janus } = store.getState().webRtc;
  pluginAttachment(
    janus.janus,
    'conferenceCall',
    onMessageEventHandler(props),
    onErrorHandler,
    onLocalStreamHandler(props),
    onRemoteStreamHandler(props),
    onCloseHandler(props),
    updateWebRtc,
    onDataHandler(props),
    onDataChannelAvailable(props),
    true
  );
};
