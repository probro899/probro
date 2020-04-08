/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
// import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { ENDPOINT } from '../../../../../config';
import store from '../../../../../store';

const UserView = ({ pc, database, mute, userId, status, account }) => {
  const userDetail = Object.values(database.UserDetail.byId).find(u => u.userId === userId);
  // console.log('Data in userView', database, userId);
  const user = database.User.byId[userId];
  // console.log('user', user);
  return (
    <div className="pc-each-screen">
      <video
        muted={mute}
        id={`video-${user.id}`}
        playsInline
        poster={userDetail ? `${ENDPOINT}/user/${10000000 + parseInt(userId, 10)}/profile/${userDetail.image}` : null}
        // controls
        autoPlay
      />
      <div className="pc-info">
        <div className="pc-short-name">
          <span>{user.id === account.user.id ? 'You' : `${user.firstName[0]}${user.lastName[0]}`}</span>
          {/* <span>{mute ? <IoMdMicOff /> : <IoMdMic />}</span> */}
        </div>
        <div className="pc-ice">
          { pc ? <span className="pc-ice-status">{status}</span> : null}
        </div>
      </div>
    </div>
  );
};

UserView.propTypes = {
  pc: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  mute: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
};

const UsersView = (props) => {
  const { account, database } = props;
  const { webRtc } = store.getState();
  // console.log('Account', account);
  const { type, connectionId } = webRtc.localCallHistory.chatHistory;
  const muteId = type === 'user' ? webRtc.mainStreamId : database.Board.byId[connectionId].activeStatus;
  // console.log('mute user', muteId);
  // const peerConnection = Object.values(webRtc.peerConnections).filter(obj => obj.iceCandidateStatus !== 'disconnected');
  // console.log('all perconnection', peerConnection);
  const allActiveUserIds = Object.keys(webRtc.connectedUsers).filter(uid => parseInt(uid, 10) !== account.user.id).filter(uid => webRtc.connectedUsers[uid].iceCandidateStatus !== 'disconnected');
  // console.log('All Connected ids', allActiveUserIds);
  const allActiveUserUis = allActiveUserIds.map(uid => (
    <UserView
      account={account}
      status={webRtc.connectedUsers[uid].iceCandidateStatus}
      userId={parseInt(uid, 10)}
      pc={webRtc.peerConnections[parseInt(uid, 10)]}
      database={database}
      mute={muteId === parseInt(uid, 10)}
    />
  ));
  // const allOtherUser = peerConnection.map(pc => <UserView pc={pc} key={pc.user.id} database={database} mute={muteId === pc.user.id} />);
  const finalUserList = webRtc.localCallHistory.chatHistory.type === 'user'
    ? [<UserView account={account} userId={account.user.id} pc={account} mute key={account.user.id} database={database} />]
    : [...allActiveUserUis, <UserView userId={account.user.id} mute account={account} pc={account} key={account.user.id} database={database} />];
  return finalUserList;
};

class UsersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(nextProps.webRtc.connectedUsers) !== JSON.stringify(this.props.webRtc.connectedUsers)) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    // console.log('User View DidUpdte called', this.props);
    const { webRtc } = this.props;
    const userIds = Object.keys(webRtc.connectedUsers);
    const allVideoElements = userIds.map(uid => document.getElementById(`video-${uid}`));
    // console.log('all Video Elements', allVideoElements, userIds);
    allVideoElements.forEach((ve, idx) => {
      if (ve) {
        webRtc.connectedUsers[userIds[idx]].streams.forEach((stream) => {
          if (stream.streams) {
            ve.srcObject = stream.streams[0];
          }
        });
      }
    });
  }

  render() {
    // console.log('Props in UserView', this.props);
    return (
      <div className="pc-user-screens">
        <UsersView {...this.props} />
      </div>
    );
  }
}

export default UsersScreen;
