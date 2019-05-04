import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';

class NewTask extends Component {
  state = {};

  onClick = () => {
    const { _class, updateClassValue, columnId } = this.props;
    const { tasks, columns } = _class;
    const taskId = Math.random().toString(36).substring(7);
    const newTasks = {
      ...tasks,
      [taskId]: { id: taskId, title: 'New Task just Assigned', description: 'Sample description', comments: [] },
    };
    const columnTasks = columns[columnId].taskIds;
    columnTasks.push(taskId);
    const newColumns = {
      ...columns,
      [columnId]: {
        ...columns[columnId],
        taskIds: columnTasks,
      },
    };
    updateClassValue('tasks', newTasks);
    updateClassValue('columns', newColumns);
  };

  render() {
    return (
      <div className="column-footer" role="button" tabIndex={0} onKeyDown={this.onClick} onClick={this.onClick}>
        + New Task
      </div>
    );
  }
}

NewTask.propTypes = {
  _class: PropTypes.objectOf(PropTypes.any).isRequired,
  updateClassValue: PropTypes.func.isRequired,
  columnId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps, { ...actions })(NewTask);
