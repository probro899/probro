import { onIceConnectionStateChange, mediaSelector } from '../helper-functions';

function gotRemoteStream(e) {
  const videoElement = document.getElementById('video1');
  if (videoElement.srcObject !== e.streams[0]) {
    videoElement.srcObject = e.streams[0];
  }
}

export default async (onIceCandidateHandler) => {
  // server configuration
  const server = null;
  const offerOptions = {
    offerToRecieveAudio: 1,
    offerToRecieveVideo: 1,
  };
  // Initialize peerconnection
  const pc = new RTCPeerConnection(server);

  // Adding icecandidate listner
  pc.addEventListener('icecandidate', onIceCandidateHandler);

  // Adding IceConnection State Change
  pc.addEventListener('iceconnectionstatechange', e => onIceConnectionStateChange(e, pc));

  // Adding Ontrack listner
  pc.addEventListener('track', gotRemoteStream);

  // seting Local Description
  const setLocalDescription = (data) => {
    pc.setLocalDescription(data);
  };

  const addCandidate = (data) => {
    pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data)));
  };

  // seting Remote Description
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

  // Adding remoteIceCandidate
  const addIceCandidate = (candidate) => {
    pc.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
  };

  return { pc, createOffer, createAnswer, addIceCandidate, setRemoteDescription, addCandidate };
};
