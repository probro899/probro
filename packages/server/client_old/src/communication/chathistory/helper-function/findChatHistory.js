import userChatHistory from './userChatHistory';
import boardChatHistory from './boardChatHistory';

export default (props) => {
  const { webRtc } = props;
  if (webRtc.chatHistory) {
    if (webRtc.chatHistory.type === 'user') {
      return userChatHistory(props);
    }
    return boardChatHistory(props);
  }
};
