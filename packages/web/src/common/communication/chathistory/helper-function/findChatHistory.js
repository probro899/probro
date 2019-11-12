import _ from 'lodash';

const flat = (arr) => {
  const flatArray = arr.reduce((t, a) => {
    if (Array.isArray(a)) {
      a.forEach(am => t.push(am));
    } else {
      t.push(a);
    }
    return t;
  }, []);
  return flatArray;
};

const findLastMessageAndUnSeenNo = (arr, type, props) => {
  const { account } = props;
  const arrWithSeenStatusReverse = arr.reverse();
  const unseenMsg = arrWithSeenStatusReverse.findIndex(obj => obj.seenStatus.find(o => o.userId === account.user.id));
  let unSeenNo;
  if (unseenMsg === -1) {
    unSeenNo = arrWithSeenStatusReverse.length;
  } else {
    let count = 0;
    for (let i = 0; i < unseenMsg; i += 1) {
      if (arrWithSeenStatusReverse[i][type === 'user' ? 'fuserId' : 'userId'] !== account.user.id) {
        count += 1;
      }
    }
    unSeenNo = count;
  }
  // console.log('unseenMsgMessage', unseenMsg);
  const lastMessageId = arrWithSeenStatusReverse.find(obj => obj[type === 'user' ? 'fuserId' : 'userId'] !== account.user.id).id;
  return { lastMessageId, unSeenNo };
};

const findSeenStatusToShow = (arrWithSeenStatus, boardMember, type) => {
  // console.log('data in findSeenStatusToShow', arrWithSeenStatus, boardMember);
  let boardMembers = [];
  if (type === 'user') {
    boardMembers = boardMember;
  } else {
    boardMembers = _.uniq(flat(boardMember.map(bm => [bm.tuserId, bm.fuserId])));
  }

  const result = arrWithSeenStatus.reverse().map((msg) => {
    const seenUsers = [];
    if (boardMembers.length > 0) {
      msg.seenStatus.forEach((u) => {
        const uId = boardMembers.find(bm => bm === u.userId);
        if (uId) {
          boardMembers = boardMembers.filter(userId => userId !== u.userId);
          seenUsers.push(u);
        }
      });
    }
    return { ...msg, seenStatus: seenUsers };
  });
  // console.log('board seen status', result);
  return result.reverse();
};

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

export default (props) => {
  const { database, webRtc } = props;
  let messages = [];
  let arrWithSeenStatus = [];
  let arrWithSeenStatusToShow = [];
  let lastMessageSeenIdAndUnseenNo = null;
  if (webRtc.chatHistory) {
    if (webRtc.chatHistory.type === 'user') {
      messages = Object.values(database.UserMessage.byId).filter(msg => msg.connectionId === webRtc.connectionId);
      arrWithSeenStatus = messages.map(umd => ({ ...umd, seenStatus: findMessageSeenStatus(umd.id, 'user', props) }));
      arrWithSeenStatusToShow = findSeenStatusToShow(arrWithSeenStatus, [webRtc.chatHistory.user.user.id], 'user');
      lastMessageSeenIdAndUnseenNo = findLastMessageAndUnSeenNo(arrWithSeenStatus.reverse(), 'user', props);
    } else {
      messages = Object.values(database.BoardMessage.byId).filter(msg => msg.boardId === webRtc.showCommunication);
      arrWithSeenStatus = messages.map(umd => ({ ...umd, seenStatus: findMessageSeenStatus(umd.id, 'board', props) }));
      arrWithSeenStatusToShow = findSeenStatusToShow(arrWithSeenStatus, Object.values(database.BoardMember.byId).filter(obj => obj.boardId === webRtc.showCommunication));
      lastMessageSeenIdAndUnseenNo = findLastMessageAndUnSeenNo(arrWithSeenStatus.reverse(), 'board', props);
    }
  }
  // console.log('messages in chatHistory', arrWithSeenStatus);
  return { messages: arrWithSeenStatusToShow, ...lastMessageSeenIdAndUnseenNo };
};
