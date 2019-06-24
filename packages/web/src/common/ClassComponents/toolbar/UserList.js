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

const AllUsers = () => {
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
        <div
          style={{
            padding: '10px',
          }}
        >
          <span>Nabin Bhusal</span>
          <CallButton />
          <VideoCallButton />
        </div>
        <div
          style={{
            padding: '5px',
          }}
        >
          <span>Bhagya Sah</span>
          <CallButton />
          <VideoCallButton />
        </div>
      </div>
    </div>
  );
};

class UserList extends React.Component {
  state = {};

  render() {
    const { userList, boardMembers, boardId } = this.props;
    let creator;
    Object.values(boardMembers.byId).map((obj) => {
      if (!obj.boardId && obj.id === boardId) {
        creator = obj;
      }
    });
    return (
      <div className="each-item user-list">
        <Popover
          position="bottom"
          content={<UserDetail detail={creator && userList.byId[creator.userId]} />}
        >
          <div className="i-user">
            {creator && userList.byId[creator.userId].firstName[0].toUpperCase()}
            {creator && userList.byId[creator.userId].lastName[0].toUpperCase()}
            {creator && userList.byId[creator.userId].activeStatus && <span className="green-dot" />}
          </div>
        </Popover>
        {
          Object.values(boardMembers.byId).map((o) => {
            if (o.boardId === boardId) {
              return (
                <Popover
                  position="bottom"
                  content={<UserDetail detail={userList.byId[o.tuserId]} />}
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
          content={<AllUsers />}
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
};

export default UserList;
