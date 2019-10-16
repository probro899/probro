import React from 'react';
import PropTypes from 'prop-types';
import { HTMLSelect, Button, Spinner, Label } from '@blueprintjs/core';

class SelectTask extends React.Component {
  constructor(props) {
    super(props);
    const { database } = this.props;
    const classes = Object.values(database.Board.byId);
    const tasks = [];
    Object.values(database.BoardColumnCard.byId).map((obj) => {
      Object.values(database.BoardColumn.byId).map((i) => {
        if (i.boardId === classes[0].id && i.id === obj.boardColumnId) {
          tasks.push(obj);
        }
      });
    });
    this.state = {
      error: null,
      message: null,
      loading: false,
      classVal: classes[0].id,
      classeOptions: classes.map(obj => ({ label: obj.name.substring(0, 50), value: obj.id })),
      taskOptions: tasks.map(obj => ({ label: obj.name.substring(0, 50), value: obj.id })),
      taskVal: tasks[0] && tasks[0].id,
    };
  }

  onClassChange = (e) => {
    const { database } = this.props;
    const tasks = [];
    Object.values(database.BoardColumnCard.byId).map((obj) => {
      Object.values(database.BoardColumn.byId).map((i) => {
        if (i.boardId === parseInt(e.target.value, 10) && i.id === obj.boardColumnId) {
          tasks.push(obj);
        }
      });
    });
    this.setState({
      classVal: e.target.value,
      taskOptions: tasks.map(obj => ({ label: obj.name.substring(0, 50), value: obj.id })),
      taskVal: tasks[0] && tasks[0].id,
    });
  }

  onTaskChange = (e) => {
    this.setState({
      taskVal: e.target.value,
    });
  }

  submitForm = async () => {
    const { callback } = this.props;
    const { taskVal, classVal } = this.state;
    this.setState({
      loading: true,
    });
    const res = await callback({ task: taskVal, class: classVal });
    if (res.response === 200) {
      this.setState({
        loading: false,
        message: res.message,
      });
    } else {
      this.setState({
        loading: false,
        error: res.error,
      });
    }
  };

  render() {
    const {
      classeOptions, taskOptions, taskVal,
      classVal,
      error,
      loading, message,
    } = this.state;
    return (
      <div style={{ padding: '10px' }}>
        <div style={{ padding: '5px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Choose a Target Card</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px' }}>
            <p style={{ fontSize: '16px' }}>Class</p>
            <HTMLSelect
              options={classeOptions}
              onChange={this.onClassChange}
              value={classVal}
            />
          </div>
          <div style={{ padding: '10px', marginBottom: '10px' }}>
            <p style={{ fontSize: '16px' }}>Task</p>
            <HTMLSelect
              options={taskOptions}
              onChange={this.onTaskChange}
              value={taskVal}
            />
          </div>
          <div className="btn-group">
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              {loading && <Spinner intent="primary" size={40} /> }
              {error && <Label style={{ fontSize: 16, color: 'red' }}>{error}</Label>}
              {message && <Label style={{ fontSize: 16, color: 'green' }}>{message}</Label>}
            </div>
            <Button
              text="Submit"
              onClick={this.submitForm}
              intent="primary"
              large
              fill
            />
          </div>
        </div>
      </div>
    );
  }
}

SelectTask.propTypes = {
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
};

export default SelectTask;
