import React, { Component } from 'react';
import { Dialog, Button, Menu, MenuItem, Popover } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, DeletePopOver } from '../../../common';
import boardStructure from '../../../common/ClassComponents/structure';
import client from '../../../socket';

const PopOver = ({isOpen, onClose, callback}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form data={boardStructure} callback={callback} />
    </Dialog>
  );
};

// more button popover here id holds the id of the board
const SmallMenu = (onclick, id) => {
  return (
    <Menu>
      <MenuItem
        icon="edit"
        text="Edit"
        onClick={() => onclick('edit', id)}
      />
      <Menu.Divider />
      <MenuItem
        icon="delete"
        intent="danger"
        text="Delete"
        onClick={() => onclick('delete', id)}
      />
    </Menu>
  );
};

class Class extends Component {
  state = {
    // create holds bool for the add new class popover
    createBool: false,
    classDelete: {
      id: '',
      name: '',
      deletePopOverBool: false,
    },
    api: {},
  };

  async componentWillMount() {
    const api = await client.scope('Mentee');
    this.setState({
      api,
    });
  }

  // create new class from here
  createNewBoard = async (arg) => {
    const data = arg;
    const { account } = this.props;
    const { api } = this.state;
    data.userId = account.user.id;
    data.timeStamp = Date.now();
    await api.addBoard(data);
    this.newClass();
    return { response: 200 };
  }

  // toggle the create new class popover
  newClass = () => {
    const { createBool } = this.state;
    this.setState({
      createBool: !createBool,
    });
  }

  // this is more button handle function
  onMore = async (action, id) => {
    const { classDelete } = this.state;
    const { database } = this.props;
    if (action === 'delete') {
      this.setState({
        classDelete: {
          id,
          name: database.Board.byId[id].name,
          deletePopOverBool: !classDelete.deletePopOverBool,
        },
      });
    }
    if (action === 'edit') {
      // const res = await api.updateBoard([{ name: 'Okey done' }, { id }]);
    }
  }

  // handle delete of the boards
  deleteClass = async (type) => {
    const { classDelete, api } = this.state;
    if (type === 'confirm') {
      await api.deleteBoard({ id: classDelete.id });
    }
    this.setState({
      classDelete: {
        id: '',
        name: '',
        deletePopOverBool: !classDelete.deletePopOverBool,
      },
    });
  }

  render() {
    const { account, database } = this.props;
    const { createBool, classDelete } = this.state;
    return (
      <div className="classes">
        <DeletePopOver
          isOpen={classDelete.deletePopOverBool}
          action={this.deleteClass}
          name={classDelete.name}
        />
        <div className="header">
          Classes
        </div>
        <div className="content-list">
          {
            database.Board.allIds.map((id) => {
              return (
                <div style={{ position: 'relative' }}>
                  {/* more button popover */}
                  <Popover
                    content={SmallMenu(this.onMore, id)}
                    position="right"
                    className="more-button"
                  >
                    <Button icon="more" minimal />
                  </Popover>
                  <Link push to={`/class-work/${account.sessionId}/me`} className="content-link">
                    <div className="class-repr">
                      <span>{database.Board.byId[id].name}</span>
                    </div>
                    <div className="class-detail">
                      created-by:
                      {database.Board.byId[id].userId}
                      date:
                      {database.Board.byId[id].timeStamp}
                    </div>
                  </Link>
                </div>
              );
            })
          }
          {/* this is add new board button down from here */}
          <div
            className="content-link"
            onClick={this.newClass}
            onKeyDown={this.newClass}
            role="button"
            tabIndex={0}
          >
            <span>Create a New class</span>
          </div>
        </div>
        {/* create new class popover */}
        <PopOver isOpen={createBool} onClose={this.newClass} callback={this.createNewBoard} />
      </div>
    );
  }
}

Class.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Class);
