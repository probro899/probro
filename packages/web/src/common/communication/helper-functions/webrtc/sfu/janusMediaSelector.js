import mediaSelector from '../../../mediaSelector';

export default (meidaType, preMediaType) =>  {
  // console.log('media selector called', meidaType);
  switch (meidaType) {
    case 'audio':
      return { audio: true, videoSend: false, videoRecv: true, replaceAudio: true, data: true };
    case 'video':
      return { audio: true, video: true, replaceVideo: true, replaceAudio: true, data: true };
    case 'screenshare':
      return { audio: true, video: 'screen', replaceVideo: true, replaceAudio: true, data: true };
    case 'mute': {
      return (preMediaType === 'audio') ?  { removeAudio: true, videoSend: false, videoRecv: true } : { removeAudio: true };
    }
    case 'unmute':
      return preMediaType === 'audio' ? { addAudio: true, videoSend: false, videoRecv: true } : { addAudio: true };
    default:
      return { audio: true, videoSend: false, videoRecv: true, replaceAudio: true, data: true };
  }
};
