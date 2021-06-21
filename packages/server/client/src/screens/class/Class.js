import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import * as actions from '../../actions';
import { DeletePopOver } from '../../common';
import NotFound from '../../common/NotFound';
import getboardStructure from './ClassComponents/structure';
import client from '../../socket';
import { PopoverForm } from '../../components';
import { timeStampSorting, activitySorting } from '../../common/utility-functions';
import { Button } from '../../common/utility-functions/Button/Button';
import ClassroomListItem from './ClassComponents/ClassroomListItem';

class Class extends Component {
  state = {
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

  createNewClass = async (arg) => {
    const { account, addDatabaseSchema, User } = this.props;
    const { api } = this.state;
    const data = { ...arg, userId: account.user.id, timeStamp: Date.now() };
    try {
      const res = await api.addBoard(data);
      let user = Object.values(User.byId).find((obj) => obj.id === account.user.id);
      data.user = { user };
      data.lastActivity = Date.now();
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
    this.setState({ createBool: !createBool });
  }

  // this is more button handle function
  onMore = async (action, id) => {
    const { deleteClass, updateClass } = this.state;
    const { Board } = this.props;
    if (action === 'delete') this.setState({ deleteClass: { id, name: Board.byId[id].name, deletePopOverBool: !deleteClass.deletePopOverBool } });
    if (action === 'edit') this.setState({ updateClass: { id, updateClassBool: !updateClass.updateClassBool } });
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
      deleteClass: { id: 0, name: '', deletePopOverBool: !deleteClass.deletePopOverBool },
    });
  }

  // handle the edit of the board name
  updateClass = async (data) => {
    const { updateClass, api } = this.state;
    const { updateDatabaseSchema } = this.props;
    await api.updateBoard([{ ...data, broadCastId: `Board-${updateClass.id}` }, { id: updateClass.id }]);
    updateDatabaseSchema('Board', { id: updateClass.id, ...data });
    this.setState({ updateClass: { id: 0, updateClassBool: false } });
    return { response: 200 };
  }

  // zoom out popover
  cancleUpdate = () => {
    const { updateClass } = this.state;
    this.setState({ updateClass: { id: 0, updateClassBool: !updateClass.updateClassBool } });
  }

  getRecentClassrooms = () => {
    const { Board } = this.props;
    const privateBoards = Object.values(Board.byId).filter((o) => !o.cId && o.type === 'private').sort(activitySorting);
    return privateBoards.slice(0, 3);
  }

  render() {
    const { account, Board, Organization } = this.props;
    const { createBool, deleteClass, updateClass } = this.state;
    let classInstance = null;
    if (updateClass.updateClassBool) classInstance = Board.byId[updateClass.id];
    const boardStructure = getboardStructure(Object.values(Organization.byId), classInstance);
    const allClassrooms = Object.values(Board.byId).filter((o) => !o.cId && o.type === 'private').sort(timeStampSorting);
    const recentClassrooms = this.getRecentClassrooms();
    return (
      <div className="classes bro-right">
        <DeletePopOver
          isOpen={deleteClass.deletePopOverBool}
          action={this.deleteClass}
          name={deleteClass.name}
        />
        <div className="class-m-wrapper">
          <div className="header">
            <div className="title-header">
              <span className="title">Classrooms </span>
              <small>Manage your classrooms</small>
            </div>
            <div className="add-new-class">
              <Button
                onClick={this.newClass}
                type="button"
                buttonStyle="btn--primary--solid"
                buttonSize="btn--small"
                loading={false}
                disabled={false}
                title="Add new"
                icon={<AiOutlinePlus />}
              />
            </div>
          </div>
          <div className="content-list">
            {recentClassrooms.length > 0 && (
              <div className="pc-classroom pc-recent-class">
                <h2 className="pc-activity">Recent Classrooms</h2>
                <ol>
                  {recentClassrooms.map((obj) => <ClassroomListItem key={`rci-${obj.id}`} type="recent" obj={obj} account={account} />)}
                </ol>
              </div>
            )}
            <div className="pc-classroom">
              <h2 className="pc-activity">All Classrooms</h2>
              {
                allClassrooms.length > 0 && (
                  <ol>
                    {allClassrooms.map((obj) => <ClassroomListItem onMore={this.onMore} key={`ci-${obj.id}`} obj={obj} account={account} />)}
                  </ol>
                )
              }
              {
                allClassrooms.length < 1 && <NotFound message="You are not in any classrooms yet" />
              }
            </div>
          </div>
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
      </div>
    );
  }
}

Class.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = ({ database, account }) => {
  const { User, Board, Organization } = database;
  return { User, Board, Organization, account };
};
export default connect(mapStateToProps, { ...actions })(Class);
