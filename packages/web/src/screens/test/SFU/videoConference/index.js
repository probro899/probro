/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
import adapter from 'webrtc-adapter';
import Janus from '../janus';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.sfutest = null;
    this.opaqueId = "videoroomtest-"+Janus.randomString(12);
    this.myroom = 1234;	// Demo room
    this.myusername = null;
    this.myid = null;
    this.mystream = null;
    // We use this other ID just to map our subscriptions to us
    this.mypvtid = null;
    this.feeds = [];
    this.state = { janus: null, isJanusConnected: false, mypvtid: null, myid: null, remoteStreams: {} };
    this.remoteFeed = null;
  }

  componentWillMount() {
    Janus.init({
      debug: true,
      dependencies: Janus.useDefaultDependencies({ adapter }), // or: Janus.useOldDependencies() to get the behaviour of previous Janus versions
      callback: () => {
        console.log('working fine janus');
      },
    });
    const janus = new Janus(
      {
        server: 'http://properclass.com:8088/janus',
        iceServers: [{ urls: 'turn:properclass.com:3478?transport=tcp', username: 'properclass', credential: 'proper199201' }],
        success: () => {
          // Done! attach to plugin XYZ
          console.log('server is conneted now go for plugin atatachment');
          this.janusAttachment();
        },
        error: (cause) => {
          // Error, can't go on...
          console.error('server config error', cause);
        },
        destroyed: () => {
          // I should get rid of this
        },
      });
    this.setState({ janus });
  }

  componentDidUpdate() {
    const { remoteStreams } = this.state;
    Object.keys(remoteStreams).forEach((id) => {
      const videoElement = document.getElementById(id);
      if (videoElement) {
        videoElement.srcObject = remoteStreams[id].stream;
      }
    });
  }


  janusAttachment = () => {
    const { janus } = this.state;
    janus.attach(
      {
        plugin: 'janus.plugin.videoroom',
        opaqueId: "videoroomtest-"+Janus.randomString(12),
        success: (pluginHandle) => {
          // Plugin attached! 'pluginHandle' is our handle
          console.log('Puligin handle', pluginHandle);
          this.sfutest = pluginHandle;
        },
        error: (cause) => {
          // Couldn't attach to the plugin
          console.error('Faild to attach plugin', cause);
        },
        consentDialog: (on) => {
          // e.g., Darken the screen if on=true (getUserMedia incoming), restore it otherwise
          console.log('consetDialog', on);
        },
        mediaState: (medium, on) => {
          Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
        },
        webrtcState: (on) => {
          Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
        },
        onmessage: (msg, jsep) => {
          // We got a message/event (msg) from the plugin
          // If jsep is not null, this involves a WebRTC negotiation
          console.log('onmessage', msg, jsep);
          const event = msg.videoroom;
          if (event === 'joined') {
            // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
            this.myid = msg.id;
            this.mypvtid = msg.private_id;
            this.setState({ myid: msg.id, mypvtid: msg.private_id });
            console.log('Successfully joined room ', msg.room, 'with ID', this.myid);
            // this.publishOwnFeed(true);
            // Any new feed to attach to?
            if (msg.publishers !== undefined && msg.publishers !== null) {
              const list = msg.publishers;
              console.log('Got a list of available publishers/feeds:', list);
              for (let f = 0; f < list.length; f += 1) {
                const { id, display, audio, video } = list[f];
                this.newRemoteFeed(id, display, audio, video);
              }
            }
          } else if (event === 'event') {
            // Any new feed to attach to?
            if (msg.publishers !== undefined && msg.publishers !== null) {
              const list = msg.publishers;
              Janus.log('Got a list of available publishers/feeds:', list);
              Janus.debug(list);
              for (let f = 0; f < list.length; f += 1) {
                const { id, display, audio, video } = list[f];
                Janus.log("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
                this.newRemoteFeed(id, display, audio, video);
              }
            } else if (msg.leaving !== undefined && msg.leaving !== null) {
              // One of the publishers has gone away?
              const { leaving } = msg;
              Janus.log('Publisher left: ', leaving);
              this.setState({ remoteStreams: { ...this.state.remoteStreams, [leaving]: { leave: true } } });
              let remoteFeed = null;
              for (let i = 1; i < 6; i += 1) {
                if (this.feeds[i] !== null && this.feeds[i] !== undefined && this.feeds[i].rfid === leaving) {
                  remoteFeed = this.feeds[i];
                  break;
                }
              }
              if (remoteFeed != null) {
                Janus.log('Feed ', remoteFeed.rfid, '(', remoteFeed.rfdisplay, ') has left the room, detaching');
                this.feeds[remoteFeed.rfindex] = null;
                remoteFeed.detach();
              }
            } else if (msg.unpublished !== undefined && msg.unpublished !== null) {
              // One of the publishers has unpublished?
              const { unpublished } = msg;
              Janus.log('Publisher left: ', unpublished);
              if (unpublished === 'ok') {
                // That's us
                this.sfutest.hangup();
                return;
              }
              let remoteFeed = null;
              for (let i = 1; i < 6; i += 1) {
                if (this.feeds[i] !== null && this.feeds[i] !== undefined && this.feeds[i].rfid === unpublished) {
                  remoteFeed = this.feeds[i];
                  break;
                }
              }
              if (remoteFeed != null) {
                Janus.log('Feed ', remoteFeed.rfid, ' (', remoteFeed.rfdisplay, ') has left the room, detaching');
                this.feeds[remoteFeed.rfindex] = null;
                remoteFeed.detach();
              }
            }
          } else if (event === 'destroyed') {
            // The room has been destroyed
            console.log('The room has been destroyed!');
          }
          if (jsep !== undefined && jsep !== null) {
            console.log('Handling SDP as well...', jsep);
            this.sfutest.handleRemoteJsep({ jsep });
          }
        },
        onlocalstream: (stream) => {
          // We have a local stream (getUserMedia worked!) to display
          console.log('onlocalStream', stream);
          const myVideo = document.getElementById('my-video');
          myVideo.srcObject = stream;
        },
        onremotestream: (stream) => {
        // We have a remote stream (working PeerConnection!) to
          console.log('onremotestream', stream);
          const rightVideoElment = document.getElementById('right-video');
          rightVideoElment.srcObject = stream;
        },
        oncleanup: () => {
        // PeerConnection with the plugin closed, clean the UI
        // The plugin handle is still valid so we can create a new one
          console.log('onCleanup called');
        },
        detached: () => {
        // Connection with the plugin closed, get rid of its features
        // The plugin handle is not valid anymore
          console.log('clear the stuff after plugin detach');
        },
      });
  }

  joinHandler = () => {
    const { username } = this.state;
    console.log('join handler called', this.myroom, username);
    const register = { request: 'join', room: this.myroom, ptype: "publisher", display: username };
    this.myusername = username;
    this.sfutest.send({ message: register });
  }

  publishOwnFeed = (media) => {
    // Publish our stream
    this.sfutest.createOffer(
      {
        // Add data:true here if you want to publish datachannels as well
        media, // Publishers are sendonly
        success: (jsep) => {
          console.log('Got publisher SDP!', jsep);
          const publish = { request: 'configure', audio: true, video: true };
          this.sfutest.send({ message: publish, jsep });
        },
        error: (error) => {
          console.error('error on publishing own feed', error);
        },
      });
  }



newRemoteFeed = (id, display, audio, video) => {
  // A new feed has been published, create a new plugin handle and attach to it as a subscriber
  let remoteFeed = null;
  const { janus } = this.state;
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
        const subscribe = { request: 'join', room: this.myroom, ptype: "subscriber", feed: id, private_id: this.mypvtid };
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
          console.log('Remote Feed Event', msg);
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
              media: { audioSend: false, videoSend: false }, // We want recvonly audio/video
              success: (jsep) => {
                console.log('Got SDP! in feed answer', jsep);
                const body = { request: 'start', room: this.myroom };
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
        this.setState({ remoteStreams: { ...this.state.remoteStreams, [id]: { id, stream, display, leave: false } } });
        // const remoteVideo = document.getElementById('remote-video');
        // remoteVideo.srcObject = stream;
      },
      oncleanup: () => {
        console.log(' ::: Got a cleanup notification (remote feed ', id, ') :::');
      },
    });
}

  inputHandler = (e) => {
    this.setState({ username: e.target.value });
  }

  onUnPublishHandler = () => {
    const unpublish = { request: 'unpublish' };
    this.sfutest.send({ message: unpublish });
  }

  onHangUp = () => {
    this.sfutest.hangup();
  }

  videoElement = ({ id, display }) => {
    return (
      <div>
        <video
          playsInline
          controlsList="noremoteplayback"
          autoPlay
          id={id}
          controls
          style={{ height: 300, width: 300 }}
        />
        <h2>{display}</h2>
      </div>
    );
  }


  render() {
    const { myid, mypvtid, remoteStreams } = this.state;
    console.log('Remote Streams', this.state);
    return (
      <div>
        <InputGroup onChange={this.inputHandler} placeholder="enter your display name" />
        <Button intent="success" style={{ margin: 10 }} text="Join" onClick={this.joinHandler} />
        {myid && mypvtid && (
        <div>
          <Button
            intent="success"
            style={{ margin: 10 }}
            text="Audio"
            onClick={() => this.publishOwnFeed({ audioRecv: false, videoRecv: false, audioSend: true, videoSend: false })}
          />
          <Button
            intent="success"
            style={{ margin: 10 }}
            text="Video"
            onClick={() => this.publishOwnFeed({ audioRecv: false, videoRecv: false, audioSend: true, videoSend: true })}
          />
          <Button
            intent="success"
            style={{ margin: 10 }}
            text="Screenshare"
            onClick={() => this.publishOwnFeed({ audioRecv: false, videoRecv: false, audioSend: true, video: 'screen' })}
          />
          <Button
            intent="success"
            style={{ margin: 10 }}
            text="Un Publish"
            onClick={this.onUnPublishHandler}
          />
          <Button
            intent="danger"
            style={{ margin: 10 }}
            text="Close Call"
            onClick={this.onHangUp}
          />
        </div>
        )}

        <div>
          <span>local</span>
          <video
            playsInline
            controlsList="noremoteplayback"
            autoPlay
            id="my-video"
            controls
            style={{ height: 300, width: 300 }}
          />
          {Object.values(remoteStreams).filter(obj => !obj.leave).map(sObj => this.videoElement(sObj))}
        </div>
      </div>
    );
  }
}
export default Index;
