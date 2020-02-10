import { UPDATE_WEBRTC } from '../actions/types';

const initialState = {
  localCallHistory: {},
  showCommunication: null,
  showIncommingCall: false,
  showOutgoingCall: false,
  isConnecting: false,
  communicationContainer: 'list',
  peerType: '',
  connectionId: null,
  outGoingCallType: null,
  messages: [],
  peerConnections: {},
  pendingOffers: [],
  streams: {},
  currentOffer: null,
  iceCandidates: {},
  liveIncomingCall: false,
  isLive: false,
  mediaRecording: null,
  recordedBlobs: [],
  lastStreamId: null,
  chatHistoryType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WEBRTC:
      // console.log('update webRtc called', action);
      return {
        ...state,
        [action.schema]: action.payload,
      };
    default:
      return state;
  }
};
