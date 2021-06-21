/* eslint-disable import/prefer-default-export */
import React from 'react';
import { ENDPOINT } from '../../config';

export const JoinedMembers = ({ members, noOfMembers }) => {
  return (
    <div className="pc-joined-members">
      <div className="pc-joined-header">
        <h3 className="pc-joined-title">People hightlights</h3>
      </div>
      <div className="pc-hightlight-people">
        <div className="pc-hightlight-people-container">
          <div className="pc-hightlight-wrap">
            <p className="pc-joined-people-number">{`${noOfMembers} joined members`}</p>
            <ul className="pc-joined-list">
              {members && members.map(m => {
                const imageUrl = (m.userDetails.userDetail && m.userDetails.userDetail.image) ? `${ENDPOINT}/assets/user/1000000${m.userDetails.id}/profile/${m.userDetails.userDetail && m.userDetails.userDetail.image}` : '/assets//graphics/user.svg';
                return (
                  <li>
                    <img className="landscape" src={imageUrl} alt="Round representation" />
                    <p className="pc-hightlight-name">{m.userDetails.firstName}</p>
                  </li>
                );
              })}
              <li>
                <div className="pc-more-members">
                    <div className="pc-more-number">{`+${noOfMembers}`}</div>
                </div>
              </li>
            </ul>
            {/* <p className="pc-hightlight-name"> Bikal, Ram, Shyam, Gopal &amp; 22 others</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};
