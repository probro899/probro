import main from '../../../../webrtc/main';
import onIceCandidateHandler from './onIceCandidateHandler';
import gotRemoteStreamHandler from './gotRemoteStreamHandler';
import iceCandidateStatusHandler from './iceCandidateStatusHandler';
import offerHandler from './offerHandler';
import localStreamHandler from './onLocalStream';
import iceGatherCompleteHandler from './onIceGatherCompleteHandler';
import store from '../../../../store';

export default async (boardId, props, state) => {
  // console.log('create pc for each user', boardId, props);
  try {
    const { database, updateWebRtc, account } = props;
    const { webRtc } = store.getState();

    let userList = null;
    if (webRtc.localCallHistory.chatHistory.type === 'user') {
      userList = [webRtc.localCallHistory.chatHistory.user.user];
    } else {
      const boardmembers = Object.values(database.BoardMember.byId).filter(bm => bm.boardId === boardId);
      const userListAll = boardmembers.map(bm => database.User.byId[bm.tuserId]);
      userList = userListAll.filter(user => user.id !== account.user.id);
    }
    // console.log('userList', userList);
    const peerConnectionPromises = userList.map(
      user => main(
        onIceCandidateHandler(props, state),
        user.id, gotRemoteStreamHandler(props),
        iceCandidateStatusHandler(props),
        offerHandler(props, state),
        localStreamHandler(props),
        iceGatherCompleteHandler(props, state)
      )
    );
    const peerConnList = await Promise.all(peerConnectionPromises);
    const storeValue = userList.reduce((obj, user, idx) => {
      obj[user.id] = { pc: peerConnList[idx], user, iceCandidateStatus: 'Connecting...' };
      return obj;
    }, {});
    updateWebRtc('peerConnections', storeValue);
    return userList;
  } catch (e) {
    console.error('Error in creating pc', e);
  }
};
