import schema from '@probro/common/src/schema';

export default (uid, boards, boardMemberList, userConnectionList, session, status) => {
  try {
    // change online status for all baord members
    return function activeInformer() {
      boards.map((b) => {
        const { id } = boardMemberList.find(bm => bm.boardId === b.id && bm.userId === uid);
        return { channel: session.channel(`Board-${b.id}`), board: b, id };
      }).forEach(obj => obj.channel.dispatch(schema.update('BoardMember', { id: obj.id, activeStatus: status })));

      // change online status for all friends
      const chanelToDispatch = userConnectionList.map((uc) => {
        return { channel: session.channel(`UserConnection-${uc.user.user.id}`), id: uc.id, userId: uc.user.user.id };
      });

      // informing all user friend list channel
      chanelToDispatch.forEach(obj => obj.channel.dispatch(schema.update('UserConnection', { id: obj.id, activeStatus: status }), [{ userId: obj.userId }]));
    };
  } catch (e) {
    console.error('Error in activeInformer', e);
  }
};
