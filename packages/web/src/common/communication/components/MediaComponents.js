import React from 'react';

const UserView = ({ pc }) => {
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
          borderRadius: 20,
          margin: 10,
        }}
      >
        <video
          muted={pc.online ? true : false}
          controls id={`video-${pc.user.id}`}
          playsInline autoPlay
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

const MentorView = () => {
  return (
    <div
      style={{
        width: '98%',
        height: '98%',
        background: 'black',
        minHeight: '90%',
        minWidth: '98%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        border: 'solid',
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 5,
        margin: 10,
      }}
    >
      <div>
        <video
          controls
          id={`video-mentor`}
          playsInline autoPlay
          style={{ height: '100%', width: '100%', background: 'black' }}
        />
      </div>
    </div>
  );
};

const UsersView = (props) => {
  const { webRtc, account } = props;
  // console.log('Account', account);
  const peerConnection = Object.values(webRtc.peerConnections);
  const allOtherUser = peerConnection.map(pc => <UserView pc={pc} key={pc.user.id} />);
  const finalUserList = [...allOtherUser, <UserView pc={account} key={account.user.id} />];
  return finalUserList;
};

class MediaComponents extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <div style={{ display: 'flex', position: 'absolute', zIndex: 12 }}>
          <UsersView {...this.props} />
        </div>
        <div style={{ height: '100%', width: '100%' }}>
          <MentorView {...this.props} />
        </div>
      </div>
    );
  }
}
export default MediaComponents;
