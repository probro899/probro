import findMessageSeenStatus from './findMessageSeenStatus';

const findBoardMessageDetails = (arr, boards, BoardMessageSeenStatus, id) => {
  // const { database, account } = props;
  const { boardId } = arr[0];
  const boardDetails = boards.find(b => b.id === boardId);
  const arrWithSeenStatus = arr.map(bmd => ({ ...bmd, seenStatus: findMessageSeenStatus(bmd.id, 'board', BoardMessageSeenStatus) }));
  const arrWithSeenStatusReverse = arrWithSeenStatus.reverse();
  const unseenMsg = arrWithSeenStatusReverse.findIndex(obj => obj.seenStatus.find(o => o.userId === id));
  let unSeenNo;
  if (unseenMsg === -1) {
    unSeenNo = arrWithSeenStatusReverse.filter(obj => obj.userId !== id).length;
  } else {
    let count = 0;
    for (let i = 0; i < unseenMsg; i += 1) {
      if (arrWithSeenStatusReverse[i].userId !== id && !arrWithSeenStatusReverse[i].type) {
        count += 1;
      }
    }
    unSeenNo = count;
  }
  const lastMessage = arrWithSeenStatus.find(obj => obj.userId !== id);
  const lastMessageId = lastMessage ? lastMessage.id : arrWithSeenStatus[0].id;
  let lastMessageForSeenStatus = arrWithSeenStatus.find((obj) => {
    if (!obj.type) {
      return true;
    }
    if (obj.type && obj.userId === id) {
      return true;
    }
  });
  if (!lastMessageForSeenStatus) {
    lastMessageForSeenStatus = {};
  }
  // i have changed here connectionId
  return { connectionId: boardId, type: 'board', boardDetails, unSeenNo, timeStamp: arrWithSeenStatus[0].timeStamp, lastMessage: lastMessageForSeenStatus, lastMessageId };
};

export default findBoardMessageDetails;
