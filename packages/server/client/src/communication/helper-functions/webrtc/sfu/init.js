import janusInit from '../../../../webrtc/sfu';
import onCloseHandler from './onCloseHandler';
import onMessageEventHandler from './onMessageEventHandler';
import onErrorHandler from './onErrorHandler';
import onLocalStreamHandler from './onLocalStreamHandler';
import onRemoteStreamHandler from './onRemoteStreamHandler';
import onDataHandler from './onDataHandler';
import onDataChannelAvailable from './onDataChannelAvailable';

export default (props, state) => {
  const { updateWebRtc } = props;
  janusInit(
    onMessageEventHandler(props, state),
    onErrorHandler,
    onLocalStreamHandler(props),
    onRemoteStreamHandler(props),
    onCloseHandler(props),
    updateWebRtc,
    onDataHandler(props),
    onDataChannelAvailable(props)
  );
  // console.log('janus init res', janusInitRes);
};
