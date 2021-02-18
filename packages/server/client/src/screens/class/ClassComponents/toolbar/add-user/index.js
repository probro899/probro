import React from 'react';
import { Popover } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { FaUserPlus } from 'react-icons/fa';
import addUserToBoard from './structure';
import { getName } from '../../../../../common/utility-functions';
import { Form } from '../../../../../common';
import { Button } from '../../../../../common/utility-functions/Button/Button';

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

class AddUser extends React.Component {
  state = {};

  componentDidMount() {
    const { connections, users, account } = this.props;
    const userId = account.user.id;
    addUserToBoard.map((obj) => {
      if (obj.id === 'user') {
        obj.options = [{ label: '---', value: '' }, ...connections.map(o => ({ label: getName(o.user.user), value: userId === o.mId ? o.userId : o.mId }))];
      }
      return obj;
    });
  }

  addUserToBoardHandler = async (data) => {
    const { apis, boardId, account } = this.props;
    const obj = {
      userId: parseInt(data.user, 10),
      joinStatus: true,
      userType: 'normal',
      fuserId: account.user.id,
      boardId,
      timeStamp: Date.now(),
    };
    try {
      const res = await apis.addBoardMember(obj);
      if (res.status === 200) {
        return { response: 200, message: 'Congratulations! You have added a new user' };
      }
      return { response: 201, error: res.message };
    } catch (e) {
      console.error(e);
      return { response: 400, error: 'Network Error' };
    }
  };

  render() {
    return (
      <Popover minimal position="bottom" content={<PopoverContent callback={this.addUserToBoardHandler} />}>
        <Button
          type="button"
          buttonStyle="btn-circle"
          buttonSize="btn--small"
          icon={<FaUserPlus size={15} />}
        />
      </Popover>
    );
  }
}

AddUser.propTypes = {
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
  connections: PropTypes.arrayOf(PropTypes.any).isRequired,
  users: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AddUser;
