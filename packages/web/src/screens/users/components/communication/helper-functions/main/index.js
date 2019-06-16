import { onIceConnectionStateChange } from '../common';

function gotRemoteStream(e) {
  const videoElement = document.getElementById('video1');
  if (videoElement.srcObject !== e.streams[0]) {
    videoElement.srcObject = e.streams[0];
  }
}

const mediaSelector = async (mediaType) => {
  let stream = null;

  switch (mediaType) {
    case 'audio':
      try {
        navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        if (navigator.mediaDevices.getUserMedia) {
          stream =  navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        } else {
          stream =  navigator.getWebcam({ audio: true, video: true });
        }
      } catch (e) {
        console.log('getUSermeida error', e);
      }
      return stream;
    case 'video':
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      return stream;
    case 'screenshare':
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      return stream;
    default:
      return stream;
  }
};

export default async (onIceCandidateHandler) => {
  // server configuration
  const server = null;
  const offerOptions = {
    offerToRecieveAudio: 1,
    offerToRecieveVideo: 1,
  };
  // Initialize peerconnection
  // eslint-disable-next-line
  const pc = new RTCPeerConnection(server);

  // Adding icecandidate listner
  pc.addEventListener('icecandidate', onIceCandidateHandler);

  // Adding IceConnection State Change
  pc.addEventListener('iceconnectionstatechange', e => onIceConnectionStateChange(e, pc));

  // Adding Ontrack listner
  pc.addEventListener('track', gotRemoteStream);

  // setLocal Description
  const setLocalDescription = (data) => {
    pc.setLocalDescription(data);
  };

  const addCandidate = (data) => {
    // eslint-disable-next-line
    pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data)));
  };

  // setRemote Description
  const setRemoteDescription = (data) => {
    pc.setRemoteDescription(data);
  };

  // creating offer for list of users
  const createOffer = async (mediaType) => {
    const stream = await mediaSelector(mediaType);
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    const offer = await pc.createOffer(offerOptions);
    setLocalDescription(offer);
    return offer;
  };

  // creating Answer for offer
  const createAnswer = async (data, mediaType) => {
    const stream = await mediaSelector(mediaType);
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    setRemoteDescription(data);
    const answer = await pc.createAnswer();
    setLocalDescription(answer);
    return answer;
  };

  // Add remoteIceCandidate
  const addIceCandidate = (candidate) => {
    // eslint-disable-next-line
    pc.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
  };

  return { pc, createOffer, createAnswer, addIceCandidate, setRemoteDescription, addCandidate };
};
