import client from '../../../../../../socket';
import sfuPingPong from './sfuPingPong';
import onOfferArrive from './on-offer';
import onSfuCallStatusChangeHandler from './onSfuCallStatusChangeHandler';

export default (props, state, maximize) => {

  // initialize conferece call
  client.on('sfuInit', (data) => {
<<<<<<< HEAD
    // console.log('SFU INIT CALLED');
=======
>>>>>>> e25691ae4172372a05c1048a9eaf30a1b1147eca
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
    if (data) {
      sfuPingPong(props, state, data);
    }
  });
};
