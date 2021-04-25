
const findMessageSeenStatus = (msgId, type, messageSeenStatus) => {
  try {
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
  } catch (e) {
    console.error('Error in findMessageSeenStatus')
  }
};
export default findMessageSeenStatus;
