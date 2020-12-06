import findUserDetails from '../../../findUserDetails';
import cacheDatabase from '../../../../../cache/database/cache';
import userPresentorHelper from '../../../../initializers/isUserActiveStatus';
import flat from '../../../../flat';

export default function dispatchBoardChatHistory(session, schema, id, connectionId, noOfMessage) {
  // console.log('dispatch board history called', noOfMessage);
  const allDbBoardMessage = cacheDatabase.get('BoardMessage');
  const allDbBoardMessageSeenStatus = cacheDatabase.get('BoardMessageSeenStatus');
  const allDbBoardMember = cacheDatabase.get('BoardMember');
  const boardMember = allDbBoardMember.filter(bm => bm.boardId === connectionId);
  const boardMemberWithUser = boardMember.map(bm => ({ ...bm, user: findUserDetails(bm.tuserId) }));
  const allBoardMemberWithActiveStatus = userPresentorHelper(session.getChannel('Main'), boardMemberWithUser);
  const boardMemberActiveStatusToUpdate = allBoardMemberWithActiveStatus.map(bma => ({ ...bma, activeStatus: bma.activeStatus, userId: bma.user.user.id }));
  const boardMessages = allDbBoardMessage.filter(bm => bm.boardId === connectionId);
  const boardMessageSeenStatus = flat(boardMessages.map(bm => allDbBoardMessageSeenStatus.filter(bms => bms.bmId === bm.id)));
  let slice1 = boardMessages.length - (parseInt(noOfMessage, 10) + 20);
  if ((slice1 < 20 && slice1 > 0) || slice1 < 0) {
    slice1 = 0;
  }
  if (slice1 >= 0) {
    const slice2 = boardMessages.length - parseInt(noOfMessage, 10);
    const dataTobeSend = boardMessages.slice(slice1, slice2);
    session.dispatch(schema.add('BoardMember', boardMemberActiveStatusToUpdate));
    session.dispatch(schema.add('BoardMessageSeenStatus', boardMessageSeenStatus));
    session.dispatch(schema.add('BoardMessage', dataTobeSend));
  }
  return { totalMessage: boardMessages.length };
}
