/* eslint-disable no-case-declarations */
export default async (mediaType) => {
  // console.log('main canvas called', mediaType);
  const whiteBoardElement = document.getElementById('mainCanvas');
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
        return stream;
      case 'video':
        if (navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        } else {
          stream = await navigator.getWebcam({ audio: true, video: true });
        }
        return stream;
      case 'screenshare':
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const screenShareStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const audioTracks = audioStream.getTracks();
        const screenShareTracks = screenShareStream.getTracks();
        stream = new MediaStream([...audioTracks, ...screenShareTracks]);
        return stream;
      case 'whiteBoard':
        const whiteBoardstream = await whiteBoardElement.captureStream(10);
        const audioStreamforWhiteBoard = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const audioTracksforWhiteBoard = audioStreamforWhiteBoard.getTracks();
        const whiteBoardTracks = whiteBoardstream.getTracks();
        stream = new MediaStream([...audioTracksforWhiteBoard, ...whiteBoardTracks]);
        return stream;
      case 'mute':
        return null;
      default:
        return stream;
    }
  } catch (e) {
    console.error('Media Selector error', e);
  }
};
