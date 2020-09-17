import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import * as actions from '../../actions';
import { DeletePopOver } from '../../common';
import boardStructure from './ClassComponents/structure';
import client from '../../socket';
import { PopoverForm, MoreButton } from '../../components';
import ClassTemplate from './template/ClassTemplate';
import getName from '../../common/utility-functions/getName';

class Class extends Component {
  state = {
    // create holds bool for the add new class popover
    createBool: false,
    deleteClass: { id: 0, name: '', deletePopOverBool: false },
    updateClass: { id: 0, updateClassBool: false },
    api: {},
  };

  async componentDidMount() {
    const { updateNav } = this.props;
    const api = await client.scope('Mentee');
    this.setState({ api });
    updateNav({ schema: 'sideNav', data: { name: 'Classes' } });
  }

  // create new class from here
  createNewClass = async (arg) => {
    const data = arg;
    const { account, addDatabaseSchema } = this.props;
    const { api } = this.state;
    data.userId = account.user.id;
    data.timeStamp = Date.now();
    try {
      const res = await api.addBoard(data);
      addDatabaseSchema('Board', { ...data, type: 'private', id: res.boardId });
      addDatabaseSchema('BoardMember', { id: res.boardMemberId, boardId: res.boardId, tuserId: account.user.id, fuserId: account.user.id, joinStatus: 1, timeStamp: Date.now(), userType: 'creator' });
    } catch (e) {
      return { response: 404 };
    }
    this.newClass();
    return { response: 200 };
  }

  // toggle the create new class popover
  newClass = () => {
    const { createBool } = this.state;
    boardStructure.map((obj) => {
      if (obj.id === 'name') {
        obj.val = '';
      }
    });
    this.setState({
      createBool: !createBool,
    });
  }

  // this is more button handle function
  onMore = async (action, id) => {
    const { deleteClass, updateClass } = this.state;
    const { database } = this.props;
    if (action === 'delete') {
      this.setState({
        deleteClass: {
          id,
          name: database.Board.byId[id].name,
          deletePopOverBool: !deleteClass.deletePopOverBool,
        },
      });
    }
    if (action === 'edit') {
      boardStructure.map((obj) => {
        if (obj.id === 'name') {
          obj.val = database.Board.byId[id].name;
        }
      });
      this.setState({
        updateClass: {
          id,
          updateClassBool: !updateClass.updateClassBool,
        },
      });
    }
  }

  // handle delete of the boards
  deleteClass = async (type) => {
    const { deleteClass, api } = this.state;
    const { deleteDatabaseSchema } = this.props;
    if (type === 'confirm') {
      await api.deleteBoard({ id: deleteClass.id, broadCastId: `Board-${deleteClass.id}` });
      deleteDatabaseSchema('Board', { id: deleteClass.id });
    }
    this.setState({
      deleteClass: {
        id: 0,
        name: '',
        deletePopOverBool: !deleteClass.deletePopOverBool,
      },
    });
  }

  // handle the edit of the board name
  updateClass = async (data) => {
    const { updateClass, api } = this.state;
    const { updateDatabaseSchema } = this.props;
    await api.updateBoard([{ ...data, broadCastId: `Board-${updateClass.id}` }, { id: updateClass.id }]);
    updateDatabaseSchema('Board', { id: updateClass.id, ...data });
    this.setState({
      updateClass: {
        id: 0,
        updateClassBool: false,
      },
    });
    return { response: 200 };
  }

  // zoom out popover
  cancleUpdate = () => {
    const { updateClass } = this.state;
    this.setState({
      updateClass: {
        id: 0,
        updateClassBool: !updateClass.updateClassBool,
      },
    });
  }

  render() {
    const { account, database } = this.props;
    const { createBool, deleteClass, updateClass } = this.state;
    return (
      <div className="classes bro-right">
        <DeletePopOver
          isOpen={deleteClass.deletePopOverBool}
          action={this.deleteClass}
          name={deleteClass.name}
        />
        <div className="header">
          <span className="title">Classrooms </span>
          <small>Your classrooms</small>
        </div>
        <div className="content-list">
          {
            Object.values(database.Board.byId).filter(o => o.type === 'private').map((obj, index) => {
              const { user } = obj;
              const len = obj.name.length > 30;
              const name = len ? obj.name.substring(0, 29) : obj.name;
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div style={{ position: 'relative' }} key={index}>
                  {/* more button popover */}
                  <MoreButton onMore={this.onMore} id={obj.id} />
                  <Link to={`/class-work/${account.user.slug}/${obj.id}`} className="content-link">
                    <div className="class-repr">
                      <span>
                        {name}
                      </span>
                    </div>
                    <div className="class-detail">
                      <span className="name">
                        {getName(user.user)}
                      </span>
                      <span className="date">{new Date(obj.timeStamp).toDateString()}</span>
                    </div>
                  </Link>
                </div>
              );
            })
          }
          {/* this is add new board button down from here */}
          <div
            className="content-link add-new"
          >
            <Button
              intent="primary"
              icon="plus"
              onClick={this.newClass}
              text="Add New"
            />
          </div>
        </div>
        {/* create new class popover */}
        <ClassTemplate data={{ classes: Object.values(database.Board.byId).filter(obj => obj.type === 'template'), users: database.User.byId }} />
        <PopoverForm
          isOpen={createBool}
          onClose={this.newClass}
          callback={this.createNewClass}
          structure={boardStructure}
        />
        <PopoverForm
          isOpen={updateClass.updateClassBool}
          onClose={this.cancleUpdate}
          callback={this.updateClass}
          structure={boardStructure}
        />
      </div>
    );
  }
}

Class.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Class);
