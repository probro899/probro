import Janus from './janus';
import registration from './registration';

const plugin = { oneToOneCall: 'janus.plugin.videocall', conferenceCall: 'janus.plugin.videoroom' };

export default function janusAttachment(
  janus,
  pluginType,
  onMessageHandler,
  onErrorHandler,
  onLocalStreamHandler,
  onRemoteStreamHandler,
  onCloseHandler,
  updateWebRtc,
  onDataHandler,
  onDataChannelAvailable,
  isJoin
) {
  let oneToOneCall;
  janus.attach(
    {
      plugin: plugin[pluginType],
      success: (pluginHandle) => {
        Janus.log('Puligin attachment Success', pluginType);
        // Join user in respective class and register for one to one call
        registration(pluginHandle, pluginType, updateWebRtc, isJoin);
      },
      error: (cause) => {
        // Couldn't attach to the plugin
        Janus.error('Faild to attach plugin', cause);
        onErrorHandler(cause);
      },
      consentDialog: (on) => {
        // e.g., Darken the screen if on=true (getUserMedia incoming), restore it otherwise
        Janus.log('consetDialog', on);
      },
      mediaState: (medium, on) => {
        Janus.log(`Janus  ${on ? 'started' : 'stopped'} receiving our " + ${medium}`);
      },
      webrtcState: (on) => {
        Janus.log(`Janus says our WebRTC PeerConnection is ${on ? 'up' : 'down'}  now`);
      },
      onmessage: (msg, jsep) => {
        // We got a message/event (msg) from the plugin
        // If jsep is not null, this involves a WebRTC negotiation
        Janus.log(pluginType, 'Message', msg, jsep);
        onMessageHandler(msg, jsep);
      },
      ondataopen: (data) => {
        Janus.log('The DataChannel is available!', data);
        onDataChannelAvailable(data);
      },
      ondata: (data) => {
        Janus.debug('We got data from the DataChannel! ', data);
        onDataHandler(data);
      },
      onlocalstream: (stream) => {
        // We have a local stream (getUserMedia worked!) to display
        Janus.log('onLocal Stream', stream);
        onLocalStreamHandler(stream);
      },
      onremotestream: (stream) => {
      // We have a remote stream (working PeerConnection!) to
        Janus.log('OnRemote Stream', stream);
        onRemoteStreamHandler(stream);
      },
      oncleanup: () => {
      // PeerConnection with the plugin closed, clean the UI
      // The plugin handle is still valid so we can create a new one
        Janus.log('onCleanup called');
        // onCloseHandler('cleanup');
      },
      detached: () => {
      // Connection with the plugin closed, get rid of its features
      // The plugin handle is not valid anymore
        // console.log('clear the stuff after plugin detach');
        // onCloseHandler('detached');
      },
    }
  );
  return oneToOneCall;
}
