
export default (msg, props) => {
  const { database, webRtc, account } = props;
  if (webRtc.chatHistory.type === 'user') {
    const { user, userDetails } = webRtc.chatHistory.user;
    if (msg.fuserId === account.user.id) {
      return { isOwn: true, user: account.user };
    }
    return { isOwn: false, user: { ...user, userDetails } };
  }

  if (msg.userId === account.user.id) {
    return { isOwn: true, user: account.user };
  }
  const boardUser = Object.values(database.BoardMember.byId).find(bm => bm.tuserId === msg.userId);
  if (boardUser) {
    const { user, userDetail } = boardUser.user;
    return { isOwn: false, user: { ...user, userDetails: userDetail } };
  }
};
