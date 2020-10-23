import _ from 'lodash';
import { timeStampSorting } from '../../../common/utility-functions';

export default (newProps, oldProps) => {
  const { database, webRtc, updateWebRtc } = newProps;
  const oldDataBase = oldProps.database;
  const currentChatList = webRtc.chatList || [];
  // console.log('updateUserActiveStatus called -1', oldDataBase, database);
  if (!_.isEqual(database.UserConnection.byId, oldDataBase.UserConnection.byId)) {
    const newChatList = [];
    // console.log('check 1', newProps);
    currentChatList.forEach((ucl) => {
      if (ucl.type === 'user') {
        const uc = database.UserConnection.byId[ucl.connectionId] || {};
        if (uc.activeStatus !== ucl.activeStatus) {
          newChatList.push({ ...ucl, activeStatus: uc.activeStatus });
        } else {
          newChatList.push(ucl);
        }
      } else {
        newChatList.push(ucl);
      }
    });
    const chatListTobeUpdate = newChatList.sort(timeStampSorting);
    if (chatListTobeUpdate.length > 0) {
      updateWebRtc('chatList', chatListTobeUpdate);
    }
  }
};
