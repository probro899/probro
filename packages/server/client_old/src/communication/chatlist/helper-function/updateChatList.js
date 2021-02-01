import _ from 'lodash';
import getChatList from './getChatList';
import { timeStampSorting } from '../../../common/utility-functions';

export default (newProps, oldProps) => {
  const { webRtc, updateWebRtc, database } = newProps;
  const preDatabase = oldProps.database;

  if (
    !_.isEqual(preDatabase.UserMessage.byId, database.UserMessage.byId)
    || !_.isEqual(preDatabase.UserMessageSeenStatus.byId, database.UserMessageSeenStatus.byId)
    || !_.isEqual(preDatabase.BoardMessage.byId, database.BoardMessage.byId)
    || !_.isEqual(preDatabase.BoardMessageSeenStatus.byId, database.BoardMessageSeenStatus.byId)
  ) {
    let oldchatList = webRtc.chatList || [];
    const newChatList = getChatList(newProps);
    newChatList.forEach((obj, oIdx) => {
      const connectionIndex = oldchatList.findIndex(c => c.connectionId === obj.connectionId && c.type === obj.type);
      if ((connectionIndex !== -1 && oIdx === 0) || obj.unSeenNo === 0) {
        oldchatList = oldchatList.map((c, idx) => {
          if (idx === connectionIndex) {
            return {
              ...c,
              lastMessage: obj.lastMessage,
              lastMessageId: obj.lastMessageId,
              timeStamp: obj.timeStamp,
              unSeenNo: obj.unSeenNo === 0 ? 0 : c.unSeenNo + 1,
              activeStatus: obj.activeStatus,
            };
          }
          return c;
        });
      }
      if (connectionIndex === -1) {
        oldchatList.push(obj);
      }
    });
    const chatListTobeUpdate = oldchatList.sort(timeStampSorting);
    if (chatListTobeUpdate.length > 0) {
      updateWebRtc('chatList', chatListTobeUpdate);
    }
  }
};
