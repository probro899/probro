import React from 'react';
import { Link } from 'react-router-dom';
import { RoundPicture } from '../../../../components';
import Popover from '../../../../common/Popover';

export default ({ content, profilePic, navigate }) => {
  const imgUrl = profilePic ? profilePic : '/assets/graphics/user.svg';
  return (
    <Link to="#" className={`${navigate.mainNav.name === 'profileIcon' ? 'active' : null} navbar-profile`}>
      <Popover
        content={content}
        xAlign="right"
        yAlign="bottom"
        vPosition="bottom"
        hPosition="left"
      >
        <div className="navbar-item pc-dashboard-icon no-right-margin">
          <div className="pc-dot" />
          <div className="profile-icon">
            <RoundPicture profilePic={profilePic} imgUrl={imgUrl} />
          </div>
        </div>
      </Popover>
    </Link>
  );
};
