import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import client from '../../socket';
import * as actions from '../../actions';
import { PopoverForm } from '../../components';
import TaskFormStructure from './structure';

class NewTask extends Component {
  state = {
    // if to open the popover to add the title to the new task.
    popOpen: false,
    api: {},
  };

  async componentWillMount() {
    const api = await client.scope('Mentee');
    this.setState({
      api,
    });
  }

  handlePopOverForm = () => {
    const { popOpen } = this.state;
    if (!popOpen) {
      TaskFormStructure.map((obj) => {
        if (obj.id === 'name') {
          obj.val = '';
        }
      });
    }
    this.setState({
      popOpen: !popOpen,
    });
  }

  addNewTask = async (data) => {
    const {
      columnId,
      account,
      boardId,
      database,
      addDatabaseSchema,
    } = this.props;
    const { api } = this.state;
    const pos = Object.keys(database.BoardColumnCard.byId).reduce((count, obj) => {
      if (database.BoardColumnCard.byId[obj].boardColumnId === columnId) {
        // eslint-disable-next-line no-param-reassign
        count += 16384;
      }
      return count;
    }, 16384);
    await api.addBoardColumnCard({
      userId: account.user.id,
      timeStamp: Date.now(),
      name: data.name,
      position: pos,
      boardColumnId: columnId,
      broadCastId: `Board-${boardId}`,
    });
    addDatabaseSchema('BoardColumnCard', {
      id: Date.now(),
      userId: account.user.id,
      timeStamp: Date.now(),
      name: data.name,
      position: pos,
      boardColumnId: columnId,
    });
    this.handlePopOverForm();
    return { response: 200 };
  };

  render() {
    const { popOpen } = this.state;
    return (
      <div>
        <PopoverForm
          isOpen={popOpen}
          onClose={this.handlePopOverForm}
          callback={this.addNewTask}
          structure={TaskFormStructure}
        />
        <div className="column-footer" role="button" tabIndex={0} onKeyDown={this.handlePopOverForm} onClick={this.handlePopOverForm}>
          + New Task
        </div>
      </div>
    );
  }
}

NewTask.propTypes = {
  columnId: PropTypes.number.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(NewTask);
