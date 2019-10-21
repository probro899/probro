import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Icon } from '@blueprintjs/core';

const CallButton = () => {
  return (
    <span
      style={{
        padding: '5px',
        borderRadius: '50%',
        background: '#0F9960',
      }}
    >
      <Icon icon="phone" iconSize={20} color="white" />
    </span>
  );
};

const VideoCallButton = () => {
  return (
    <span
      style={{
        padding: '5px',
        borderRadius: '50%',
        background: '#0F9960',
      }}
    >
      <Icon icon="mobile-video" iconSize={20} color="white" />
    </span>
  );
};

const UserDetail = (props) => {
  const { detail } = props;
  return (
    <div
      style={{ padding: '10px 5px 5px 5px' }}
    >
      <div
        style={{ fontWeight: 600, padding: '2px' }}
      >
        {`${detail.firstName} ${detail.lastName}`}
      </div>
      <div
        style={{ padding: '5px', display: 'flex', justifyContent: 'space-around' }}
      >
        <CallButton />
        <VideoCallButton />
      </div>
    </div>
  );
};

UserDetail.propTypes = {
  detail: PropTypes.objectOf(PropTypes.any).isRequired,
};

const AllUsers = ({ userList, boardMembers, boardId }) => {
  return (
    <div
      style={{
        padding: '10px 5px 5px 10px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{ fontWeight: 600, padding: '2px' }}
      >
        <u>Class Members</u>
      </div>
      <div
        style={{
          padding: '5px',
        }}
      >
        {
          Object.values(boardMembers.byId).map((o) => {
            if (o.boardId === boardId) {
              return (
                <div
                  style={{
                    padding: '10px',
                  }}
                >
                  <span>
                    {`${userList.byId[o.tuserId].firstName} ${userList.byId[o.tuserId].lastName}`}
                  </span>
                  <CallButton />
                  <VideoCallButton />
                </div>
              );
            }
          })
        }
      </div>
    </div>
  );
};

AllUsers.propTypes = {
  boardMembers: PropTypes.objectOf(PropTypes.any).isRequired,
  userList: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
};

class UserList extends React.Component {
  state = {};

  render() {
    const { userList, boardMembers, boardId } = this.props;
    return (
      <div className="each-item user-list">
        {
          Object.values(boardMembers.byId).map((o, index) => {
            if (o.boardId === boardId) {
              return (
                <Popover
                  position="bottom"
                  content={<UserDetail detail={userList.byId[o.tuserId]} />}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                >
                  <div className="i-user">
                    {userList.byId[o.tuserId].firstName[0].toUpperCase()}
                    {userList.byId[o.tuserId].lastName[0].toUpperCase()}
                    {userList.byId[o.tuserId].activeStatus && <span className="green-dot" />}
                  </div>
                </Popover>
              );
            }
          })
        }
        <Popover
          position="right-top"
          content={
            (
              <AllUsers
                userList={userList}
                boardMembers={boardMembers}
                boardId={boardId}
              />
          )
        }
        >
          <div className="i-user">
            ...
          </div>
        </Popover>
      </div>
    );
  }
}

UserList.propTypes = {
  boardMembers: PropTypes.objectOf(PropTypes.any).isRequired,
  userList: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
};

export default UserList;
