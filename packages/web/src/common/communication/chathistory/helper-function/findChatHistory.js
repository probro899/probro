import _ from 'lodash';
import isSameDay from 'date-fns/isSameDay';

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
  const arrWithSeenStatusReverse = arr.slice().reverse();
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
  const lastMessage = arrWithSeenStatusReverse.find(obj => obj[type === 'user' ? 'fuserId' : 'userId'] !== account.user.id)
  const lastMessageId = lastMessage ? lastMessage.id : arrWithSeenStatusReverse[0].id;
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

  const result = arrWithSeenStatus.slice().reverse().map((msg) => {
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
  return result;
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
  const arrWithSeenStatus = [];
  let arrWithSeenStatusToShow = [];
  let lastMessageSeenIdAndUnseenNo = null;
  let userShowTestFlag = null;
  let isSameDayFlag = null;
  if (webRtc.chatHistory) {
    if (webRtc.chatHistory.type === 'user') {
      messages = Object.values(database.UserMessage.byId).filter(msg => msg.connectionId === webRtc.connectionId);
      if (messages.length > 0) {
        isSameDayFlag = new Date(messages[0].timeStamp);
        messages.forEach((umd, idx) => {
          if (!isSameDay(isSameDayFlag, new Date(umd.timeStamp)) || idx === 0) {
            arrWithSeenStatus.push({ ...umd, showImage: false, type: 'date', seenStatus: findMessageSeenStatus(umd.id, 'user', props) });
            isSameDayFlag = umd.timeStamp;
            // console.log('inside test is sameday', umd.id, arrWithSeenStatus);
          }
          if (umd.tuserId === userShowTestFlag) {
            // console.log('inside test', umd.id, arrWithSeenStatus);
            arrWithSeenStatus.push({ ...umd, showImage: false, seenStatus: findMessageSeenStatus(umd.id, 'user', props) });
          } else {
            // console.log('inside test', umd.id, arrWithSeenStatus);
            userShowTestFlag = umd.tuserId;
            arrWithSeenStatus.push({ ...umd, showImage: true, seenStatus: findMessageSeenStatus(umd.id, 'user', props) });
          }
        });
        arrWithSeenStatusToShow = findSeenStatusToShow(arrWithSeenStatus, [webRtc.chatHistory.user.user.id], 'user');
        lastMessageSeenIdAndUnseenNo = findLastMessageAndUnSeenNo(arrWithSeenStatus, 'user', props);
      }
    } else {
      messages = Object.values(database.BoardMessage.byId).filter(msg => msg.boardId === webRtc.chatHistory.connectionId);
      if (messages.length > 0) {
        messages.forEach((umd, idx) => {
          if (!isSameDay(isSameDayFlag, new Date(umd.timeStamp)) || idx === 0) {
            arrWithSeenStatus.push({ ...umd, showImage: false, type: 'date', seenStatus: findMessageSeenStatus(umd.id, 'user', props) });
            isSameDayFlag = umd.timeStamp;
            // console.log('inside test is sameday', umd.id, arrWithSeenStatus);
          }
          if (umd.userId === userShowTestFlag) {
            arrWithSeenStatus.push({ ...umd, showImage: false, seenStatus: findMessageSeenStatus(umd.id, 'board', props) });
          } else {
            userShowTestFlag = umd.userId;
            arrWithSeenStatus.push({ ...umd, showImage: true, seenStatus: findMessageSeenStatus(umd.id, 'board', props) });
          }
        });
        arrWithSeenStatusToShow = findSeenStatusToShow(arrWithSeenStatus, Object.values(database.BoardMember.byId).filter(obj => obj.boardId === webRtc.showCommunication));
        lastMessageSeenIdAndUnseenNo = findLastMessageAndUnSeenNo(arrWithSeenStatus, 'board', props);
      }
    }
  }
  // console.log('messages in chatHistory', arrWithSeenStatus);
  return { messages: arrWithSeenStatusToShow, ...lastMessageSeenIdAndUnseenNo };
};
