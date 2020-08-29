import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider } from '@blueprintjs/core';
import UserList from '../ClassComponents/toolbar/UserList';

class ToolBar extends React.Component {
  state = {};

  render() {
    const {
      boards,
      classId,
      users,
      boardMembers,
    } = this.props;
    const board = Object.values(boards.byId).find(obj => obj.id === classId);
    return (
      <div className="tool-bar">
        <div className="toolbar-container">
          <div className="left-tools">
            <div className="class-name each-item">
              {board.name}
            </div>
            <Divider />
            <UserList userList={users} boardId={classId} boardMembers={boardMembers} />
          </div>
          <div className="right-tools" />
        </div>
      </div>
    );
  }
}

ToolBar.propTypes = {
  boards: PropTypes.objectOf(PropTypes.any).isRequired,
  classId: PropTypes.number.isRequired,
  users: PropTypes.objectOf(PropTypes.any).isRequired,
  boardMembers: PropTypes.objectOf(PropTypes.any).isRequired,
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
export default connect(mapStateToProps)(ToolBar);
