export default (arr, type, props) => {
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
  const lastMessage = arrWithSeenStatusReverse.find(obj => obj[type === 'user' ? 'fuserId' : 'userId'] !== account.user.id);
  const lastMessageId = lastMessage ? lastMessage.id : arrWithSeenStatusReverse[0].id;
  return { lastMessageId, unSeenNo };
};
