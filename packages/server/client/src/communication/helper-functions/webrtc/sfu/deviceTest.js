import Janus from '../../../../webrtc/sfu/janus';
import exceptionReporter from './exceptionReporter';

export default async (updateWebRtc) => {
  try {
    const allDevices = await new Promise((resolve) => {
      Janus.listDevices((devices) => {
        resolve(devices);
      });
    });
    const audioDeviceList = [];
    const videoDeviceList = [];
    allDevices.forEach((d) => {
      if (d.kind === 'audioinput') {
        audioDeviceList.push(d);
      }
      if (d.kind === 'videoinput') {
        videoDeviceList.push(d);
      }
    });
    updateWebRtc('devices', { audio: audioDeviceList, video: videoDeviceList });
    return allDevices;
  } catch (e) {
    exceptionReporter({ error: JSON.stringify(e), errorCode: 149 });
  }
};
