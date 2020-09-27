import client from '../../../../../socket';
import onOfferHandler from './on-offer';
import onAnswerHandler from './onAnswerHandler';
import onIceCandidateHandler from './onIceCandidateHandler';
import onCallEndHandler from './onCallEndHandler';
import onCallStatusChangeHandler from './onCallStatusHandler';
import commPingPong from './commPingPong';

export default (props, state, maximize) => {
  // Handle offer request
  client.on('offer', async (data) => {
    if (data) {
      await onOfferHandler(props, state, data);
    }
  });

  // Handling incoming answer
  client.on('answer', async (data) => {
    if (data) {
      await onAnswerHandler(props, state, data);
    }
  });

  // Handling incoming iceCandidate
  client.on('icecandidate', async (data) => {
    if (data) {
      onIceCandidateHandler(props, state, data);
    }
  });

  // change call Status handler
  client.on('callStatus', async (data) => {
    // console.log('call Status', data);
    if (data) {
      onCallStatusChangeHandler(props, state, data);
    }
  });

  // Handling Call End event
  client.on('callEnd', async (data) => {
    // console.log('callend event called', data);
    if (data) {
      onCallEndHandler(props, state, data, maximize);
    }
  });

  client.on('ping', (data) => {
    if (data) {
      commPingPong(props, state, data);
    }
  });
};
