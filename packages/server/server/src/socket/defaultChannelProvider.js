/**
 * A default channel provider that works on a single system.
 * For production use consider something like shocked-channel-redis
 */

function presentorTestor(id, userList) {
  // console.log('persentor testor', id, userList);
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
      if (!list) {
        channels[channelId] = [session];
      } else if (!list.find(s => s.values.user.id === session.values.user.id)) {
        list.push(session);
      } else {
        const newList = list.map(s => (s.values.user.id === session.values.user.id ? session : s));
        channels[channelId] = newList;
        console.log('user session is already in channel');
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

    publish: (channelId, message, userList, userId) => {
      const list = channels[channelId] || [];
      if (userList) {
        const shortedUserList = list.filter(session => presentorTestor(session.values.user.id, userList));
        shortedUserList.forEach(session => session.send(message));
      } else if (!userList && list) {
        list.filter(session => session.values.user.id !== userId).forEach(session => session.send(message));
      }
    },
    getChannel: channelId => channels[channelId],
  };
}
