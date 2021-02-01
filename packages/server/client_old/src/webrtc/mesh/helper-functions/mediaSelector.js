
export default async (mediaType) => {
  let stream = null;
  try {
    navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    switch (mediaType) {
      case 'audio':
        if (navigator.mediaDevices.getUserMedia) {
          stream = navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        } else {
          stream = navigator.getWebcam({ audio: true, video: false });
        }
        return stream;
      case 'video':
        if (navigator.mediaDevices.getUserMedia) {
          stream = navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        } else {
          stream = navigator.getWebcam({ audio: true, video: true });
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
