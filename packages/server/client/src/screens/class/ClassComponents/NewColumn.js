import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import posSorting from '../../../common/utility-functions';
import * as actions from '../../../actions';
import { PopoverForm } from '../../../components';
import { columnSchema } from './structure';
import { AiOutlineAppstoreAdd } from "react-icons/ai";

class NewColumn extends Component {
    state = { popOpen: false };

    handlePopOverForm = () => {
        const { popOpen } = this.state;
        this.setState({ popOpen: !popOpen });
    }

  addNewColumn = async (data) => {
    const { classId, account, database, addDatabaseSchema, api } = this.props;
    const sortedCols = Object.values(database.BoardColumn.byId).filter(o => !o.deleteStatus && o.boardId === classId).sort(posSorting);
    const pos = sortedCols.length > 0 ? sortedCols[sortedCols.length - 1].position + 16384 : 16384;
    const obj = {
        ...data,
        userId: account.user.id,
        timeStamp: Date.now(),
        position: pos,
        boardId: classId,
        broadCastId: `Board-${classId}`,
    }
    const res = await api.addBoardColumn(obj);
    if (res) {
        addDatabaseSchema('BoardColumn', { ...obj, id: res });
        this.handlePopOverForm();
        return { response: 200 };
    }
    return { response: 404 };
  };

  render() {
    const { popOpen } = this.state;
    const colSchema = columnSchema();
    return (
      <div className="add-new-column">
        <PopoverForm
          isOpen={popOpen}
          onClose={this.handlePopOverForm}
          callback={this.addNewColumn}
          structure={colSchema}
        />
            <div role="button" tabIndex={0} onKeyDown={this.handlePopOverForm} className="title" onClick={this.handlePopOverForm}>
                <AiOutlineAppstoreAdd />
                <span>New Bucket</span>
            </div>
      </div>
    );
  }
}

NewColumn.defaultProps = {
    classId: null,
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
