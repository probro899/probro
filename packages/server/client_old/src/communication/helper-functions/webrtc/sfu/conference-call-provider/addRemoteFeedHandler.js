/* eslint-disable import/no-cycle */
/* eslint-disable prefer-const */
import store from '../../../../../store';
import Janus from '../../../../../webrtc/sfu/janus';
import onRemoteFeedMessageHandler from './onRemoteFeedMessageHandler';
import onPublisherStream from './onPublisherStream';
import exceptionHandler from './exceptionHandler';
import onDataHandler from './onDataHandler';

export default (publisher, props) => {
  try {
    const { webRtc, database } = store.getState();
    let { display, id, audio, video } = publisher;
    const { localCallHistory, janus } = webRtc;
    const roomId = localCallHistory.chatHistory.connectionId;
    const { updateWebRtc } = props;
    const { joinToken } = database.Board.byId[roomId];
    let remoteFeed;
    janus.janus.attach(
      {
        plugin: 'janus.plugin.videoroom',
        // opaqueId: opaqueId,
        success: (pluginHandle) => {
          remoteFeed = pluginHandle;
          const subscribe = { request: 'join', room: roomId, ptype: 'subscriber', feed: id, pin: joinToken, data: true };
          if (Janus.webRTCAdapter.browserDetails.browser === 'safari' && (video === 'vp9' || (video === 'vp8' && !Janus.safariVp8))) {
            if (video) {
              video = video.toUpperCase();
            }
            Janus.error('Publisher is using ', video, ', but Safari doesnt support it: disabling video');
            subscribe.offer_video = false;
          }
          remoteFeed.videoCodec = video;
          remoteFeed.send({ message: subscribe });
          updateWebRtc('janus', { ...webRtc.janus, remoteFeeds: { ...webRtc.janus.remoteFeeds, [id]: remoteFeed } });
          updateWebRtc('connectedUsers', { ...store.getState().webRtc.connectedUsers, [display]: { ...webRtc.connectedUsers[display], streams: [], publisherId: id, uid: display } });
        },
        error: (error) => {
          exceptionHandler({ error, errorCode: 118 });
        },
        onmessage: (msg, jsep) => {
          onRemoteFeedMessageHandler(msg, jsep, remoteFeed, roomId);
        },
        webrtcState: (on) => {
          Janus.log('Janus says this WebRTC PeerConnection', display, 'is', on ? 'up' : 'down', ' now');
        },
        onremotestream: (stream) => {
          onPublisherStream(stream, display, updateWebRtc);
        },
        oncleanup: () => {
          Janus.log(' ::: Got a cleanup notification (remote feed ', id, ') :::');
        },
        ondata: onDataHandler(props),
      }
    );
  } catch (e) {
    console.log('error in remote feed handler', e);
    exceptionHandler({ error: JSON.stringify(e), errorCode: 117 });
  }
};
