/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import adapter from 'webrtc-adapter';
import Janus from '../janus';
import { InputGroup, Button } from '@blueprintjs/core';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.videoCall = null;
    this.state = { janus: null, isJanusConnected: false };
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
        server: 'http://localhost:8088/janus',
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
    janus.attach(
      {
        plugin: 'janus.plugin.videocall',
        success: (pluginHandle) => {
          // Plugin attached! 'pluginHandle' is our handle
          console.log('Puligin handle', pluginHandle);

          this.videoCall = pluginHandle;
          const body = { audio: true, video: true };
          this.videoCall.send({ message: body });
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
          Janus.debug(" ::: Got a message :::");
          Janus.debug(msg);
          const result = msg["result"];
          console.log('Result', result);
          if (result !== null && result !== undefined) {
            if (result.list !== undefined && result.list !== null) {
              const { list } = result;
              Janus.debug('Got a list of registered peers:');
              Janus.debug(list);
              for(var mp in list) {
                Janus.debug("  >> [" + list[mp] + "]");
              }
            } else if (result.event !== undefined && result.event !== null) {
              const { event } = result;
              if (event === 'registered') {
                const myusername = result['username'];
                Janus.log('Successfully registered as ' + myusername + "!");

                // Get a list of available peers, just for fun
                this.videoCall.send({"message": { "request": "list" }});
                // TODO Enable buttons to call now

              } else if ( event === 'calling') {
                Janus.log('Waiting for the peer to answer...');
                // TODO Any ringtone?
              } else if (event === 'incomingcall') {
                Janus.log("Incoming call from " + result["username"] + "!");
                const yourusername = result["username"];
                // Notify user
                this.videoCall.createAnswer(
                  {
                    jsep: jsep,
                    media: { data: true },
                    success: (jsep) => {
                      Janus.debug("Got SDP!");
                      Janus.debug(jsep);
                      const body = { "request": "accept" };
                      this.videoCall.send({"message": body, "jsep": jsep});
                    },
                    error: (error) => {
                      Janus.error("WebRTC error:", error);
                    }
                  });
              } else if (event === 'accepted') {
                var peer = result["username"];
                if(peer === null || peer === undefined) {
                  Janus.log("Call started!");
                } else {
                  Janus.log(peer + " accepted the call!");
                }
                // Video call can start
                if (jsep) this.videoCall.handleRemoteJsep({jsep: jsep});
              } else if (event === 'update') {
                // An 'update' event may be used to provide renegotiation attempts
                if (jsep) {
                  if (jsep.type === 'answer') {
                    this.videoCall.handleRemoteJsep({jsep: jsep});
                  } else {
                    this.videoCall.createAnswer(
                      {
                        jsep: jsep,
                        media: { data: true }, // Let's negotiate data channels as well
                        success: (jsep) => {
                          Janus.debug("Got SDP!");
                          Janus.debug(jsep);
                          const body = { request: 'set' };
                          this.videoCall.send({ message: body, "jsep": jsep});
                        },
                        error: (error) => {
                          Janus.error("WebRTC error:", error);
                        },
                      });
                  }
                }
              }
            }
          } else {
            // FIXME Error?
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

  onUserRegister = () => {
    const { username } = this.state;
    const register = { request: 'register', username };
    this.videoCall.send({ message: register });
  }

  onInputChange = (type, e) => {
    console.log('Inpute change', e.target.value);
    this.setState({ [type]: e.target.value });
  }

  onCallHandler = () => {
    const { remoteUserName } = this.state;
    this.videoCall.createOffer(
      {
        // No media property provided: by default,
        // it's sendrecv for audio and video
        success: (jsep) => {
          // Got our SDP! Send our OFFER to the plugin
          const body = {request: 'call', username: remoteUserName };
          this.videoCall.send({ message: body, jsep });
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
  }

  render() {
    console.log('Video Call state value', this.state);
    const { isJanusConnected } = this.state;
    if (isJanusConnected) {
      this.janusAttachment();
    }
    return (
      <div>
        <div style={{ width: '50%', marginTop: 10, padding: 10 }}>
          <InputGroup onChange={e => this.onInputChange('username', e)} placeholder="Enter your name" />
          <Button style={{ margin: 10 }} text="Register" intent="success" onClick={this.onUserRegister} />
          <InputGroup placeholder="Enter remote user name" onChange={ e => this.onInputChange('remoteUserName', e)} />
          <Button text="Call" onClick={this.onCallHandler} />
        </div>
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
      </div>
    );
  }
}
export default Index;
