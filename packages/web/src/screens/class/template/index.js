import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TaskOverlay from './TaskOverlay';
import Column from './Column';
import ToolBar from './Toolbar';
import { Navbar } from '../../home/component';
import * as actions from '../../../actions';
import client from '../../../socket';
import posSorting, { timeStampSorting } from '../../../common/utility-functions';
import { Spinner } from '../../../common';

class Classes extends Component {
  state = {
    loading: true,
    api: {},
    classId: 0,
    columns: [],
    tasks: [],
    comments: [],
    attachments: [],
    descriptions: [],
    taskOverlayIsOpen: false,
    // the task id contained in the overlay
    taskIdInOverlay: 0,
  };

  componentDidMount() {
    const {
      match,
    } = this.props;
    client.scope('Mentee').then((result) => {
      // checking if the user's sessionid is real
      this.setState({
        api: result,
        classId: parseInt(match.params.classId, 10),
        loading: false,
      });
      // this is to ensure the props loaded in the component
      this.componentWillReceiveProps(this.props);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { tasks, columns, comments, attachments, descriptions, match } = nextProps;
    const wholeColumns = [];
    Object.values(columns.byId).map((obj) => {
      if (obj.boardId === Number(match.params.classId)) {
        const column = { ...obj };
        const task = [];
        Object.values(tasks.byId).map((ob) => {
          if (ob.boardColumnId === obj.id) {
            task.push(ob);
          }
        });
        task.sort(posSorting);
        column.tasks = task;
        wholeColumns.push(column);
      }
    });
    this.setState({ tasks: Object.values(tasks.byId), columns: wholeColumns.sort(posSorting), comments: Object.values(comments.byId).sort(timeStampSorting), attachments: Object.values(attachments.byId), descriptions: Object.values(descriptions.byId) });
  }

  // all the drag and drop will be handled here
  onDragEnd = async (result) => {
    // what to do when they swap the cards
  }

  toggleTaskOverlay = (id) => {
    const { taskOverlayIsOpen } = this.state;
    this.setState({ taskIdInOverlay: id, taskOverlayIsOpen: !taskOverlayIsOpen });
  }

  render() {
    const {
      classId,
      columns,
      tasks,
      api,
      taskIdInOverlay,
      taskOverlayIsOpen,
      comments,
      attachments,
      descriptions,
      loading,
    } = this.state;
    const {
      addDatabaseSchema, tags, account, updateDatabaseSchema,
      deleteDatabaseSchema,
    } = this.props;
    if (!account.sessionId) return <Redirect to="/" />;
    if (!account.user || loading) return <Spinner />;
    return (
      <div style={{ position: 'relative' }}>
        <Navbar className="pcm-nav" />
        <ToolBar classId={classId} apis={api} />
        <div
          className="class-wrapper"
          style={{ height: window.innerHeight }}
        >
          <div className="columns">
            {
              columns.filter(o => !o.deleteStatus).map((column, index) => {
                if (column.boardId === classId) {
                  return (
                    <Column
                      key={`column${column.id}`}
                      column={column}
                      columnId={column.id}
                      index={index}
                      api={api}
                      tags={tags}
                      boardId={classId}
                      addDatabaseSchema={addDatabaseSchema}
                      updateDatabaseSchema={updateDatabaseSchema}
                      deleteDatabaseSchema={deleteDatabaseSchema}
                      // passing it for the task overlay open
                      onTaskClick={this.toggleTaskOverlay}
                    />
                  );
                }
              })
            }
          </div>
        </div>
        <TaskOverlay
          apis={api}
          isOpen={taskOverlayIsOpen}
          taskId={taskIdInOverlay}
          tasks={tasks}
          onClose={this.toggleTaskOverlay}
          comments={comments}
          attachments={attachments}
          descriptions={descriptions}
          boardId={classId}
          tags={tags}
          addDatabaseSchema={addDatabaseSchema}
          updateDatabaseSchema={updateDatabaseSchema}
          deleteDatabaseSchema={deleteDatabaseSchema}
        />
      </div>
    );
  }
}

Classes.propTypes = {
  tasks: PropTypes.objectOf(PropTypes.any).isRequired,
  tags: PropTypes.objectOf(PropTypes.any).isRequired,
  columns: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  comments: PropTypes.objectOf(PropTypes.any).isRequired,
  descriptions: PropTypes.objectOf(PropTypes.any).isRequired,
  attachments: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { database, account } = state;
  return {
    account,
    columns: database.BoardColumn,
    tasks: database.BoardColumnCard,
    comments: database.BoardColumnCardComment,
    descriptions: database.BoardColumnCardDescription,
    attachments: database.BoardColumnCardAttachment,
    boardUsers: database.User,
    tags: database.BoardColumnCardTag,
  };
};

export default connect(mapStateToProps, { ...actions })(Classes);
