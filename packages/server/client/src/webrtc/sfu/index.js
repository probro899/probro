import adapter from 'webrtc-adapter';
import Janus from './janus';

export default async () => {
  Janus.init({
    debug: false,
    dependencies: Janus.useDefaultDependencies({ adapter }), // or: Janus.useOldDependencies() to get the behaviour of previous Janus versions
    callback: () => {
      Janus.log('Janus API support ok');
      // Janus working fine
    },
  });

  const janusRes = await new Promise((resolve) => {
    const janus = new Janus(
      {
        server: 'wss://properclass.com:8989/janus',
        apisecret: 'properclassdotcom@654123',
        // iceServers: [{ urls: 'turn:properclass.com:3478?transport=tcp', username: 'properclass', credential: 'proper199201' }],
        success: () => {
          resolve({ janus });
        },
        error: (cause) => {
          resolve({ error: cause, errorCode: 200 });
        },
        destroyed: () => {
          resolve({ error: 'janus destroyed', errorCode: 201 });
        },
      });
  });
  return janusRes;
};
