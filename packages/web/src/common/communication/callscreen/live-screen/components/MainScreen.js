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

  render() {
    const { database, webRtc } = this.props;
    // console.log('MainScreenProps', this.props);
    const { type, connectionId } = webRtc.localCallHistory.chatHistory;
    const isUser = type === 'user';
    const userId = isUser ? webRtc.mainStreamId : database.Board.byId[connectionId].activeStatus;
    return (
      <div className="pc-main-screen">
        <video
          // controls
          id="video-mentor"
          playsInline
          controlsList="noremoteplayback"
          autoPlay
          className="pc-main-video"
          poster={userId && `${ENDPOINT}/user/${10000000 + parseInt(userId, 10)}/profile/${Object.values(database.UserDetail.byId).find(u => u.userId === userId).image}`}
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
