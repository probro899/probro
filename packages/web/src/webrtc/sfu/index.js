import adapter from 'webrtc-adapter';
import Janus from './janus';
import plugInAttachment from './pluginAttachment';
import store from '../../store';

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
  const { webRtc } = store.getState();
  Janus.init({
    debug: true,
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
      server: 'http://localhost:8088/janus',
      iceServers: [{ urls: 'turn:properclass.com:3478?transport=tcp', username: 'properclass', credential: 'proper199201' }],
      success: () => {
        // Done! attach to plugin XYZ
        Janus.log('Janus is ready for attachment');
        isSuccess = true;
        updateWebRtc('janus', { ...webRtc.janus, janus });
        plugInAttachment(
          janus,
          'oneToOneCall',
          onMessageEventHandler,
          onErrorHandler,
          onLocalStreamHandler,
          onRemoteStreamHandler,
          onCloseHandler,
          updateWebRtc,
          onDataHandler,
          onDataChannelAvailable
        );

        plugInAttachment(
          janus,
          'conferenceCall',
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
