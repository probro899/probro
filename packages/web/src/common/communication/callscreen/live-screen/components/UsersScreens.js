/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import { ENDPOINT } from '../../../../../config';

const UserView = ({ pc, database }) => {
  // console.log('pc in USerView', pc);
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
          muted={pc.online}
          id={`video-${pc.user.id}`}
          playsInline
          poster={`${ENDPOINT}/user/${10000000 + parseInt(pc.user.id, 10)}/profile/${Object.values(database.UserDetail.byId).find(u => u.userId === pc.user.id).image}`}
          // controls
          autoPlay
          style={{ height: 90, width: 90, background: 'black', borderRadius: 20 }}
        />
        <div style={{ position: 'absolute', marginTop: 20, marginLeft: 20, width: 100, height: 100 }}>
          <div>
            <span style={{ color: 'yellow' }}>{ pc.online ? 'You' : `${pc.user.firstName}`}</span>
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
};

const UsersView = (props) => {
  const { webRtc, account, database } = props;
  // console.log('Account', account);
  const peerConnection = Object.values(webRtc.peerConnections).filter(obj => obj.iceCandidateStatus !== 'disconnected');
  // console.log('all perconnection', peerConnection);
  const allOtherUser = peerConnection.map(pc => <UserView pc={pc} key={pc.user.id} database={database} />);
  const finalUserList = webRtc.localCallHistory.chatHistory.type === 'user' ? [<UserView pc={account} key={account.user.id} database={database} />] : [...allOtherUser, <UserView pc={account} key={account.user.id} database={database} />];
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
