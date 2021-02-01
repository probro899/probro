/* eslint-disable import/no-cycle */
import main from '../../../../webrtc/mesh/main';
import onIceCandidateHandler from './onIceCandidateHandler';
import gotRemoteStreamHandler from './gotRemoteStreamHandler';
import iceCandidateStatusHandler from './iceCandidateStatusHandler';
import offerHandler from './offerHandler';
import localStreamHandler from './onLocalStream';
import iceGaterCompleteHandler from './onIceGatherCompleteHandler';

export default async (uid, props, state) => {
  const { webRtc, updateWebRtc, account, database } = props;
  const { pc } = webRtc.peerConnections[uid];
  // console.log(`${uid}) PC IN RECONNECT`, pc);
  await pc.pc.close();
  delete webRtc.peerConnections[uid];
  const newPc = await main(
    onIceCandidateHandler(props, state),
    uid,
    gotRemoteStreamHandler(props),
    iceCandidateStatusHandler(props, state),
    offerHandler(props, state),
    localStreamHandler(props),
    iceGaterCompleteHandler(props, state)
  );
  await newPc.createOffer(webRtc.connectedUsers[account.user.id].streams[0]);
  await updateWebRtc('peerConnections', { ...webRtc.peerConnections, [uid]: { pc: newPc, user: database.User.byId[uid] } });
  delete webRtc.iceCandidates[uid];
};
