/* eslint-disable jsx-a11y/media-has-caption */
import adapter from 'webrtc-adapter';
import React from 'react';
import Janus from '../janus';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {janus: null, isJanusConnected: false };
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
          this.setState({ isJanusConnected: true });
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

  janusAttachment = () => {
    const janus = this.state.janus;
    let echotest = null;
    janus.attach(
      {
        plugin: 'janus.plugin.echotest',
        success: (pluginHandle) => {
          // Plugin attached! 'pluginHandle' is our handle
          console.log('Puligin handle', pluginHandle);

          echotest = pluginHandle;
          const body = { audio: true, video: true };
          echotest.send({ message: body });
          echotest.createOffer(
            {
              // No media property provided: by default,
              // it's sendrecv for audio and
              media: {video: true, audio: true },
              success: (jsep) => {
                // Got our SDP! Send our OFFER to the plugin
                echotest.send({ message: body, jsep: jsep });
              },
              error: (error) => {
                // An error occurred...
                console.error('Error creatign offer', error);
              },
              customizeSdp: (jsep) => {
                // if you want to modify the original sdp, do as the following
                // oldSdp = jsep.sdp;
                // jsep.sdp = yourNewSdp;
              },
            });
        },
        error: (cause) => {
          // Couldn't attach to the plugin
          console.error('Faild to attach plugin', cause);
        },
        consentDialog: (on) => {
          // e.g., Darken the screen if on=true (getUserMedia incoming), restore it otherwise
          console.log('consetDialog', on);
        },
        onmessage: (msg, jsep) => {
          // We got a message/event (msg) from the plugin
          // If jsep is not null, this involves a WebRTC negotiation
          console.log('onmessage', msg, jsep);
          if (jsep !== undefined && jsep !== null) {
            // We have the ANSWER from the plugin
            echotest.handleRemoteJsep({jsep: jsep});
          }
        },
        onlocalstream: (stream) => {
          // We have a local stream (getUserMedia worked!) to display
          console.log('onlocalStream', stream);
          const leftVideoElment = document.getElementById('left-video');
          leftVideoElment.srcObject = stream;
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

  render() {
    const { isJanusConnected } = this.state;
    if (isJanusConnected) {
      this.janusAttachment();
    }
    return (
      <div>
        <span>local</span>
        <video
          playsInline
          controlsList="noremoteplayback"
          autoPlay
          id="left-video"
          style={{ height: 300, width: 300 }}
        />
        <span>remote</span>
        <video
          playsInline
          controlsList="noremoteplayback"
          autoPlay
          id="right-video"
          style={{ height: 300, width: 300 }}
        />
      </div>
    );
  }
}

export default Index;
