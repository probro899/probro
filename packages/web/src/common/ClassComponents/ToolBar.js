import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';

class ToolBar extends React.Component {
  state = {};

  render() {
    const { boards, boardId } = this.props;
    return (
      <div className="tool-bar">
        <div className="toolbar-container">
          <div className="left-tools">
            {
              boards.allIds.map((id) => {
                if (id === boardId) {
                  return <span>{boards.byId[id].name}</span>;
                }
              })
            }
          </div>
          <div className="right-tools">
            <Button
              icon="plus"
              text="Add User"
              minimal
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
};

const mapStateToProps = (state) => {
  const { database } = state;
  const boards = database.Board;
  return {
    boards,
  };
};
export default connect(mapStateToProps)(ToolBar);
