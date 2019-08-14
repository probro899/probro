import main from '../../../../../webrtc/main';
import onIceCandidateHandler from './onIceCandidateHandler';
import gotRemoteStreamHandler from './gotRemoteStreamHandler';
import iceCandidateStatusHandler from './iceCandidateStatusHandler';

export default async (boardId, props, state) => {
  // console.log('create pc for each user', boardId, props);
  try {
    const { database, updateWebRtc, account } = props;
    const boardmembers = Object.values(database.BoardMember.byId).filter(bm => bm.boardId === boardId);
    const userListAll = boardmembers.map(bm => database.User.byId[bm.tuserId]);
    const userList = userListAll.filter(user => user.id !== account.user.id);
    const peerConnectionPromises = userList.map(user => main(onIceCandidateHandler(props, state), user.id, gotRemoteStreamHandler(props), iceCandidateStatusHandler(props)));
    const peerConnList = await Promise.all(peerConnectionPromises);
    const storeValue = userList.reduce((obj, user, idx) => {
      obj[user.id] = { pc: peerConnList[idx], user };
      return obj;
    }, {});
    updateWebRtc('peerConnections', storeValue);
    return userList;
  } catch (e) {
    console.error('Error in creating pc', e);
  }
};
