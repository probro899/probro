import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Icon } from '@blueprintjs/core';
import * as actions from '../../../actions';
import UserList from './UserList';

class ToolBar extends React.Component {
  state = {};

  render() {
    const { boards, boardId, users, boardMembers, updateWebRtc } = this.props;

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
            <Icon icon="people" color="white" iconSize={30} style={{ marginBottom: 5, marginRight: 10, cursor: 'pointer' }} onClick={() => updateWebRtc('showCommunication', boardId)} />
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
