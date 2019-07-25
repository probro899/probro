import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Popover, Divider } from '@blueprintjs/core';
import Form from '../../Form';
import { addUserToBoard } from '../structure';
import UserList from './UserList';

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

class ToolBar extends React.Component {
  state = {};

  addUserToBoardHandler = async (data) => {
    const { api, boardId, account } = this.props;
    const obj = {
      ...data,
      joinStatus: true,
      userType: 'normal',
      fuserId: account.user.id,
      boardId,
      timeStamp: Date.now(),
    };
    await api.addBoardMember(obj);
    return { response: 200, message: 'Congratulations! You have added a new user' };
  }

  render() {
    const { boards, boardId, users, boardMembers } = this.props;
    return (
      <div className="tool-bar">
        <div className="toolbar-container">
          <div className="left-tools">
            <div className="class-name each-item">
              {
                boards.allIds.map((id) => {
                  if (id === boardId) {
                    return boards.byId[id].name;
                  }
                })
              }
            </div>
            <Divider />
            <UserList userList={users} boardId={boardId} boardMembers={boardMembers} />
          </div>
          <div className="right-tools">
            <Divider />
            <Popover
              content={<PopoverContent callback={this.addUserToBoardHandler} />}
              position="left-top"
            >
              <Button
                icon="plus"
                text="Add User"
                minimal
              />
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}
ToolBar.propTypes = {
  boards: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
  api: PropTypes.objectOf(PropTypes.any).isRequired,
  users: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  const { database, account } = state;
  return {
    boards: database.Board,
    users: database.User,
    boardMembers: database.BoardMember,
    account,
  };
};
export default connect(mapStateToProps)(ToolBar);
