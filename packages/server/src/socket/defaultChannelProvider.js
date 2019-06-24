/**
 * A default channel provider that works on a single system.
 * For production use consider something like shocked-channel-redis
 */

function presentorTestor(id, userList) {
  let p = false;
  userList.forEach((e) => {
    if (id === e.userId) {
      p = true;
      return p;
    }
  });
  return p;
}

export default function createDefaultProvider() {
  const channels = {};

  return {
    // TODO: Make sure the session is not added more than once
    subscribe: (channelId, session) => {
      const list = channels[channelId];
      // console.log('subcripbe preslist channel', list);
      if (!list) {
        channels[channelId] = [session];
        // console.log('channel data after subscription', channels.Board);
      } else {
        list.push(session);
        // console.log('chanel record after another user login', channels.Board[0].scopes);
      }
      // console.log('ALll channels', channels);
      return true;
    },

    unsubscribe: (channelId, session) => {
      const list = channels[channelId];
      if (!list) {
        return false;
      }

      const idx = list.indexOf(session);
      if (idx === -1) {
        return false;
      }

      list.splice(idx, 1);

      // Cleanup
      if (list.length === 0) {
        delete channels[channelId];
      }
      return true;
    },

    publish: (channelId, message, userList) => {
      const list = channels[channelId];
      if (userList) {
        // console.log('default Channel data', list[0].values.user.user, userList);
        const shortedUserList = list.filter(session => presentorTestor(session.values.user.id, userList));
        shortedUserList.forEach(session => session.send(message));
      } else if (!userList && list) {
        list.forEach(session => session.send(message));
      }
    },

    getChannel: channelId => channels[channelId],
  };
}
