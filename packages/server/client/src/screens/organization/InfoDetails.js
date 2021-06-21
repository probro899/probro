import React from 'react'
import { BiCurrentLocation } from 'react-icons/bi';

export default (data) => {
 const { name, address } = data;
  return (
    <div className="pc-top-details">
      <div className="pc-desc">
        <div className="pc-name">{name}</div>
        <div className="pc-location"><BiCurrentLocation size={20} />
          <span className="pc-city">{address}</span>
        </div>
        <div className="pc-bio">
          {/* <p>Software development, surpassing your expectations</p> */}
        </div>
      </div>
    </div>
  );
};
