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
  let isSameDayFlag = null;
  let isSameDayFlagImage = null;

  messages = Object.values(database.UserMessage.byId).filter(msg => msg.connectionId === webRtc.chatHistory.connectionId);
  if (messages.length > 0) {
    isSameDayFlag = new Date(messages[0].timeStamp);
    messages.forEach((umd, idx, arr) => {
      if (!isSameDay(isSameDayFlag, new Date(umd.timeStamp)) || idx === 0) {
        arrWithSeenStatus.push({ ...umd, showImage: false, type: 'date', seenStatus: findMessageSeenStatus(umd.id, 'user', props) });
        isSameDayFlag = umd.timeStamp;
        // console.log('inside test is sameday', umd.id, arrWithSeenStatus);
      }
      if (umd.tuserId === userShowTestFlag) {
        // console.log('inside test', umd.id, arrWithSeenStatus);

        if (idx !== 0) {
          if (arr[idx - 1].type) {
            arrWithSeenStatus.push({ ...umd, showImage: true, seenStatus: findMessageSeenStatus(umd.id, 'user', props) });
          } else if (!isSameDay(isSameDayFlagImage, new Date(umd.timeStamp))) {
            arrWithSeenStatus.push({ ...umd, showImage: true, seenStatus: findMessageSeenStatus(umd.id, 'user', props) });
            isSameDayFlagImage = umd.timeStamp;
          } else {
            arrWithSeenStatus.push({ ...umd, showImage: false, seenStatus: findMessageSeenStatus(umd.id, 'user', props) });
          }
        } else {
          arrWithSeenStatus.push({ ...umd, showImage: false, seenStatus: findMessageSeenStatus(umd.id, 'user', props) });
        }
      } else {
        // console.log('inside test', umd.id, arrWithSeenStatus);
        userShowTestFlag = umd.tuserId;
        arrWithSeenStatus.push({ ...umd, showImage: true, seenStatus: findMessageSeenStatus(umd.id, 'user', props) });
      }
    });
    arrWithSeenStatusToShow = findSeenStatusToShow(arrWithSeenStatus, [webRtc.chatHistory.user.user.id], 'user');
    lastMessageSeenIdAndUnseenNo = findLastMessageAndUnSeenNo(arrWithSeenStatus, 'user', props);
  }

  return { messages: arrWithSeenStatusToShow, ...lastMessageSeenIdAndUnseenNo };
};
