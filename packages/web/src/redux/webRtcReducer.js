import { UPDATE_WEBRTC } from '../actions/types';
import messages from '../screens/users/components/communication/components/content/messenger/container/testData';

const initialState = {
  showCommunication: null,
  showIncommingCall: false,
  showOutgoingCall: false,
  communicationContainer: 'list',
  peerType: '',
  outGoingCallType: null,
  messages,
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
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WEBRTC:
      return {
        ...state,
        [action.schema]: action.payload,
      };
    default:
      return state;
  }
};
