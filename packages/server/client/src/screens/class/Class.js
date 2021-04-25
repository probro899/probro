import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { DeletePopOver } from '../../common';
import boardStructure from './ClassComponents/structure';
import client from '../../socket';
import { PopoverForm, MoreButton } from '../../components';
import { timeStampSorting, activitySorting, getName } from '../../common/utility-functions';
import { Button } from '../../common/utility-functions/Button/Button';
import { AiOutlinePlus, AiOutlineArrowRight } from "react-icons/ai";

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
    const { account, addDatabaseSchema, database } = this.props;
    const { api } = this.state;
    data.userId = account.user.id;
    data.timeStamp = Date.now();
    try {
      const res = await api.addBoard(data);
      let user = Object.values(database.User.byId).find(obj => obj.id === account.user.id);
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

  getRecentClassrooms = () => {
    const { database } = this.props;
    const privateBoards = Object.values(database.Board.byId).filter(o => o.type === 'private').sort(activitySorting);
    return privateBoards.slice(0, 3);
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
        <div className="class-m-wrapper">
          <div className="header">
            <div className="title-header">
              <span className="title">Classrooms </span>
              <small>Your classrooms</small>
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
            <div className="pc-classroom pc-recent-class">
              <h2 className="pc-activity">Recent Classrooms</h2>
              <ol>
                {this.getRecentClassrooms().map(obj => {
                  return (
                    <li className="pc-class-card">
                      <Link to={`/classroom/${account.user.slug}/${obj.id}`} className="content-link">
                        <div className="pc-card-content pc-latest-activity">
                          <div className="pc-latest-left">
                            <div className="pc-card-header">
                              <span>
                                <img src="/assets/graphics/classroom.svg" alt="classroom logo" />
                                <h3 className="pc-class-subhead">ClassRoom</h3>
                              </span>
                              <h4 className="pc-class-title">{obj.name}</h4>
                            </div>
                            <div className="pc-card-summary">
                              <span className="pc-author">{getName(obj.user.user)}</span>
                              <span className="pc-date">{new Date(obj.timeStamp).toDateString()}</span>
                            </div>
                          </div>
                          <div className="pc-latest-right">
                            <div className="pc-card-action">
                              <Button
                                // onClick={() => { }}
                                type="button"
                                buttonStyle="btn--primary--solid"
                                buttonSize="btn--medium"
                                title="Continue"
                                iconPosition="right"
                                icon={<AiOutlineArrowRight />}
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="pc-classroom">
              <h2 className="pc-activity">All Classrooms</h2>
              <ol>
                {
                 Object.values(database.Board.byId).filter(o => o.type === 'private').sort(timeStampSorting).map((obj, index) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <>
                        <li className="pc-class-card" key={index}>
                          <MoreButton onMore={this.onMore} id={obj.id} />
                          <Link to={`/classroom/${account.user.slug}/${obj.id}`} className="content-link">
                            <div className="pc-card-content">
                              <div className="pc-latest-left">
                                <div className="pc-card-header">
                                  <span>
                                    <img src="/assets/graphics/classroom.svg" alt="classroom logo" />
                                    <h3 className="pc-class-subhead">ClassRoom</h3>
                                  </span>
                                  <h4 className="pc-class-title">{obj.name}</h4>
                                </div>
                                <div className="pc-card-summary">
                                  <span className="pc-author">{getName(obj.user.user)}</span>
                                  <span className="pc-date">{new Date(obj.timeStamp).toDateString()}</span>
                                </div>
                              </div>
                              <div className="pc-latest-right">
                                <div className="pc-card-action">
                                  <span></span>
                                  <Button
                                    // onClick={() => { }}
                                    type="button"
                                    buttonStyle="btn--primary--outline"
                                    buttonSize="btn--medium"
                                    title="Classroom"
                                    iconPosition="right"
                                    icon={<AiOutlineArrowRight />}
                                  />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      </>
                    );
                  })
                }
              </ol>
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
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Class);
