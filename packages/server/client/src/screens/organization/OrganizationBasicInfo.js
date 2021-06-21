import React from 'react';
import ProfilePicture from './ProfilePicture';
import ConnectButtons from './ConnectButtons';
import InfoDetails from './InfoDetails';

export default (props) => {
  const { data } = props;
  return (
    <div className="pc-info-wrapper">
      <div className="pc-profile-body">
        <ProfilePicture {...data} />
        {data && <ConnectButtons data={data} {...props} />}
      </div>
      <InfoDetails {...data} />
    </div>
  );
};
