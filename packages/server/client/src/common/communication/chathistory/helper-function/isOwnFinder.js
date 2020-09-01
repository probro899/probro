
export default (msg, props) => {
  const { webRtc, account, database } = props;
  if (webRtc.chatHistory.type === 'user') {
    if (msg.fuserId === account.user.id) {
      return { isOwn: true, user: account.user };
    }
    const user = Object.values(database.User.byId).find(obj => obj.id === msg.fuserId);
    const userDetails = Object.values(database.UserDetail.byId).find(obj => obj.userId === msg.fuserId);
    return { isOwn: false, user: { ...user, userDetails } };
  }
  if (msg.userId === account.user.id) {
    return { isOwn: true, user: account.user };
  }
  const user = Object.values(database.User.byId).find(obj => obj.id === msg.userId);
  const userDetails = Object.values(database.UserDetail.byId).find(obj => obj.userId === msg.userId);
  return { isOwn: false, user: { ...user, userDetails } };
};
