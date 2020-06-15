/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    // console.log('Mentor SCREEN PROPS', nextProps.webRtc, this.props.webRtc);
    const { database, webRtc } = this.props;
    const currentmentorId = webRtc.localCallHistory.chatHistory.type === 'user' ? webRtc.localCallHistory.chatHistory.user.user.id : database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].activeStatus;
    const mentorId = webRtc.localCallHistory.chatHistory.type === 'user' ? webRtc.localCallHistory.chatHistory.user.user.id : nextProps.database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].activeStatus;

    const currentStream = JSON.stringify(webRtc.connectedUsers[mentorId]);
    const newStream = JSON.stringify(nextProps.webRtc.connectedUsers[mentorId]);
    if ((currentStream !== newStream) || (currentmentorId !== mentorId)) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const { webRtc, database, account } = this.props;
    const videoElment = document.getElementById('video-mentor');

    const mentorId = webRtc.localCallHistory.chatHistory.type === 'user' ? webRtc.localCallHistory.chatHistory.user.user.id : database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].activeStatus;
    const mentorStream = webRtc.connectedUsers[mentorId];
    // console.log('Mentor Streams', mentorStream, videoElment);
    if (videoElment && mentorStream) {
      mentorStream.streams.forEach((stream) => {
        if (stream) {
          if (stream.streams) {
            videoElment.srcObject = stream.streams[0];
          }
          if (parseInt(mentorId, 10) === account.user.id) {
            videoElment.srcObject = stream;
          }
          videoElment.srcObject = stream;
        }
      });
    }
  }

  render() {
    // console.log('Mentor Screen');
    const { database, webRtc, account } = this.props;
    const muted = webRtc.localCallHistory.chatHistory.type === 'board' ? database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].activeStatus === account.user.id : false;

    return (
      <div className="pc-main-screen">
        <video
          // controls
          id="video-mentor"
          playsInline
          controlsList="noremoteplayback"
          autoPlay
          muted={muted}
          className="pc-main-video"
          // poster={user && `${ENDPOINT}/user/${10000000 + parseInt(userId, 10)}/profile/${Object.values(database.UserDetail.byId).find(u => u.userId === userId).image}`}
        />

      </div>
    );
  }
}

export default MainScreen;
MainScreen.propTypes = {
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};
