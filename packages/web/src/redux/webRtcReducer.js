import { UPDATE_WEBRTC } from '../actions/types';
import messages from '../screens/users/components/communication/components/content/messenger/container/testData';

const initialState = {
  showCommunication: null,
  showIncommingCall: false,
  showOutgoingCall: false,
  communicationContainer: 'chat',
  outGoingCallType: null,
  addUser: false,
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
};

export default (state, action) => {
  // console.log('update webrtc reducer called', state, action);
  switch (action.type) {
    case UPDATE_WEBRTC:
      return {
        ...state,
        [action.schema]: action.payload,
      };
    default:
      return initialState;
  }
};
