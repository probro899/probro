import React from 'react';

const UserView = (pc, idx) => {
  // console.log('pc in USerView', pc);
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
        <div>
          <video controls  id={`video-${pc.user.id}`} playsInline autoPlay style={{ height: '100%', width: '100%', background: 'black' }} />
        </div>
        <div>
          <div>
            <span>{`${pc.user.firstName} ${pc.user.lastName}`}</span>
          </div>
          <div>
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

class MediaComponents extends React.Component {
  state = {};

  render() {
    const { account } = this.props;
    // console.log('remote Stream', webRtc.remoteStream);
    return (
      <div>
        <div>
          <div>
            <UserView {...account} />
          </div>
          <div>
            <MenteeView {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
export default MediaComponents;
