import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';

class NewColumn extends Component {
  state = {};

  onClick = () => {
    const { _class, updateClassValue } = this.props;
    const { columns, columnOrder } = _class;
    const colId = Math.random().toString(36).substring(7);
    const newColumns = {
      ...columns,
      [colId]: { id: colId, title: 'New Column', taskIds: [] },
    };
    columnOrder.push(colId);
    updateClassValue('columns', newColumns);
    updateClassValue('columnOrder', columnOrder);
  };

  render() {
    return (
      <div className="add-new-column">
        <div role="button" tabIndex={0} onKeyDown={this.onClick} className="title" onClick={this.onClick}>
          <span>+ New Column</span>
        </div>
      </div>
    );
  }
}

NewColumn.propTypes = {
  _class: PropTypes.objectOf(PropTypes.any).isRequired,
  updateClassValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps, { ...actions })(NewColumn);
