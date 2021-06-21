import React from 'react';
import { ENDPOINT } from '../../config';

export default ({ image, uId, name }) => {
  const imageUrl = image ? `${ENDPOINT}/assets/user/1000000${uId}/organization/${image}` : '/assets/graphics/organization.svg';
  return (
    <div className="pc-profilePic">
      <img className="landscape" src={imageUrl} alt={name} />
    </div>
  );
};
