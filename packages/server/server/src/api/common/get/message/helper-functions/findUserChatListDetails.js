import findMessageSeenStatus from './findMessageSeenStatus';
import findUserDetails from '../../../findUserDetails';

const findUserChatListDetails = (arr, connectionsList, userMessageSeenSatatus, id) => {
  try {
  const arrWithSeenStatus = arr.map(umd => ({ ...umd, seenStatus: findMessageSeenStatus(umd.id, 'user', userMessageSeenSatatus) }));
  const arrWithSeenStatusReverse = arrWithSeenStatus.reverse();
  const unseenMsg = arrWithSeenStatusReverse.findIndex(obj => obj.seenStatus.find(o => o.userId === id));
  let unSeenNo;
  if (unseenMsg === -1) {
    unSeenNo = arrWithSeenStatusReverse.filter(obj => obj.fuserId !== id).length;
  } else {
    let count = 0;
    for (let i = 0; i < unseenMsg; i += 1) {
      if (arrWithSeenStatusReverse[i].fuserId !== id) {
        count += 1;
      }
    }
    unSeenNo = count;
  }
  const msgObj = arrWithSeenStatus[0];
  const lastMessage = arrWithSeenStatus.find(obj => obj.fuserId !== id);
  const lastMessageId = lastMessage ? lastMessage.id : arrWithSeenStatus[0].id;
  let userId = null;
  let type;
  if (msgObj.fuserId === id) {
    userId = msgObj.tuserId;
    type = 'tuserId';
  } else {
    userId = msgObj.fuserId;
    type = 'fuserId';
  }
  const { user, userDetail } = findUserDetails(userId);
  const connection = connectionsList.find(c => c.id === msgObj.connectionId);
  return { connectionId: connection ? connection.id : null, type: 'user', user: { user, userDetails: userDetail }, unSeenNo, timeStamp: arrWithSeenStatus[0].timeStamp, lastMessage: arrWithSeenStatus[0], lastMessageId };
  } catch (e) {
    console.error('Error in findUserChatListDetails', e);
  }
};
export default findUserChatListDetails;
