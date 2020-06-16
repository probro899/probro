/* eslint-disable prefer-const */
import store from '../../../../../store';
import Janus from '../../../../../webrtc/sfu/janus';

export default (publisher, props) => {
  const { webRtc, database } = store.getState();
  let { display, id, audio, video } = publisher;
  const { localCallHistory, janus } = webRtc;
  const roomId = localCallHistory.chatHistory.connectionId;
  const { updateWebRtc } = props;
  const { joinToken } = database.Board.byId[roomId];
  Janus.log('Remote Handler called', publisher, janus);
  let remoteFeed;
  janus.janus.attach(
    {
      plugin: 'janus.plugin.videoroom',
      // opaqueId: opaqueId,
      success: (pluginHandle) => {
        remoteFeed = pluginHandle;

        const subscribe = { request: 'join', room: roomId, ptype: 'subscriber', feed: id, pin: joinToken };
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
        Janus.error('  -- Error attaching plugin...', error);
      },
      onmessage: (msg, jsep) => {
        Janus.log(' ::: Got a message (subscriber) :::', msg);
        const event = msg.videoroom;
        Janus.log('Event: ', event);
        if (msg.error) {
          Janus.log(`${display}) Error`, msg.error);
        } else if (event) {
          Janus.log(display, 'Remote Feed Event', msg);
          if (event === 'attached') {
            // Subscriber created and attached
            Janus.log(`${display}) Plugin attached`);
            // updateWebRtc('connectedUsers', { ...webRtc.connectedUsers, [display]: { ...webRtc.connectedUsers[display], streams: [], publisherId: id, uid: display } });
          }
        }
        if (jsep) {
          Janus.log(display, 'Handling SDP as well in subscriber feed...', jsep);
          // Answer and attach
          remoteFeed.createAnswer(
            {
              jsep,
              // Add data:true here if you want to subscribe to datachannels as well
              // (obviously only works if the publisher offered them in the first place)
              media: { audioSend: false, videoSend: false, data: true }, // We want recvonly audio/video
              success: (jsep) => {
                Janus.log(display, 'Got SDP! in feed answer', jsep);
                const body = { request: 'start', room: roomId };
                remoteFeed.send({ message: body, jsep });
              },
              error: (error) => {
                Janus.error('WebRTC error:', error);
              },
            }
          );
        }
      },
      webrtcState: (on) => {
        Janus.log('Janus says this WebRTC PeerConnection', display, 'is', on ? 'up' : 'down', ' now');
      },
      onlocalstream: (stream) => {
        // The subscriber stream is recvonly, we don't expect anything here
      },
      onremotestream: (stream) => {
        Janus.log(display, 'Remote stream');
        const { webRtc } = store.getState();
        updateWebRtc('connectedUsers',
          {
            ...webRtc.connectedUsers,
            [display]: {
              ...webRtc.connectedUsers[display],
              streams: webRtc.connectedUsers[display] ? [...webRtc.connectedUsers[display].streams, stream] : [stream],
            },
          });
        updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, startTime: webRtc.localCallHistory.startTime || Date.now() });
      },
      oncleanup: () => {
        Janus.log(' ::: Got a cleanup notification (remote feed ', id, ') :::');
      },
    }
  );
};
