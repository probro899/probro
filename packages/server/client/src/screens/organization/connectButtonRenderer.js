import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsFillPersonCheckFill, BsCheckAll } from 'react-icons/bs';
import { Button } from '../../common/utility-functions/Button/Button';

export default (joinStatus, actionHandler, isLogin) => {
  if (!isLogin) {
    return (
      <Link to="/login">
        <Button
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--small"
          title="Join"
          icon={<AiOutlinePlus size={20} />}
        />
      </Link>
    );
  }
  if (joinStatus) {
    switch (joinStatus.status) {
      case 'active':
        return (
          <Button
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--small"
            title="Member"
            disabled
            icon={<BsFillPersonCheckFill size={20} />}
          />
        );
      case 'request':
        return (
          <Button
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--small"
            title="Requested"
            disabled
            icon={<BsFillPersonCheckFill size={20} />}
          />
        );
      case 'invitation':
        return (
          <Button
            onClick={() => actionHandler('accept')}
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--small"
            title="Accept"
            icon={<BsCheckAll size={20} />}
          />
        );
      default:
        return null;
    }
  } else {
    return (
      <Button
        onClick={() => actionHandler('join')}
        type="button"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--small"
        title="Join"
        icon={<AiOutlinePlus size={20} />}
      />
    );
  }
};
