import _ from 'lodash';
import flat from './flat';

export default (arrWithSeenStatus, boardMember, type) => {
  // console.log('data in findSeenStatusToShow', arrWithSeenStatus, boardMember);
  let boardMembers = [];
  if (type === 'user') {
    boardMembers = boardMember;
  } else {
    boardMembers = _.uniq(flat(boardMember.map(bm => [bm.tuserId, bm.fuserId])));
  }

  const result = arrWithSeenStatus.slice().reverse().map((msg) => {
    const seenUsers = [];
    if (boardMembers.length > 0) {
      msg.seenStatus.forEach((u) => {
        const uId = boardMembers.find(bm => bm === u.userId);
        if (uId) {
          boardMembers = boardMembers.filter(userId => userId !== u.userId);
          seenUsers.push(u);
        }
      });
    }
    return { ...msg, seenStatus: seenUsers };
  });
  // console.log('board seen status', result);
  return result;
};
