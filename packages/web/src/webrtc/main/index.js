import store from '../../store';

function setLocalStream(stream, userId, onLocalStream) {
  // console.log('stream in local stream', stream);
  onLocalStream(stream, userId);
  const videoElement = document.getElementById(`video-${store.getState().account.user.id}`);
  if (stream && videoElement) {
    videoElement.srcObject = stream;
  }

  const { webRtc, database, account } = store.getState();
  if (webRtc.chatHistory.type === 'board') {
    if (database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].activeStatus === account.user.id) {
      const lastVideoElement = document.getElementById('video-mentor');
      if (lastVideoElement) {
        lastVideoElement.srcObject = webRtc.streams[account.user.id].stream[0];
      }
    }
  }
}

async function gotRemoteStream(e, userId, gotRemoteStreamHandler) {
  console.log('Hey got remote stream');
  await gotRemoteStreamHandler(e, userId);
  const { webRtc, database, account } = store.getState();
  const lastVideoElement = document.getElementById('video-mentor');
  // console.log('got remote stream', e, userId, database.Board.byId[1].activeStatus);
  if (webRtc.localCallHistory.chatHistory.type === 'board') {
    const videoElement = document.getElementById(`video-${userId}`);
    if (videoElement) {
      if (videoElement.srcObject !== e.streams[0]) {
        videoElement.srcObject = e.streams[0];
      }
    }

    if (userId === database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].activeStatus && lastVideoElement) {
      if (lastVideoElement.srcObject !== e.streams[0]) {
        lastVideoElement.srcObject = e.streams[0];
      }
    }

    if (database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].activeStatus === account.user.id && lastVideoElement) {
      if (webRtc.streams[account.user.id].stream[0] !== lastVideoElement.srcObject) {
        lastVideoElement.srcObject = webRtc.streams[account.user.id].stream[0];
      }
    }
  }

  if (webRtc.localCallHistory.chatHistory.type === 'user' && lastVideoElement) {
    lastVideoElement.srcObject = e.streams[0];
  }
}

export default async function main(onIceCandidateHandler, uid, gotRemoteStreamHandler, onIceConnectionStateChange, offerHandler, onLocalStream) {
  // server configuration
  const userId = uid;
  const server = {
    iceServers: [
      { urls: ['stun:stun.l.google.com:19302'] },
      {
        urls: ['turn:properclass.com:3478?transport=tcp'],
        username: 'properclass',
        credential: 'proper199201',
      },
    ],

    // iceServers: [
    //   { "urls": ["stun:stun.l.google.com:19302"]},
    //   {
    //     "urls": ["turn:properclass.com:3478?transport=tcp"],
    //     "username": "properclass",
    //     "credential": "proper199201",
    //   },
    // ],
  };

  // Initialize peerconnection
  try {
    const pc = new RTCPeerConnection(server);

    // Adding icecandidate listner
    pc.addEventListener('icecandidate', e => onIceCandidateHandler(e, userId));

    // Adding IceConnection State Change
    pc.addEventListener('iceconnectionstatechange', e => onIceConnectionStateChange(e, pc, userId));

    // Adding Ontrack listner
    pc.addEventListener('track', e => gotRemoteStream(e, userId, gotRemoteStreamHandler));

    pc.onicecandidateerror = e => console.error('Error on onIceCandidate', e);

    pc.onicegatheringstatechange = info => console.info('OnICeGatheringsStateChange', info);

    // seting Local Description
    const setLocalDescription = (data) => {
      pc.setLocalDescription(data);
    };

    const addCandidate = (data) => {
      pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data)));
    };

    // seting Remote Description
    const setRemoteDescription = (data) => {
      // console.log('setRemote description called for anser', data);
      pc.setRemoteDescription(data);
    };

    // creating offer for list of users
    const createOffer = async (stream) => {
      setLocalStream(stream, userId, onLocalStream);
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
      pc.createOffer((offer) => {
        setLocalDescription(offer);
        offerHandler(offer, userId);
      }, (error) => {
        console.error('error in create offer', error);
      }, { mandatory: { OfferToReceiveAudio: true, OfferToReceiveVideo: true } });
    };

    // creating Answer for offer
    const createAnswer = async (data, stream) => {
      // console.log('createAnswer called', data, stream);
      if (stream) {
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        setLocalStream(stream, userId, onLocalStream);
      }
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
  } catch (e) {
    console.error('Error in Creating turn server', e);
  }
}
