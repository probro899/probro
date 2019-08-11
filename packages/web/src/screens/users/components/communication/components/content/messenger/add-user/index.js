import React from 'react';
import { Dialog } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import addUserToBoard from './structure';
import Form from '../../../../../../../../common/Form';

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
  const { webRtc, updateWebRtc } = props;
  // console.log('props in add user', props);
  const addUserToBoardHandler = async (data) => {
    const { apis, boardId, account } = props;
    const obj = {
      ...data,
      joinStatus: true,
      userType: 'normal',
      fuserId: account.user.id,
      boardId: webRtc.showCommunication,
      timeStamp: Date.now(),
    };
    await apis.addBoardMember(obj);
    return { response: 200, message: 'Congratulations! You have added a new user' };
  };

  return (
    <div>
      <Dialog isOpen={webRtc.addUser} title="Add Board Member" onClose={() => updateWebRtc('addUser', false)}>
        <PopoverContent callback={addUserToBoardHandler} />
      </Dialog>
    </div>
  );
};
export default AddUser;
AddUser.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
};
