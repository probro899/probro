import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Button, Tooltip } from '@blueprintjs/core';
import { GoGraph } from 'react-icons/go';
import * as actions from '../../../../actions';
import UserList from './UserList';
import AddUser from './add-user';

class ToolBar extends React.Component {
  state = {};

  toggleAddUser = () => {
    const { addUser } = this.state;
    this.setState({
      addUser: !addUser,
    });
  }

  onChat = () => {
    const {
      updateWebRtc,
      boardId,
    } = this.props;
    updateWebRtc('showCommunication', boardId);
    updateWebRtc('peerType', 'board');
    updateWebRtc('communicationContainer', 'history');
    updateWebRtc('chatHistory', { type: 'board', user: { user: null }, connectionId: boardId });
  }

  render() {
    const {
      boards,
      boardId,
      users,
      boardMembers,
      account,
      apis,
      UserDetail,
    } = this.props;
    const extUser = Object.values(UserDetail.byId).find(obj => obj.userId === account.user.id);
    const board = Object.values(boards.byId).find(obj => obj.id === boardId);
    return (
      <div className="tool-bar">
        <div className="toolbar-container">
          <div className="left-tools">
            <div className="class-name each-item">
              {board.name}
            </div>
            <Divider />
            <UserList userList={users} boardId={boardId} boardMembers={boardMembers} />
          </div>
          <div className="right-tools">
            <Button
              minimal
              icon="chat"
              onClick={this.onChat}
            />
            <AddUser
              apis={apis}
              account={account}
              boardId={boardId}
            />
            {
              extUser && extUser.type === 'mentor' && (
                <Tooltip
                  content={<span style={{ color: '#1d4354' }}>Generate Report</span>}
                >
                  <Button
                    minimal
                  >
                    <GoGraph size={20} />
                  </Button>
                </Tooltip>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

ToolBar.propTypes = {
  boards: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
  users: PropTypes.objectOf(PropTypes.any).isRequired,
  UserDetail: PropTypes.objectOf(PropTypes.any).isRequired,
  boardMembers: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  const { database, account } = state;
  return {
    boards: database.Board,
    UserDetail: database.UserDetail,
    users: database.User,
    boardMembers: database.BoardMember,
    account,
  };
};
export default connect(mapStateToProps, { ...actions })(ToolBar);
