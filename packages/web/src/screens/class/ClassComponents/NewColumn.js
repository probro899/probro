import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdLibraryAdd } from 'react-icons/md';
import posSorting from '../../../common/utility-functions';
import * as actions from '../../../actions';
import { PopoverForm } from '../../../components';
import ColumnFormStructure from './structure';

class NewColumn extends Component {
  state = { popOpen: false };

  handlePopOverForm = () => {
    const { popOpen } = this.state;
    ColumnFormStructure.map((obj) => {
      if (obj.id === 'name') {
        obj.val = '';
      }
    });
    this.setState({
      popOpen: !popOpen,
    });
  }

  addNewColumn = async (data) => {
    const { classId, account, database, addDatabaseSchema, api } = this.props;
    const sortedCols = Object.values(database.BoardColumn.byId).filter(o => !o.deleteStatus && o.boardId === classId).sort(posSorting);
    const pos = sortedCols.length > 0 ? sortedCols[sortedCols.length - 1].position + 16384 : 16384;
    const res = await api.addBoardColumn({
      userId: account.user.id,
      timeStamp: Date.now(),
      name: data.name,
      position: pos,
      boardId: classId,
      broadCastId: `Board-${classId}`,
    });
    if (res) {
      addDatabaseSchema('BoardColumn', {
        id: res,
        userId: account.user.id,
        timeStamp: Date.now(),
        name: data.name,
        position: pos,
        boardId: classId,
      });
      this.handlePopOverForm();
      return { response: 200 };
    }
    return { response: 404 };
  };

  render() {
    const { popOpen } = this.state;
    return (
      <div className="add-new-column">
        <PopoverForm
          isOpen={popOpen}
          onClose={this.handlePopOverForm}
          callback={this.addNewColumn}
          structure={ColumnFormStructure}
        />
        <div role="button" tabIndex={0} onKeyDown={this.handlePopOverForm} className="title" onClick={this.handlePopOverForm}>
          <MdLibraryAdd />
          <span>New Column</span>
        </div>
      </div>
    );
  }
}

NewColumn.defaultProps = {
  classId: '',
};

NewColumn.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  classId: PropTypes.number,
  api: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(NewColumn);
