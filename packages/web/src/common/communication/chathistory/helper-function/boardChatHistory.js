import isSameDay from 'date-fns/isSameDay';
import findMessageSeenStatus from './findMessageSeenStatus';
import findLastMessageAndUnSeenNo from './findLastMessageAndUnSeenNo';
import findSeenStatusToShow from './findSeenStatusToShow';

export default (props) => {
  const { database, webRtc } = props;
  let messages = [];
  const arrWithSeenStatus = [];
  let arrWithSeenStatusToShow = [];
  let lastMessageSeenIdAndUnseenNo = null;
  let userShowTestFlag = null;
  let isSameDayFlagDate = null;
  let isSameDayFlagImage = null;

  messages = Object.values(database.BoardMessage.byId).filter(msg => msg.boardId === webRtc.chatHistory.connectionId);
  if (messages.length > 0) {
    messages.forEach((umd, idx, arr) => {
      if (!isSameDay(isSameDayFlagDate, new Date(umd.timeStamp)) || idx === 0) {
        arrWithSeenStatus.push({ ...umd, showImage: false, type: 'date', seenStatus: findMessageSeenStatus(umd.id, 'board', props) });
        isSameDayFlagDate = umd.timeStamp;
        // console.log('inside test is sameday', umd.id, arrWithSeenStatus);
      }
      if (umd.userId === userShowTestFlag) {
        if (idx !== 0) {
          if (arr[idx - 1].type) {
            arrWithSeenStatus.push({ ...umd, showImage: true, seenStatus: findMessageSeenStatus(umd.id, 'board', props) });
          } else if (!isSameDay(isSameDayFlagImage, new Date(umd.timeStamp))) {
            arrWithSeenStatus.push({ ...umd, showImage: true, seenStatus: findMessageSeenStatus(umd.id, 'board', props) });
            isSameDayFlagImage = umd.timeStamp;
          } else {
            arrWithSeenStatus.push({ ...umd, showImage: false, seenStatus: findMessageSeenStatus(umd.id, 'board', props) });
          }
        } else {
          arrWithSeenStatus.push({ ...umd, showImage: false, seenStatus: findMessageSeenStatus(umd.id, 'board', props) });
        }
      } else if (umd.userId !== userShowTestFlag) {
        userShowTestFlag = umd.userId;
        arrWithSeenStatus.push({ ...umd, showImage: true, seenStatus: findMessageSeenStatus(umd.id, 'board', props) });
      } else {
        console.log('Test');
        arrWithSeenStatus.push({ ...umd, showImage: false, seenStatus: findMessageSeenStatus(umd.id, 'board', props) });
      }
    });
    arrWithSeenStatusToShow = findSeenStatusToShow(arrWithSeenStatus, Object.values(database.BoardMember.byId).filter(obj => obj.boardId === webRtc.chatHistory.connectionId));
    lastMessageSeenIdAndUnseenNo = findLastMessageAndUnSeenNo(arrWithSeenStatus, 'board', props);
  }
  return { messages: arrWithSeenStatusToShow, ...lastMessageSeenIdAndUnseenNo };
};
