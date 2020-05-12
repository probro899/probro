import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Button, Tooltip } from '@blueprintjs/core';
import { GoGraph } from 'react-icons/go';
import * as actions from '../../../../actions';
import UserList from './UserList';
import AddUser from './add-user';
import Report from '../../report';

class ToolBar extends React.Component {
  state = { showReport: null };

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

  generateReportHandler = () => {
    this.setState({ showReport: window.location.pathname });
  }

  reportCloseHandler = () => {
    this.setState({ showReport: null });
  }

  render() {
    const {
      boards,
      boardId,
      users,
      boardMembers,
      account,
      apis,
      database,
      UserDetail,
    } = this.props;
    const extUser = Object.values(UserDetail.byId).find(obj => obj.userId === account.user.id);
    const board = Object.values(boards.byId).find(obj => obj.id === boardId);
    const { showReport } = this.state;
    const classCreator = Object.values(boardMembers.byId).find(o => o.boardId === boardId && o.fuserId === o.tuserId);
    return (
      <div className="tool-bar">
        <Report isOpen={showReport} onClose={this.reportCloseHandler} boardId={boardId} {...this.props} boards={boards} apis={apis} users={users} />
        <div className="toolbar-container">
          <div className="left-tools">
            <div className="class-name each-item">
              {board.name}
            </div>
            <Divider />
            <UserList extUser={extUser} userList={users} boardId={boardId} boardMembers={boardMembers} apis={apis} account={account} />
          </div>
          <div className="right-tools">
            <Tooltip
              content={<span style={{ color: '#1d4354' }}>Chat</span>}
            >
              <Button
                minimal
                icon="chat"
                onClick={this.onChat}
              />
            </Tooltip>
            {extUser && (extUser.type === 'mentor' || extUser.userId === classCreator.fuserId) && (
              <Tooltip
                content={<span style={{ color: '#1d4354' }}>Add user to this class</span>}
              >
                <AddUser
                  apis={apis}
                  users={database.User.byId}
                  connections={Object.values(database.UserConnection.byId)}
                  account={account}
                  boardId={boardId}
                />
              </Tooltip>
            )}
            {
              extUser && extUser.type === 'mentor' && (
                <Tooltip
                  content={<span style={{ color: '#1d4354' }}>Generate Report</span>}
                >
                  <Button
                    minimal
                  >
                    <GoGraph size={20} onClick={this.generateReportHandler} />
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
    database,
  };
};
export default connect(mapStateToProps, { ...actions })(ToolBar);
