import adapter from 'webrtc-adapter';
import Janus from './janus';
import plugInAttachment from './pluginAttachment';

export default (
  onMessageEventHandler,
  onErrorHandler,
  onLocalStreamHandler,
  onRemoteStreamHandler,
  onCloseHandler,
  updateWebRtc,
  onDataHandler,
  onDataChannelAvailable
) => {
  Janus.init({
    debug: false,
    dependencies: Janus.useDefaultDependencies({ adapter }), // or: Janus.useOldDependencies() to get the behaviour of previous Janus versions
    callback: () => {
      Janus.log('Janus API support ok');
      // Janus working fine
    },
  });

  let isSuccess;
  let isError;
  let isDestroyed;

  const janus = new Janus(
    {
      server: 'https://properclass.com:8089/janus',
      iceServers: [{ urls: 'turn:properclass.com:3478?transport=tcp', username: 'properclass', credential: 'proper199201' }],
      success: () => {
        // Done! attach to plugin XYZ
        Janus.log('Janus is ready for attachment');
        isSuccess = true;

        plugInAttachment(
          janus,
          'videoCall',
          onMessageEventHandler,
          onErrorHandler,
          onLocalStreamHandler,
          onRemoteStreamHandler,
          onCloseHandler,
          updateWebRtc,
          onDataHandler,
          onDataChannelAvailable
        );
      },
      error: (cause) => {
        // Error, can't go on...
        Janus.error('Janus Server Error', cause);
        isError = cause;
      },
      destroyed: () => {
        // I should get rid of this
        isDestroyed = true;
        Janus.error('Janus destroyed');
      },
    });
  return { isSuccess, isError, isDestroyed, janus, plugInAttachment };
};
