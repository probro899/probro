
const findMessageSeenStatus = (msgId, type, messageSeenStatus) => {
  const users = [];
  if (type === 'board') {
    messageSeenStatus.forEach((obj) => {
      if (obj.bmId === msgId) {
        users.push(obj);
      }
    });
  }

  if (type === 'user') {
    messageSeenStatus.forEach((obj) => {
      if (obj.umId === msgId) {
        users.push(obj);
      }
    });
  }
  return users;
};
export default findMessageSeenStatus;
