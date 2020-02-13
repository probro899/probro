
const findNotificationSeenStatus = (notifId, props) => {
  const { database } = props;
  const users = [];
  Object.values(database.NotificationReadStatus.byId).forEach((obj) => {
    if (obj.notifId === notifId) {
      users.push(obj);
    }
  });
  return users;
};

export default (props) => {
  console.log('props in get Read notification', props);
  const { database, account } = props;
  if (database.Notification.allIds.length > 0) {
    const arrWithSeenStatus = Object.values(database.Notification.byId).map(un => ({ ...un, seenStatus: findNotificationSeenStatus(un.id, props) }));
    const arrWithSeenStatusReverse = arrWithSeenStatus.slice().reverse();
    const unseenMsg = arrWithSeenStatusReverse.findIndex(obj => obj.seenStatus.find(o => o.userId === account.user.id));
    let unSeenNo;
    if (unseenMsg === -1) {
      unSeenNo = arrWithSeenStatus.length;
    } else {
      unSeenNo = unseenMsg;
    }
    // console.log('unseenMsgMessage', unseenMsg);
    const notiObj = arrWithSeenStatusReverse[0];
    return { lastNotifId: notiObj.id, unSeenNo };
  }
  return {};
};
