/* eslint-disable import/prefer-default-export */
import React from 'react';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { Button } from '../../common/utility-functions/Button/Button';

export default ({ phoneNo, email }) => {
  return (
    <div className="pc-support-container">
      <div className="pc-suppoer-header">
        <h3 className="pc-support-header-title">Need Help?</h3>
      </div>
      <div className="pc-support-content">
        <Button
          onClick={() => { }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--small"
          title={phoneNo}
          icon={<AiOutlinePhone size={20} />}
        />
        <Button
          onClick={() => { }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--small"
          title={email}
          icon={<AiOutlineMail size={20} />}
        />
      </div>
    </div>
  );
};
