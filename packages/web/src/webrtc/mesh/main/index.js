
export default async function main(
  onIceCandidateHandler,
  uid,
  gotRemoteStreamHandler,
  onIceConnectionStateChange,
  offerHandler,
  onLocalStream,
  iceGatherCompleteHandler
) {
  // server configuration
  const userId = uid;
  const server = {
    iceServers: [
      { urls: ['stun:stun.l.google.com:19302'] },
      {
        urls: ['turn:properclass.com:3478?transport=tcp'],
        // urls: ['turn:properclass.com:3478?transport=tcp'],
        username: 'properclass',
        credential: 'proper199201',
      },
    ],
  };

  // Initialize peerconnection
  try {
    const pc = new RTCPeerConnection(server);

    // Adding icecandidate listner
    pc.addEventListener('icecandidate', e => onIceCandidateHandler(e, userId));

    // Adding IceConnection State Change
    pc.addEventListener('iceconnectionstatechange', e => onIceConnectionStateChange(e, pc, userId));

    // Adding Ontrack listner
    pc.addEventListener('track', e => gotRemoteStreamHandler(e, userId));

    pc.onicecandidateerror = e => console.error('Error on onIceCandidate', e);

    // tracking the ice canidate gather complete
    pc.onicegatheringstatechange = info => iceGatherCompleteHandler(userId, info.target.iceGatheringState);

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
      // console.log(`${userId}) CREATE OFFER`, stream);
      onLocalStream(stream, userId);
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
      try {
        // console.log(`${userId}) CREATE ANSWER`, data);
        if (stream) {
          stream.getTracks().forEach(track => pc.addTrack(track, stream));
          onLocalStream(stream, userId);
        }
        setRemoteDescription(data);
        const answer = await pc.createAnswer();
        setLocalDescription(answer);
        return answer;
      } catch (e) {
        console.error('Error in Create Answer', userId, data);
      }
    };

    // Adding remoteIceCandidate
    const addIceCandidate = (candidate) => {
      // console.log(`${userId}) ADD REMOTE ICECANDIDATE`, candidate);
      pc.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
    };

    return { pc, createOffer, createAnswer, addIceCandidate, setRemoteDescription, addCandidate };
  } catch (e) {
    console.error('Error in Creating turn server', e);
  }
}
