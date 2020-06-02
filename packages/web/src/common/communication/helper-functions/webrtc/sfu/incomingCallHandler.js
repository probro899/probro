import store from '../../../../../store';

export default (props, msg, jsep) => {
  const { updateWebRtc } = props;
  const { webRtc, database } = store.getState();
  // console.log('incoming call handler called', msg, jsep, props);
  const { result } = msg;
  const connectionId = parseInt(result.username, 10);
  const broadCastId = parseInt(result.username, 10);
  const type = 'user';
  updateWebRtc('janus', { ...webRtc.janus, jsep });
  updateWebRtc('chatHistory', { connectionId, type, user: { user: database.User.byId[broadCastId] }, broadCastId });
  updateWebRtc('showCommunication', parseInt(result.username, 10));
  updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, chatHistory: { connectionId, type: 'user', user: { user: database.User.byId[parseInt(result.username, 10)] }, broadCastId } });
  updateWebRtc('showIncommingCall', true);
};
