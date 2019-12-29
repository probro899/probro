/* eslint-disable import/no-cycle */
import lodash from 'lodash';
import { findBoardDetail } from '../../../api';
import flat from '../../../api/flat';

export default async (find, findOne, id) => {
  const BoardMember = await find('BoardMember', { tuserId: id });
  const Board = await find('Board', { userId: id });
  const boardPromises = [];
  BoardMember.forEach(bm => boardPromises.push(findOne('Board', { id: bm.boardId })));
  const allBoardsTemp = await Promise.all(boardPromises);
  const allBoards = allBoardsTemp.filter(b => b);
  // console.log('all board', allBoards);

  const boardMessagePromises = [];
  allBoards.forEach(b => boardMessagePromises.push(find('BoardMessage', { boardId: b.id })));
  const BoardMessage = await Promise.all(boardMessagePromises);
  const boardMessageSeenStatusPromises = [];
  flat(BoardMessage).forEach(msg => boardMessageSeenStatusPromises.push(find('BoardMessageSeenStatus', { bmId: msg.id })));
  const BoardMessageSeenStatus = await Promise.all(boardMessageSeenStatusPromises);
  // console.log('BoardMessage', BoardMessage);

  const boardDetailsPromises = [];
  allBoards.forEach((b) => {
    boardDetailsPromises.push(findBoardDetail(b.id));
  });

  const boardUserPromises = [];
  allBoards.forEach((b) => {
    boardUserPromises.push(find('BoardMember', { boardId: b.id }));
    // boardUserPromises.push(find('Board', { id: b.id }));
  });

  const allBoardMembers = await Promise.all(boardUserPromises);
  // console.log('all Board Member', allBoardMembers.flat());
  const allBoardUserList = lodash.uniq(flat(allBoardMembers).map(obj => obj.tuserId));

  // console.log('uniqUser and BoarUserDetails', uniqUsers, allBoardUserDetails);
  const boardDetails = await Promise.all(boardDetailsPromises);
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
