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

class Class extends Component {
  state = {
    // create holds bool for the add new class popover
    createBool: false,
    deleteClass: {
      id: 0,
      name: '',
      deletePopOverBool: false,
    },
    updateClass: {
      id: 0,
      updateClassBool: false,
    },
    api: {},
  };

  async componentDidMount() {
    const { updateNav } = this.props;
    const api = await client.scope('Mentee');
    this.setState({
      api,
    });
    updateNav({
      schema: 'sideNav',
      data: { name: 'Classes' },
    });
  }

  // create new class from here
  createNewBoard = async (arg) => {
    const data = arg;
    const { account, addDatabaseSchema } = this.props;
    const { api } = this.state;
    data.userId = account.user.id;
    data.timeStamp = Date.now();
    try {
      const res = await api.addBoard(data);
      addDatabaseSchema('Board', { ...data, id: res });
    } catch (e) {
      console.log('Error: ', e);
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
      await api.deleteBoard({ id: deleteClass.id });
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
    await api.updateBoard([data, { id: updateClass.id }]);
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
          <div>
            <span className="title">Classrooms </span>
            <small>Your class management</small>
          </div>
        </div>
        <div className="content-list">
          {
            database.Board.allIds.map((id, index) => {
              const len = database.Board.byId[id].name.length > 30;
              const name = len ? database.Board.byId[id].name.substring(0, 29) : database.Board.byId[id].name;
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div style={{ position: 'relative' }} key={index}>
                  {/* more button popover */}
                  <MoreButton onMore={this.onMore} id={id} />
                  <Link to={`/class-work/${account.slug}/${id}`} className="content-link">
                    <div className="class-repr">
                      <span>
                        {name}
                      </span>
                    </div>
                    <div className="class-detail">
                      <span className="name">Nabin Bhusal</span>
                      <span className="date">{new Date(database.Board.byId[id].timeStamp).toDateString()}</span>
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
        <PopoverForm
          isOpen={createBool}
          onClose={this.newClass}
          callback={this.createNewBoard}
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