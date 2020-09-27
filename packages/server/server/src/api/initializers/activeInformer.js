import schema from '@probro/common/src/schema';

export default (uid, boards, boardMemberList, userConnectionList, session, status) => {
  // change online status for all baord members
  return function activeInformer() {
    boards.map((b) => {
      const { id } = boardMemberList.find(bm => bm.boardId === b.id && bm.userId === uid);
      return { channel: session.channel(`Board-${b.id}`), board: b, id };
    }).forEach(obj => obj.channel.dispatch(schema.update('BoardMember', { id: obj.id, activeStatus: status })));

    // change online status for all friends
    const chanelToDispatch = userConnectionList.map((uc) => {
      return { channel: session.channel(`UserConnection-${uc.userId}`), id: uc.id, userId: uc.userId };
    });

    // informing all user friend list channel
    chanelToDispatch.forEach(obj => obj.channel.dispatch(schema.update('UserConnection', { id: obj.id, activeStatus: status }), [{ userId: obj.userId }]));
  };
};