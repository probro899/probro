
export default function newRemoteFeed({ Janus, janus, mypvtid, myroom, feeds }, { id, display, audio, video }) {
// A new feed has been published, create a new plugin handle and attach to it as a subscriber
  let remoteFeed = null;
  janus.attach(
    {
      plugin: 'janus.plugin.videoroom',
      // opaqueId: opaqueId,
      success: (pluginHandle) => {
        remoteFeed = pluginHandle;
        remoteFeed.simulcastStarted = false;
        console.log('Plugin attached! (', remoteFeed.getPlugin(), 'id=', remoteFeed.getId(), ')');
        console.log('  -- This is a subscriber');
        // We wait for the plugin to send us an offer
        const subscribe = { request: 'join', room: myroom, ptype: 'subscriber', feed: id, private_id: mypvtid };
        // In case you don't want to receive audio, video or data, even if the
        // publisher is sending them, set the 'offer_audio', 'offer_video' or
        // 'offer_data' properties to false (they're true by default), e.g.:
        // 		subscribe["offer_video"] = false;
        // For example, if the publisher is VP8 and this is Safari, let's avoid video
        if (Janus.webRTCAdapter.browserDetails.browser === 'safari' &&
            (video === 'vp9' || (video === 'vp8' && !Janus.safariVp8))) {
          if (video) video = video.toUpperCase();
          console.error('Publisher is using ', video, ', but Safari doesnt support it: disabling video');
          subscribe.offer_video = false;
        }
        remoteFeed.videoCodec = video;
        remoteFeed.send({ message: subscribe });
      },
      error: (error) => {
        console.error('  -- Error attaching plugin...', error);
      },
      onmessage: (msg, jsep) => {
        console.log(' ::: Got a message (subscriber) :::', msg);
        const event = msg.videoroom;
        console.log('Event: ', event);
        if (msg.error !== undefined && msg.error !== null) {
          console.error(msg.error);
        } else if (event != undefined && event != null) {
          if (event === 'attached') {
            // Subscriber created and attached
            console.log('create element for remote video');
          } else if (event === 'event') {
            // Check if we got an event on a simulcast-related event from this publisher
            const { substream } = msg;
            const  { temporal } = msg;
            if ((substream !== null && substream !== undefined) || (temporal !== null && temporal !== undefined)) {
              console.log('do simulcatd related work');
              if (!remoteFeed.simulcastStarted) {
                remoteFeed.simulcastStarted = true;
                // Add some new buttons
                // addSimulcastButtons(remoteFeed.rfindex, remoteFeed.videoCodec === "vp8" || remoteFeed.videoCodec === "h264");
              }
              // We just received notice that there's been a switch, update the buttons
              // updateSimulcastButtons(remoteFeed.rfindex, substream, temporal);
            }
          } else {
            // What has just happened?
          }
        }
        if (jsep !== undefined && jsep !== null) {
          console.log('Handling SDP as well in subscriber feed...', jsep);
          // Answer and attach
          remoteFeed.createAnswer(
            {
              jsep,
              // Add data:true here if you want to subscribe to datachannels as well
              // (obviously only works if the publisher offered them in the first place)
              media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
              success: (jsep) => {
                console.log('Got SDP! in feed answer', jsep);
                const body = { request: 'start', room: myroom };
                remoteFeed.send({ message: body, jsep });
              },
              error: (error) => {
                console.error('WebRTC error:', error);
              },
            });
        }
      },
      webrtcState: (on) => {
        console.log("Janus says this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") is " + (on ? "up" : "down") + " now");
      },
      onlocalstream: (stream) => {
        // The subscriber stream is recvonly, we don't expect anything here
      },
      onremotestream: (stream) => {
        console.log('Remote feed #', remoteFeed.rfindex);
        console.log('remote stream', stream);
        const remoteVideo = document.getElementById('remote-video');
        remoteVideo.srcObject = stream;
      },
      oncleanup: () => {
        console.log(' ::: Got a cleanup notification (remote feed ', id, ') :::');
      },
    });
}
