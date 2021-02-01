/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import { ENDPOINT } from '../../../../config';
import store from '../../../../store';

const UserView = ({ pc, database, mute, userId, status, account }) => {
  let user;
  let userDetail;

  if (userId === account.user.id) {
    user = account.user;
    userDetail = account.user.userDetails;
  } else {
    const boardMember = Object.values(database.BoardMember.byId).find(bm => bm.user.user.id === userId);
    user = boardMember.user.user;
    userDetail = boardMember.user.userDetail;
  }

  return (
    <div className="pc-each-screen">
      <video
        muted={mute}
        id={`video-${user.id}`}
        playsInline
        poster={userDetail ? `${ENDPOINT}/assets/user/${10000000 + parseInt(userId, 10)}/profile/${userDetail.image}` : null}
        // controls
        autoPlay
      />
      <div className="pc-info">
        <div className="pc-short-name">
          <span>{user.id === account.user.id ? 'You' : `${user.firstName[0]}${user.lastName[0]}`}</span>
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
  status: PropTypes.string.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

const UsersView = (props) => {
  const { account, database } = props;
  const { webRtc } = store.getState();

  const { type, connectionId } = webRtc.localCallHistory.chatHistory;
  const muteId = type === 'user' ? webRtc.mainStreamId : database.Board.byId[connectionId].activeStatus;

  const allActiveUserIds = Object.keys(webRtc.connectedUsers).filter(uid => parseInt(uid, 10) !== account.user.id).filter(uid => webRtc.connectedUsers[uid].iceCandidateStatus !== 'disconnected');

  const allActiveUserUis = allActiveUserIds.filter(uid => parseInt(uid, 10) !== parseInt(muteId, 10))
    .filter(uid => webRtc.connectedUsers[uid].streams.length > 0)
    .map(uid => (
      <UserView
        account={account}
        status={webRtc.connectedUsers[uid].iceCandidateStatus}
        userId={parseInt(uid, 10)}
        pc={webRtc.peerConnections[parseInt(uid, 10)]}
        database={database}
        mute={muteId === parseInt(uid, 10)}
      />
    ));

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
    const { webRtc } = this.props;
    if (JSON.stringify(nextProps.webRtc.connectedUsers) !== JSON.stringify(webRtc.connectedUsers)) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const { webRtc, account } = this.props;
    const userIds = Object.keys(webRtc.connectedUsers);
    const allVideoElements = userIds.map(uid => document.getElementById(`video-${uid}`));
    // console.log('userIds', userIds, webRtc.connectedUsers, allVideoElements);
    if (allVideoElements) {
      allVideoElements.forEach((ve, idx) => {
        if (ve) {
          webRtc.connectedUsers[userIds[idx]].streams.forEach((stream) => {
            if (stream) {
              // if (stream.streams) {
              //   ve.srcObject = stream;
              // }
              // if (parseInt(userIds[idx], 10) === account.user.id) {
              ve.srcObject = stream;
              // }
            }
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="pc-user-screens">
        <UsersView {...this.props} />
      </div>
    );
  }
}

export default UsersScreen;
UsersScreen.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};
