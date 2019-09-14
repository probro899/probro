import React from 'react';

const UserView = (pc, idx) => {
  console.log('pc in USerView', pc);
  return (
    pc.user ? (
      <div
        key={idx}
        style={{
          width: 200,
          height: 250,
          background: 'black',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'column',
          border: 'solid',
          borderWidth: 2,
          borderColor: 'green',
          borderRadius: 5,
          margin: 10,
        }}
      >
        <div style={{ width: '100%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* <img src={UserImage} alt=" user profile pic" style={{ width: 100, height: 100, borderRadius: '50%' }} /> */}
          {/* eslint-disable-next-line */}
          <video controls  id={`video-${pc.user.id}`} playsInline autoPlay style={{ height: '100%', width: '100%', background: 'black' }} />
        </div>
        <div>
          <div style={{ background: 'white', width: '100%', height: 'auto', padding: 5 }}>
            <span>{`${pc.user.firstName} ${pc.user.lastName}`}</span>
          </div>
          <div style={{ background: 'white', width: '100%', height: 'auto', paddingBottom: 5, paddingLeft: 5 }}>
            <span>{pc.iceCandidateStatus}</span>
          </div>
        </div>
      </div>
    ) : null
  );
};

const MenteeView = (props) => {
  const { webRtc } = props;
  const peerConnection = Object.values(webRtc.peerConnections);
  return peerConnection.map((pc, idx) => UserView(pc, idx));
};

class Index extends React.Component {
  state = {};

  render() {
    const { account, webRtc } = this.props;
    console.log('remote Stream', webRtc.remoteStream);
    return (
      <div style={{ width: '100%', height: window.innerHeight * 0.7 }}>
        <div style={{ width: '100%' }}>
          <div style={{ background: 'yellow', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <UserView {...account} />
          </div>
          <div style={{ background: 'red', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <MenteeView {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
export default Index;
