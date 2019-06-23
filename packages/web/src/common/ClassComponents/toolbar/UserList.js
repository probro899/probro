import React from 'react';
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

const UserDetail = () => {
  return (
    <div
      style={{ padding: '10px 5px 5px 5px' }}
    >
      <div
        style={{ fontWeight: 600, padding: '2px' }}
      >
        Nabin Bhusal
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
    return (
      <div className="each-item user-list">
        <Popover
          position="bottom"
          content={<UserDetail />}
        >
          <div className="i-user">
            NB
            <span className="green-dot" />
          </div>
        </Popover>
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

export default UserList;
