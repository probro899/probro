import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import client from '../../socket';
import { PopoverForm } from '../../components';
import ColumnFormStructure from './structure';

class NewColumn extends Component {
  state = {
    // if to open the popover to add the title to the new column.
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
    const { classId, account, database, addDatabaseSchema } = this.props;
    const { api } = this.state;
    const pos = Object.keys(database.BoardColumn.byId).reduce((count, obj) => {
      if (database.BoardColumn.byId[obj].boardId === classId) {
        // eslint-disable-next-line no-param-reassign
        count += 16384;
      }
      return count;
    }, 16384);
    await api.addBoardColumn({
      userId: account.user.id,
      timeStamp: Date.now(),
      name: data.name,
      position: pos,
      boardId: classId,
      broadCastId: `Board-${classId}`,
    });
    addDatabaseSchema('BoardColumn', {
      id: Date.now(),
      userId: account.user.id,
      timeStamp: Date.now(),
      name: data.name,
      position: pos,
      boardId: classId,
      broadCastId: `Board-${classId}`,
    });
    this.handlePopOverForm();
    return { response: 200 };
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
          <span>+ New Column</span>
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
  addDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(NewColumn);
