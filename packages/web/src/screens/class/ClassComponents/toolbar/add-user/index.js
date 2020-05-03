import React from 'react';
import { Popover } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { FaUserPlus } from 'react-icons/fa';
import addUserToBoard from './structure';
import { getName } from '../../../../../common/utility-functions';
import { Form } from '../../../../../common';

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
        obj.options = [{ label: '---', value: '' }, ...connections.map(o => ({ label: getName(users[userId === o.mId ? o.userId : o.mId]), value: userId === o.mId ? o.userId : o.mId }))];
      }
      return obj;
    });
  }

  addUserToBoardHandler = async (data) => {
    const { apis, boardId, account } = this.props;
    const obj = {
      userId: data.user,
      joinStatus: true,
      userType: 'normal',
      fuserId: account.user.id,
      boardId,
      timeStamp: Date.now(),
    };
    try {
      const res = await apis.addBoardMember(obj);
      // console.log(res);
      if (res.status === 200) {
        return { response: 200, message: 'Congratulations! You have added a new user' };
      }
      return { response: 201, error: res.message };
    } catch (e) {
      return { response: 400, error: 'Network Error' };
    }
  };

  render() {
    return (
      <Popover content={<PopoverContent callback={this.addUserToBoardHandler} />}>
        <div className="add-user-btn">
          <FaUserPlus size={20} />
        </div>
      </Popover>
    );
  }
};

AddUser.propTypes = {
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AddUser;
