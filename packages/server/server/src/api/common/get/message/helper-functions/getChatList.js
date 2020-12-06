import { timeStampSorting } from '../../../timeStampSortHelper';
import getUserMessage from './getUserMessage';
import getBoardMessage from './getBoardMessage';
import findUserChatListDetails from './findUserChatListDetails';
import findBoardMessageDetails from './findBoardMessageDetails';

export default function getChatlist() {
  const { session } = this;
  const { id } = session.values.user;
  const { userMessages, userMessageSeenStatus, connectionList } = getUserMessage(id);
  const { BoardMessage, BoardMessageSeenStatus, allBoards } = getBoardMessage(id);
  let messageByConnectionId = {};
  let boardMessageByBoardId = {};
  userMessages.forEach((msg) => {
    if (messageByConnectionId[msg.connectionId]) {
      messageByConnectionId = { ...messageByConnectionId, [msg.connectionId]: [...messageByConnectionId[msg.connectionId], msg] };
    } else {
      messageByConnectionId = { ...messageByConnectionId, [msg.connectionId]: [msg] };
    }
  });

  BoardMessage.forEach((bmg) => {
    if (boardMessageByBoardId[bmg.boardId]) {
      boardMessageByBoardId = { ...boardMessageByBoardId, [bmg.boardId]: [...boardMessageByBoardId[bmg.boardId], bmg] };
    } else {
      boardMessageByBoardId = { ...boardMessageByBoardId, [bmg.boardId]: [bmg] };
    }
  });

  const moreUserDetails = Object.values(messageByConnectionId).map(arr => ({ ...findUserChatListDetails(arr, connectionList, userMessageSeenStatus, id) }));
  // console.log('moreUserDetails', moreUserDetails);
  const moreBoardDetails = Object.values(boardMessageByBoardId).map(arr => ({ ...findBoardMessageDetails(arr, allBoards, BoardMessageSeenStatus, id) }));
  // console.log('More board Details', moreBoardDetails);
  const moreDetails = [...moreUserDetails, ...moreBoardDetails].sort(timeStampSorting);
  // console.log('moreDetails', moreDetails);
  const chatList = moreDetails.sort(timeStampSorting);
  return chatList;
};
