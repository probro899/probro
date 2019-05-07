import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Task extends Component {
  state = {};

  onClick = () => {
    const { _class, updateClassValue, task } = this.props;
    const { tasks } = _class;
    updateClassValue(
      'overLayContent',
      {
        isOpen: true,
        taskId: tasks[task.id].id,
        taskTitle: tasks[task.id].title,
        taskDescription: tasks[task.id].description,
        comments: tasks[task.id].comments,
      }
    );
  };

  render() {
    const { task, index } = this.props;
    return (
      <Draggable
        draggableId={task.id}
        index={index}
      >
        {provided => (
          <div
            className="task-container"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={this.onClick}
            onKeyDown={this.onClick}
            role="menuitem"
            tabIndex={0}
          >
            {task.title}
          </div>
        )}
      </Draggable>
    );
  }
}

Task.propTypes = {
  _class: PropTypes.objectOf(PropTypes.any).isRequired,
  updateClassValue: PropTypes.func.isRequired,
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps, { ...actions })(Task);
