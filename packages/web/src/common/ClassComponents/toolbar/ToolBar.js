import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Button } from '@blueprintjs/core';
import * as actions from '../../../actions';
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

  render() {
    const {
      boards,
      boardId,
      users,
      boardMembers,
      updateWebRtc,
      account,
      apis,
    } = this.props;

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
            <Button
              minimal
              icon="chat"
              onClick={() => updateWebRtc('showCommunication', boardId)}
            />
            <AddUser
              apis={apis}
              account={account}
              boardId={boardId}
            />
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
  boardMembers: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
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
export default connect(mapStateToProps, { ...actions })(ToolBar);
