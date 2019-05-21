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
    create: false,
    api: {},
    deletePopOver: false,
  };

  async componentWillMount() {
    const api = await client.scope('Mentee');
    this.setState({
      api,
    });
  }

  handleSubmit = async (arg) => {
    const data = arg;
    const { account } = this.props;
    const { api } = this.state;
    data.userId = account.user.id;
    data.timeStamp = Date.now();
    const res = await api.addBoard(data);
    return { response: 200 };
  }

  newClass = () => {
    const { create } = this.state;
    this.setState({
      create: !create,
    });
  }

  // this is more button handle function
  onMore = async (action, id) => {
    const { api } = this.state;
    if (action === 'delete') {
      const res = await api.deleteBoard({ id });
    }
    if (action === 'edit') {
      const res = await api.updateBoard([{ name: 'Okey done' }, { id }]);
    }
  }

  render() {
    const { account, database } = this.props;
    const { create } = this.state;
    console.log(database.Board, this.state);
    return (
      <div className="classes">
        <div className="header">
          Classes
        </div>
        <div className="content-list">
          {
            database.Board.allIds.map((id) => {
              return (
                <div style={{ position: 'relative' }}>
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
        <PopOver isOpen={create} onClose={this.newClass} callback={this.handleSubmit} />
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
