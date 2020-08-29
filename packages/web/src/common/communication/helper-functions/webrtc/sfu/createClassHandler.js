/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import uuid from 'uuid';
import store from '../../../../../store';

export default (apis) => {
  // console.log('Create class called', apis);
  const { database, account, webRtc } = store.getState();
  const userId = account.user.id;
  const id = webRtc.localCallHistory.chatHistory.connectionId;
  const pluginHandler = webRtc.janus.conferenceCall;
  const joinToken = uuid();
  const boardName = database.Board.byId[id].name;
  const noOfmembers = Object.values(database.BoardMember.byId).filter(bm => bm.boardId === id).length;
  const edit = { request: 'edit', description: boardName, room: id, publishers: noOfmembers, new_pin: joinToken };
  pluginHandler.send({
    message: edit,
    success: (result) => {
      const event = result.videoroom;
      const { error, error_code, room } = result;

      if (event !== undefined && event !== null) {
        // Our own screen sharing session has been created, join it'
        if (room) {
          // console.log('Room created: ', result);
          const register = { request: 'join', room: room || id, ptype: 'publisher', display: `${userId}`, pin: joinToken };
          pluginHandler.send({ message: register });
          apis.initSfuCall({ activeStatus: userId, id, joinToken, mediaType: webRtc.localCallHistory.mediaType });
        } else if (error && error_code === 426) {
          const create = { request: 'create', description: boardName, room: id, publishers: noOfmembers, new_pin: joinToken };
          pluginHandler.send({
            message: create,
            success: (createResult) => {
              const event = result.videoroom;
              const { error, error_code, room } = createResult;

              if (event !== undefined && event !== null) {
                if (room) {
                  // console.log('Room created: ', result);
                  const register = { request: 'join', room: room || id, ptype: 'publisher', display: `${userId}`, pin: joinToken };
                  pluginHandler.send({ message: register });
                  apis.initSfuCall({ activeStatus: userId, id, joinToken, mediaType: webRtc.localCallHistory.mediaType });
                } else if (error && error_code) {
                  console.error('Eror in creating room', createResult);
                }
              }
            },
            error: (err) => {
              console.error('Room Create Error', err);
            },
          });
        }
      }
    },
    error: (err) => {
      console.error('Room Create Error', err);
    },
  });
};
