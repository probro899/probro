/* eslint-disable import/no-cycle */
import lodash from 'lodash';
import findBoardDetail from './findBoradDetail';
import flat from '../flat';
import cacheDatabase from '../../cache/database/cache';

export default (id, session) => {
  const allDbBoardMembers = cacheDatabase.get('BoardMember');
  const allDbBoard = cacheDatabase.get('Board');
  const allDbBoardMessageSeenStatus = cacheDatabase.get('BoardMessageSeenStatus');
  const allDbBoardMessage = cacheDatabase.get('BoardMessage');
  const templatesBoards = allDbBoard.filter(b => b.type === 'template');
  const BoardMember = allDbBoardMembers.filter(bm => bm.tuserId === id && !bm.deleteStatus);
  const Board = allDbBoard.filter(b => b.userId === id);
  const allBoardsTemp = BoardMember.map(bm => allDbBoard.find(b => b.id === bm.boardId));
  const allBoards = ([...allBoardsTemp, ...templatesBoards]).filter(b => b).filter(b => b.deleteStatus !== 1);
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
