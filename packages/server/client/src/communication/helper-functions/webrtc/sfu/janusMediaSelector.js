
export default (meidaType) => {
  // console.log('media selector called', meidaType, preMediaType);
  switch (meidaType) {
    case 'audio':
      return { audio: true, videoSend: false, videoRecv: true, replaceAudio: true, data: true, removeVideo: true };
    case 'video':
      return { audio: true, video: true, replaceVideo: true, replaceAudio: true, data: true };
    case 'screenshare':
      return { audio: true, video: 'screen', replaceVideo: true, replaceAudio: true, data: true };
    default:
      return { audio: true, videoSend: false, videoRecv: true, replaceAudio: true, data: true };
  }
};
