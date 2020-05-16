import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AiFillFileAdd } from 'react-icons/ai';
import * as actions from '../../../actions';
import { PopoverForm } from '../../../components';
import TaskFormStructure from './structure';

class NewTask extends Component {
  state = { popOpen: false };

  handlePopOverForm = () => {
    const { popOpen } = this.state;
    if (!popOpen) {
      TaskFormStructure.map((obj) => {
        if (obj.id === 'name') {
          obj.val = '';
        }
      });
    }
    this.setState({ popOpen: !popOpen });
  }

  addNewTask = async (data) => {
    const {
      columnId,
      account,
      boardId,
      database,
      addDatabaseSchema,
      api,
    } = this.props;
    const sortedCols = Object.values(database.BoardColumnCard.byId).filter(o => !o.deleteStatus && o.boardColumnId === columnId).sort(o => o.position);
    const pos = sortedCols[0].position + 16384;
    const res = await api.addBoardColumnCard({
      userId: account.user.id,
      timeStamp: Date.now(),
      name: data.name,
      position: pos,
      boardColumnId: columnId,
      broadCastId: `Board-${boardId}`,
    });
    // console.log('add new task response', res);
    if (res) {
      addDatabaseSchema('BoardColumnCard', {
        id: res,
        userId: account.user.id,
        timeStamp: Date.now(),
        name: data.name,
        position: pos,
        boardColumnId: columnId,
      });
      this.handlePopOverForm();
      return { response: 200 };
    }
    return { response: 404 };
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
          <AiFillFileAdd />
          New Task
        </div>
      </div>
    );
  }
}

NewTask.propTypes = {
  columnId: PropTypes.number.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  api: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(NewTask);
