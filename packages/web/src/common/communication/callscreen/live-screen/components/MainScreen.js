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
    const user = Object.values(database.UserDetail.byId).find(u => u.userId === userId);
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: 400, minHeight: 200, width: '100%', minWidth: '100%', background: 'black', border: 'solid', borderWidth: 2, borderColor: 'black', borderRadius: 5, }}>
        <div
          style={{
            width: '98%',
            height: '98%',
            background: 'black',
            minHeight: '90%',
            minWidth: '98%',
            maxHeight: '90%',
            maxWidth: '98%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            margin: 10,
          }}
        >
          <div style={{ height: '100%', width: '100%' }}>
        <video
          controls
          id="video-mentor"
          playsInline
          controlsList="noremoteplayback"
          autoPlay
          poster={user ? `${ENDPOINT}/user/${10000000 + parseInt(userId, 10)}/profile/${user.image}` : null}
          style={{ maxHeight: 380, minHeight: 200, minWidth: 300, width: '100%', background: 'black' }}
        />
          </div>
        </div>
      </div>
    );
  }
}

export default MainScreen;
MainScreen.propTypes = {
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};
