/* eslint-disable prefer-destructuring */
import { timeStampSorting, normalTimeStampSorting } from '../../../common/utility-functions';

const findMessageSeenStatus = (msgId, type, props) => {
  const { database } = props;
  const users = [];
  if (type === 'board') {
    Object.values(database.BoardMessageSeenStatus.byId).forEach((obj) => {
      if (obj.bmId === msgId) {
        users.push(obj);
      }
    });
  }
  if (type === 'user') {
    Object.values(database.UserMessageSeenStatus.byId).forEach((obj) => {
      if (obj.umId === msgId) {
        users.push(obj);
      }
    });
  }
  return users;
};

const findUserChatListDetails = (arr, props) => {
  const { database, account } = props;
  const arrWithSeenStatus = arr.map(umd => ({ ...umd, seenStatus: findMessageSeenStatus(umd.id, 'user', props) }));
  const arrWithSeenStatusReverse = arrWithSeenStatus.reverse();
  const unseenMsg = arrWithSeenStatusReverse.findIndex(obj => obj.seenStatus.find(o => o.userId === account.user.id));
  let unSeenNo;
  if (unseenMsg === -1) {
    unSeenNo = arrWithSeenStatusReverse.filter(obj => obj.fuserId !== account.user.id).length;
  } else {
    let count = 0;
    for (let i = 0; i < unseenMsg; i += 1) {
      if (arrWithSeenStatusReverse[i].fuserId !== account.user.id) {
        count += 1;
      }
    }
    unSeenNo = count;
  }
  const msgObj = arrWithSeenStatus[0];

  const lastMessage = arrWithSeenStatus.find(obj => obj.fuserId !== account.user.id);
  const lastMessageId = lastMessage ? lastMessage.id : arrWithSeenStatus[0].id;
  const connection = Object.values(database.UserConnection.byId).find(uc => uc.id === msgObj.connectionId);
  const user = connection.user.user;
  const activeStatus = connection.activeStatus;
  const userDetails = connection.user.userDetail;
  return { activeStatus, connectionId: connection ? connection.id : null, type: 'user', user: { user, userDetails }, unSeenNo, timeStamp: arrWithSeenStatus[0].timeStamp, lastMessage: arrWithSeenStatus[0], lastMessageId };
};

const findBoardMessageDetails = (arr, props) => {
  const { database, account } = props;
  const { boardId } = arr[0];
  const boardDetails = database.Board.byId[boardId];
  const arrWithSeenStatus = arr.map(bmd => ({ ...bmd, seenStatus: findMessageSeenStatus(bmd.id, 'board', props) }));
  const arrWithSeenStatusReverse = arrWithSeenStatus.reverse();
  const unseenMsg = arrWithSeenStatusReverse.findIndex(obj => obj.seenStatus.find(o => o.userId === account.user.id));
  let unSeenNo;
  if (unseenMsg === -1) {
    unSeenNo = arrWithSeenStatusReverse.filter(obj => obj.userId !== account.user.id).length;
  } else {
    let count = 0;
    for (let i = 0; i < unseenMsg; i += 1) {
      if (arrWithSeenStatusReverse[i].userId !== account.user.id && !arrWithSeenStatusReverse[i].type) {
        count += 1;
      }
    }
    unSeenNo = count;
  }
  const lastMessage = arrWithSeenStatus.find(obj => obj.userId !== account.user.id);
  const lastMessageId = lastMessage ? lastMessage.id : arrWithSeenStatus[0].id;
  const lastMessageForSeenStatus = arrWithSeenStatus.find((obj) => {
    if (!obj.type) {
      return true;
    }
    if (obj.type && obj.userId === account.user.id) {
      return true;
    }
  });
  // i have changed here connectionId
  return { connectionId: boardId, type: 'board', boardDetails, unSeenNo, timeStamp: arrWithSeenStatus[0].timeStamp, lastMessage: lastMessageForSeenStatus, lastMessageId };
};

export default (props) => {
  const { database } = props;
  let messageByConnectionId = {};
  let boardMessageByBoardId = {};
  Object.values(database.UserMessage.byId).forEach((msg) => {
    if (messageByConnectionId[msg.connectionId]) {
      messageByConnectionId = { ...messageByConnectionId, [msg.connectionId]: [...messageByConnectionId[msg.connectionId], msg] };
    } else {
      messageByConnectionId = { ...messageByConnectionId, [msg.connectionId]: [msg] };
    }
  });

  Object.values(database.BoardMessage.byId).forEach((bmg) => {
    if (boardMessageByBoardId[bmg.boardId]) {
      boardMessageByBoardId = { ...boardMessageByBoardId, [bmg.boardId]: [...boardMessageByBoardId[bmg.boardId], bmg] };
    } else {
      boardMessageByBoardId = { ...boardMessageByBoardId, [bmg.boardId]: [bmg] };
    }
  });
  const moreUserDetails = Object.values(messageByConnectionId).map(arr => ({ ...findUserChatListDetails(arr, props), message: arr.sort(normalTimeStampSorting) }));
  const moreBoardDetails = Object.values(boardMessageByBoardId).map(arr => ({ ...findBoardMessageDetails(arr, props), message: arr.sort(normalTimeStampSorting) }));
  const moreDetails = [...moreUserDetails, ...moreBoardDetails].sort(timeStampSorting);
  const chatList = moreDetails.sort(timeStampSorting);
  return chatList;
};
