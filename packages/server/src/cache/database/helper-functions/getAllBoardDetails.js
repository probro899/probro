/* eslint-disable import/no-cycle */
import lodash from 'lodash';
import { findBoardDetail } from '../../../api';
import flat from '../../../api/flat';
import cacheDatabase from '../cache';

const findBoardActiveStatus = (session, boardId) => {
  const liveBoardSessions = session.getChannel(`Board-live-${boardId}`) || [];
  // console.log('Live Board Sessions', liveBoardSessions);
  if (liveBoardSessions.length > 1) {
    const { activeStatus } = liveBoardSessions[0].userData.Board.find(b => b.id === boardId);
    // console.log('session to be extracted', anySession);
    return activeStatus;
  }
  return false;
};

export default (id, session) => {
  const allDbBoardMembers = cacheDatabase.get('BoardMember');
  const allDbBoard = cacheDatabase.get('Board');
  const allDbBoardMessageSeenStatus = cacheDatabase.get('BoardMessageSeenStatus');
  const allDbBoardMessage = cacheDatabase.get('BoardMessage');

  const BoardMember = allDbBoardMembers.filter(bm => bm.tuserId === id);
  const Board = allDbBoard.filter(b => b.userId === id);
  const allBoardsTemp = BoardMember.map(bm => allDbBoard.find(b => b.id === bm.boardId));
  // const allBoards = allBoardsTemp.filter(b => b).map(b => ({ ...b, activeStatus: findBoardActiveStatus(session, b.id) }));
  const allBoards = allBoardsTemp.filter(b => b);
  // console.log('all board', allBoards);

  const BoardMessage = allBoards.map(b => allDbBoardMessage.filter(bm => bm.boardId === b.id));

  const BoardMessageSeenStatus = flat(BoardMessage).map(bm => allDbBoardMessageSeenStatus.filter(bms => bms.bmId === bm.id));
  // console.log('BoardMessage', BoardMessage);

  const allBoardMembers = allBoards.map(b => allDbBoardMembers.filter(bm => bm.boardId === b.id));
  // console.log('all Board Member', allBoardMembers.flat());
  const allBoardUserList = lodash.uniq(flat(allBoardMembers).map(obj => obj.tuserId));

  // console.log('uniqUser and BoarUserDetails', uniqUsers, allBoardUserDetails);
  const boardDetails = allBoards.map(b => findBoardDetail(b.id));
  // console.log('boardDetails', JSON.stringify(boardDetails));
  const BoardColumn = flat(boardDetails.map(obj => obj.boardColumn));
  const BoardColumnCard = flat(flat(boardDetails.map(obj => obj.boardColumnCard)));
  const BoardColumnCardAttachment = flat(flat(boardDetails.map(obj => obj.boardColumnCardAttachment)));
  const BoardColumnCardComment = flat(flat(boardDetails.map(obj => obj.boardColumnCardComment)));
  // console.log('board columnCardAttachment', boardColumnCardComment);
  const BoardColumnCardDescription = flat(flat(boardDetails.map(obj => obj.boardColumnCardDescription)));
  const BoardColumnCardTag = flat(flat(boardDetails.map(obj => obj.boardColumnCardTag)));

  return { allBoards, allBoardMembers, BoardMessage, BoardMessageSeenStatus, allBoardUserList, BoardColumnCardTag, BoardColumn, BoardColumnCard, BoardColumnCardAttachment, BoardColumnCardComment, BoardColumnCardDescription }
};
