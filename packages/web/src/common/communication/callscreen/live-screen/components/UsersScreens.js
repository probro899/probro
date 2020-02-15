/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import { ENDPOINT } from '../../../../../config';

const UserView = ({ pc, database, mute }) => {
  console.log('pc in USerView', pc);
  const user = Object.values(database.UserDetail.byId).find(u => u.userId === pc.user.id);
  return (
    pc.user ? (
      <div
        style={{
          width: 100,
          height: 100,
          background: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          border: 'solid',
          borderWidth: 2,
          borderColor: pc.online ? 'yellow' : 'green',
          borderRadius: 100,
          margin: 10,
          overflow: 'hidden',
        }}
      >
        <video
          muted={mute}
          id={`video-${pc.user.id}`}
          playsInline
          poster={user ? `${ENDPOINT}/user/${10000000 + parseInt(pc.user.id, 10)}/profile/${user.image}` : null}
          // controls
          autoPlay
          style={{ height: 90, width: 90, background: 'black', borderRadius: 20 }}
        />
        <div style={{ position: 'absolute', marginTop: 20, marginLeft: 20, width: 100, height: 100 }}>
          <div>
            <span style={{ color: 'yellow' }}>{ pc.online ? 'You' : `${pc.user.firstName}`}</span>
            <span style={{ color: 'red' }}>{ mute ? 'muted' : 'notmuted'}</span>
          </div>
          <div>
            <span style={{ color: 'yellow' }}>{pc.iceCandidateStatus}</span>
          </div>
        </div>
      </div>
    ) : null
  );
};

UserView.propTypes = {
  pc: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  mute: PropTypes.bool.isRequired,
};

const UsersView = (props) => {
  const { webRtc, account, database } = props;
  // console.log('Account', account);
  const { type, connectionId } = webRtc.localCallHistory.chatHistory;
  const muteId = type === 'user' ? webRtc.mainStreamId : database.Board.byId[connectionId].activeStatus;
  console.log('mute user', muteId);
  const peerConnection = Object.values(webRtc.peerConnections).filter(obj => obj.iceCandidateStatus !== 'disconnected');
  // console.log('all perconnection', peerConnection);
  const allOtherUser = peerConnection.map(pc => <UserView pc={pc} key={pc.user.id} database={database} mute={muteId === pc.user.id} />);
  const finalUserList = webRtc.localCallHistory.chatHistory.type === 'user' ? [<UserView pc={account} mute key={account.user.id} database={database} />] : [...allOtherUser, <UserView mute pc={account} key={account.user.id} database={database} />];
  return finalUserList;
};

class UsersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ display: 'flex', position: 'absolute', zIndex: 2, width: '96%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', height: '100%', width: '100%', overflow: 'auto' }}>
          <UsersView {...this.props} />
        </div>
      </div>
    );
  }
}

export default UsersScreen;
