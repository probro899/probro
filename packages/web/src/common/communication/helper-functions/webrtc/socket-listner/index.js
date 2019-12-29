import client from '../../../../../socket';
import onOfferHandler from './on-offer';
import onAnswerHandler from './onAnswerHandler';
import onIceCandidateHandler from './onIceCandidateHandler';
import onCallEndHandler from './onCallEndHandler';

export default (props, state) => {
  // Handle offer request
  client.on('offer', async (data) => {
    await onOfferHandler(props, state, data);
  });

  // Handling incoming answer
  client.on('answer', async (data) => {
    await onAnswerHandler(props, state, data);
  });

  // Handling incoming iceCandidate
  client.on('icecandidate', async (data) => {
    onIceCandidateHandler(props, state, data);
  });

  // Handling Call End event
  client.on('callEnd', async (data) => {
    // console.log('callend event called', data);
    onCallEndHandler(props, state, data);
  });
};
