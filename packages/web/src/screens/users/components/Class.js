import React, { Component } from 'react';
import { Dialog } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from '../../../common';
import { createNewClass } from '../helper-functions';
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

class Class extends Component {
  state = {
    create: false,
    api: {},
  };

  async componentWillMount() {
    const api = await client.scope('Mentee');
    this.setState({
      api,
    });
  }

  handleSubmit = (data) => {
    const { api } = this.state;
    createNewClass(data, api.addBoard);
    return { response: 200 };
  }

  newClass = () => {
    const { create } = this.state;
    this.setState({
      create: !create,
    });
  }

  render() {
    const { account, database } = this.props;
    const { create } = this.state;
    console.log(database.Board);
    return (
      <div className="classes">
        <div className="header">
          Classes
        </div>
        <div className="content-list">
          {
            database.Board.allIds.map((id) => {
              return (
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
