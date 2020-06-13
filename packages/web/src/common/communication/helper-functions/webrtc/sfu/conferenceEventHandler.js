/* eslint-disable import/no-cycle */
import store from '../../../../../store';
import janusMediaSelector from './janusMediaSelector';
import callAccesptHanlder from './callAcceptHandler';
import addRemoteFeedHandler from './addRemoteFeedHandler';
import unpublishedHandler from './unpublishedHandler';

export default (msg, props) => {
  console.log('Conference event handler', msg);
  const { updateWebRtc } = props;
  const { videoroom } = msg;
  const event = videoroom;
  const { webRtc, database } = store.getState();
  const { janus, localCallHistory } = webRtc;
  const id = localCallHistory.chatHistory.connectionId;
  const { conferenceCall } = janus;
  const { joinToken } = database.Board.byId[id];
  if (event === 'joined') {
    conferenceCall.createOffer(
      {
        // Add data:true here if you want to publish datachannels as well
        media: janusMediaSelector(localCallHistory.mediaType), // Publishers are sendonly
        success: (jsep) => {
          // console.log('Got publisher SDP!', jsep);
          const publish = { request: 'configure', audio: true, video: true };
          conferenceCall.send({ message: publish, jsep });
        },
        error: (error) => {
          console.error('error on publishing own feed', error);
        },
      }
    );
    updateWebRtc('janus', { ...webRtc.janus, joinStatus: true });
    const { publishers } = msg;
    if (publishers && publishers.length > 0) {
      // console.log('AddRemote feed for publisher', publishers);
      callAccesptHanlder(props);
      publishers.forEach(p => addRemoteFeedHandler(p, props));
    }
  } else if (event === 'event') {
    // console.log('Event handler goes here', msg);
    const { publishers, configured, unpublished } = msg;
    if (publishers && publishers.length > 0) {
      callAccesptHanlder(props);
      // console.log('Add Remote feed for publisher', publishers);
      publishers.forEach(p => addRemoteFeedHandler(p, props));
    }

    if (configured === 'ok') {
      // console.log('LIST PARTICIPANT REQ');
      // const register1 = { request: 'listparticipants', room: id, pin: joinToken };
      // janus.conferenceCall.send({ message: register1 });
      // conferenceCall.send({ message: { request: 'listparticipants' } });
    }

    if (unpublished) {
      // console.log('Un Published called', unpublished, webRtc.connectedUsers);
      // const listparticipants = { request: 'listparticipants', room: id, pin: joinToken };
      // janus.conferenceCall.send({ message: listparticipants });
      unpublishedHandler(props, unpublished);
    }
  } else if (event === 'participants') {
    // console.log('Participants', msg.participants);
  }
};
