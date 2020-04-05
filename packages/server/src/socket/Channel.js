import { PKT_ACTION, PKT_EVENT } from '@probro/common/proSocket-common';

class Channel {
  constructor(id) {
    this.id = id;
  }

  dispatch(action, userList, userId) {
    return Channel.provider.publish(this.id, PKT_ACTION(action), userList, userId);
  }

  emit(event, data, userList, userId) {
    // console.log(' Channel emit called', event, data, userList);
    return Channel.provider.publish(this.id, PKT_EVENT(event, data), userList, userId);
  }
}

Channel.subscribe = (id, session) => Channel.provider.subscribe(id, session);

Channel.unsubscribe = (id, session) => Channel.provider.unsubscribe(id, session);

Channel.setProvider = (provider) => {
  // console.log('provider', provider);
  Channel.provider = provider;
};

Channel.getChannel = channelId => Channel.provider.getChannel(channelId);

Channel.get = id => new Channel(id);
//  console.log('Channel', Channel.get());
export default Channel;
