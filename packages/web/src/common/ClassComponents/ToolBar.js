import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Popover } from '@blueprintjs/core';
import Form from '../Form';
import { addUserToBoard } from './structure';

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
    const { api, boards, boardId } = this.props;
    const obj = {
      ...data,
      joinStatus: false,
      userType: 'normal',
      Bid: boardId,
      timeStamp: Date.now(),
    };
    boards.allIds.map((i) => {
      if (boardId === i) {
        obj.name = boards.byId[i].name;
      }
    });
    console.log(obj);
    const res = await api.addBoardMember(obj);
    console.log('error to be handled', res);
    return { response: 200, message: 'Congratulations! You have added a new user' };
  }

  render() {
    const { boards, boardId } = this.props;
    return (
      <div className="tool-bar">
        <div className="toolbar-container">
          <div className="left-tools">
            <span>
              {
                boards.allIds.map((id) => {
                  if (id === boardId) {
                    return boards.byId[id].name;
                  }
                })
              }
            </span>
          </div>
          <div className="right-tools">
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
  boardId: PropTypes.number.isRequired,
  api: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  const { database } = state;
  const boards = database.Board;
  return {
    boards,
  };
};
export default connect(mapStateToProps)(ToolBar);
