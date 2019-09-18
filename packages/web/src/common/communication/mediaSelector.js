export default async (mediaType) => {
  console.log('check media type', mediaType);
  let stream = null;
  try {
    navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    switch (mediaType) {
      case 'audio':
        if (navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        } else {
          stream = await navigator.getWebcam({ audio: true, video: false });
        }
        console.log('final stream', stream);
        return stream;
      case 'video':
        if (navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        } else {
          stream = await navigator.getWebcam({ audio: true, video: true });
        }
        return stream;
      case 'screenshare':
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        return stream;
      default:
        return stream;
    }
  } catch (e) {
    console.error('Media Selector error', e);
  }
};
