import React from 'react';
import { Link } from 'react-router-dom';
import { Popover, Position } from '@blueprintjs/core';
import { RoundPicture } from '../../../../components';

// const profileIcon = require('../../../../assets//graphics/user.svg');

export default ({ content, profilePic, navigate }) => {
  return (
    <Link to="#" className={`${navigate.mainNav.name === 'profileIcon' ? 'active' : null} navbar-profile`}>
      <Popover
        content={content}
        minimal
        position={Position.BOTTOM}
      >
        <div className="navbar-item pc-dashboard-icon no-right-margin">
          <div className="pc-dot" />
          {/* <div className="pc-dashboard">dashboard</div> */}
          <div className="profile-icon">
            <RoundPicture imgUrl={profilePic || '/assets//graphics/user.svg'} />
          </div>
        </div>
      </Popover>
    </Link>
  );
};
