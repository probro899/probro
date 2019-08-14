import { mediaSelector } from '../helper-functions';
import store from '../../store';

function setLocalStream(stream) {
  // console.log('stream in local stream', stream);
  const videoElement = document.getElementById(`video-${store.getState().account.user.id}`);
  if (stream) {
    videoElement.srcObject = stream;
  }
}

function gotRemoteStream(e, userId, gotRemoteStreamHandler) {
  console.log('got remote stream', e, userId);
  gotRemoteStreamHandler(e, userId);
  const videoElement = document.getElementById(`video-${userId}`);
  // console.log('gotRemoteStream called', e);
  if (videoElement.srcObject !== e.streams[0]) {
    videoElement.srcObject = e.streams[0];
  }
}

export default async function main(onIceCandidateHandler, uid, gotRemoteStreamHandler, onIceConnectionStateChange) {
  // server configuration
  const userId = uid;
  const server = null;
  const offerOptions = {
    offerToRecieveAudio: 1,
    offerToRecieveVideo: 1,
  };

  // Initialize peerconnection
  const pc = new RTCPeerConnection(server);

  // Adding icecandidate listner
  pc.addEventListener('icecandidate', e => onIceCandidateHandler(e, userId));

  // Adding IceConnection State Change
  pc.addEventListener('iceconnectionstatechange', e => onIceConnectionStateChange(e, pc, userId));

  // Adding Ontrack listner
  pc.addEventListener('track', e => gotRemoteStream(e, userId, gotRemoteStreamHandler));

  // seting Local Description
  const setLocalDescription = (data) => {
    pc.setLocalDescription(data);
  };

  const addCandidate = (data) => {
    pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data)));
  };

  // seting Remote Description
  const setRemoteDescription = (data) => {
    console.log('setRemote description called for anser', data);
    pc.setRemoteDescription(data);
  };

  // creating offer for list of users
  const createOffer = async (mediaType) => {
    const stream = await mediaSelector(mediaType);
    setLocalStream(stream);
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    const offer = await pc.createOffer(offerOptions);
    setLocalDescription(offer);
    return offer;
  };

  // creating Answer for offer
  const createAnswer = async (data, mediaType) => {
    const stream = await mediaSelector(mediaType);
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    setLocalStream(stream);
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
}
