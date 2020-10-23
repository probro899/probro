import Janus from './janus';

const plugin = { oneToOneCall: 'janus.plugin.videocall', conferenceCall: 'janus.plugin.videoroom' };

export default function janusAttachment(
  janus,
  pluginType,
  onMessageHandler,
  onErrorHandler,
  onLocalStreamHandler,
  onRemoteStreamHandler,
  onDataHandler,
  onDataChannelAvailable
) {
  const attachRes = new Promise((resolve) => {
    janus.attach(
      {
        plugin: plugin[pluginType],
        success: (pluginHandle) => {
          Janus.log('Puligin attachment Success', pluginType);
          resolve({ [pluginType]: pluginHandle });
        },
        error: (cause) => {
          Janus.error('Faild to attach plugin', cause);
          onErrorHandler(cause);
          resolve({ error: cause, errorCode: 120 });
        },
        consentDialog: (on) => {
          Janus.log('consetDialog', on);
        },
        mediaState: (medium, on) => {
          Janus.log(`Janus  ${on ? 'started' : 'stopped'} receiving our " + ${medium}`);
        },
        webrtcState: (on) => {
          Janus.log(`Janus says our WebRTC PeerConnection is ${on ? 'up' : 'down'}  now`);
        },
        onmessage: (msg, jsep) => {
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
          Janus.log('onLocal Stream', stream);
          onLocalStreamHandler(stream);
        },
        onremotestream: (stream) => {
          Janus.log('OnRemote Stream', stream);
          onRemoteStreamHandler(stream);
        },
        oncleanup: () => {
        },
        detached: () => {
        },
      }
    );
  });
  return attachRes;
}
