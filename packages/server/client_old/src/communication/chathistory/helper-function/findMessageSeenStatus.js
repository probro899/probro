export default (msgId, type, props) => {
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
