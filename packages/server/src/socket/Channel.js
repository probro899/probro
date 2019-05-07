import { PKT_ACTION, PKT_EVENT } from '@probro/common/proSocket-common';

class Channel {
  constructor(id) {
    this.id = id;
  }

  dispatch(action) {
    return Channel.provider.publish(this.id, PKT_ACTION(action));
  }

  emit(event, data) {
    return Channel.provider.publish(this.id, PKT_EVENT(event, data));
  }
}

Channel.subscribe = (id, session) => Channel.provider.subscribe(id, session);

Channel.unsubscribe = (id, session) => Channel.provider.unsubscribe(id, session);

Channel.setProvider = (provider) => {
  // console.log('provider', provider);
  Channel.provider = provider;
};

Channel.get = id => new Channel(id);
//  console.log('Channel', Channel.get());
export default Channel;
