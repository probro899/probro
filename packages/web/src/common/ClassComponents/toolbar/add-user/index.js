import React from 'react';
import { Popover, Button } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import addUserToBoard from './structure';
import Form from '../../../Form';

const PopoverContent = ({ callback }) => {
  return (
    <div style={{ padding: '5px', minWidth: '300px' }}>
      <Form data={addUserToBoard} callback={callback} />
    </div>
  );
};

PopoverContent.propTypes = {
  callback: PropTypes.func.isRequired,
};

const AddUser = (props) => {
  const addUserToBoardHandler = async (data) => {
    const { apis, boardId, account } = props;
    const obj = {
      ...data,
      joinStatus: true,
      userType: 'normal',
      fuserId: account.user.id,
      boardId,
      timeStamp: Date.now(),
    };
    await apis.addBoardMember(obj);
    return { response: 200, message: 'Congratulations! You have added a new user' };
  };

  return (
    <Popover content={<PopoverContent callback={addUserToBoardHandler} />}>
      <Button minimal text="Add user +" />
    </Popover>
  );
};

AddUser.propTypes = {
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AddUser;
