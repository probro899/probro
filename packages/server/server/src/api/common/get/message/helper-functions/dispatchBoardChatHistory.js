import findUserDetails from '../../../findUserDetails';
import cacheDatabase from '../../../../../cache/database/cache';
import flat from '../../../../flat';

export default function dispatchBoardChatHistory(session, schema, id, connectionId) {
  // console.log('dispatch board history called');
  const allDbBoardMessage = cacheDatabase.get('BoardMessage');
  const allDbBoardMessageSeenStatus = cacheDatabase.get('BoardMessageSeenStatus');
  const allDbBoardMember = cacheDatabase.get('BoardMember');
  const boardMember = allDbBoardMember.filter(bm => bm.boardId === connectionId);
  const boardMessages = allDbBoardMessage.filter(bm => bm.boardId === connectionId);
  const boardMessageSeenStatus = flat(boardMessages.map(bm => allDbBoardMessageSeenStatus.filter(bms => bms.bmId === bm.id)));
  const boardMessageWithUser = boardMessages.map(bm => ({ ...bm, user: findUserDetails(bm.userId) }));
  const boardMessageSeenStatusWithUser = boardMessageSeenStatus.map(bms => ({ ...bms, user: findUserDetails(bms.userId) }));
  session.dispatch(schema.add('BoardMessage', boardMessageWithUser));
  session.dispatch(schema.add('BoardMessageSeenStatus', boardMessageSeenStatusWithUser));
  session.dispatch(schema.add('BoardMember', boardMember));
}
