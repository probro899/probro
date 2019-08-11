import React from 'react';
import PropTypes from 'prop-types';

const userDesingHelper = (user) => {
  return (
    <div style={{ display: 'flex', margin: 5 }}>
      <div style={{ borderRadius: '50%', background: '#f5f5f5', height: 40, width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold'}}>{`${user.firstName[0]}${user.lastName[0]}`.toUpperCase()}</span>
        {user.activeStatus && <div style={{ width: 10, height: 10, background: '#00FF6F', borderRadius: '50%', marginTop: 10, marginLeft: 18, textAlign: 'end', position: 'absolute' }} /> }
      </div>
      <div style={{ marginTop: 10, marginLeft: 5 }}>
        <span>{`${user.firstName} ${user.lastName}`}</span>
      </div>
    </div>
  );
};

const UserList = (props) => {
  const { webRtc, database } = props;
  const boardmembers = Object.values(database.BoardMember.byId).filter(bm => bm.boardId === webRtc.showCommunication);
  const userList = boardmembers.map(bm => database.User.byId[bm.tuserId]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {userList.map(u => userDesingHelper(u))}
    </div>
  );
};

export default UserList;
UserList.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};
