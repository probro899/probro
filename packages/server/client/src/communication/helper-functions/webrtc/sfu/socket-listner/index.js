import client from '../../../../../socket';
import sfuPingPong from './sfuPingPong';
import onOfferArrive from './on-offer';
import onSfuCallStatusChangeHandler from './onSfuCallStatusChangeHandler';

export default (props, state, maximize) => {
  // initialize conferece call
  client.on('sfuInit', (data) => {
    const { updateWebRtc } = props;
    const liveCallPingTimer = setInterval(sfuPingPong, 5000);
    updateWebRtc('liveCallPingTimer', liveCallPingTimer);
    onOfferArrive(props, state, data);
  });

  // change call Status handler
  client.on('callStatus', async (data) => {
    // console.log('call Status', data);
    if (data) {
      onSfuCallStatusChangeHandler(props, state, data);
    }
  });

  // Handle sfu ping request
  client.on('ping', (data) => {
    // console.log('ping called', data);
    if (data) {
      sfuPingPong(data);
    }
  });
};
