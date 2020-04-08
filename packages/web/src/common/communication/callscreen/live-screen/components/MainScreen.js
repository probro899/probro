/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import { ENDPOINT } from '../../../../../config';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // shouldComponentUpdate(nextProps) {
  //   const { database, webRtc } = this.props;

  //   const currentMainUiId = database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId];
  //   const newMainId = nextProps.database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId]
  //   if (currentMainUiId !== newMainId) {
  //     return true;
  //   }
  //   return false;
  // }

  // componentDidUpdate() {
  //   // console.log('User View DidUpdte called', this.props);
  //   const { webRtc, database } = this.props;
  //   const userIds = Object.keys(webRtc.connectedUsers);
  //   const videoElment = userIds.map(uid => document.getElementById(`video-${uid}`));
  //   // console.log('all Video Elements', allVideoElements, userIds);
  //   const mentorId = database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].activeStatus;
  //   console.log('Mentor id', mentorId);
  //   if (videoElment) {
  //     webRtc.connectedUsers[mentorId].streams.forEach((stream) => {
  //       if (stream.streams) {
  //         videoElment.srcObject = stream.streams[0];
  //       }
  //     });
  //   }
  // }

  render() {
    const { database, webRtc, account } = this.props;
    // console.log('MainScreenProps', this.props);
    const { type, connectionId } = webRtc.localCallHistory.chatHistory;
    const isUser = type === 'user';
    const userId = isUser ? webRtc.mainStreamId : database.Board.byId[connectionId].activeStatus;
    const user = Object.values(database.UserDetail.byId).find(u => u.userId === userId);
    return (
      <div className="pc-main-screen">
        {/* <div style={{ width: '100%', height: '100%', zIndex: 1, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ height: 50, width: 50, borderRadius: '50%', background: 'red' }} />
        </div> */}
        <video
          // controls
          id="video-mentor"
          playsInline
          controlsList="noremoteplayback"
          autoPlay
          muted={database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].activeStatus === account.user.id}
          className="pc-main-video"
          poster={user && `${ENDPOINT}/user/${10000000 + parseInt(userId, 10)}/profile/${Object.values(database.UserDetail.byId).find(u => u.userId === userId).image}`}
        />

      </div>
    );
  }
}

export default MainScreen;
MainScreen.propTypes = {
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};
