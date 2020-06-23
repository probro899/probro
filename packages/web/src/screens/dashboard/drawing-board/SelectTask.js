import React from 'react';
import PropTypes from 'prop-types';
import { HTMLSelect, Button, Spinner, InputGroup, Label } from '@blueprintjs/core';

const timeStampSort = (a, b) => (a.timeStamp < b.timeStamp ? 1 : -1);

class SelectTask extends React.Component {
  constructor(props) {
    super(props);
    const { database } = this.props;
    const classes = Object.values(database.Board.byId).filter(o => o.type === 'private');
    const tasks = Object.values(database.BoardColumnCard.byId).filter(obj => !obj.deleteStatus && Object.values(database.BoardColumn.byId).find(o => o.boardId === classes[0].id && o.id === obj.boardColumnId));
    this.state = {
      error: null,
      message: null,
      loading: false,
      name: '',
      classVal: classes[0].id,
      classeOptions: classes.sort(timeStampSort).map(obj => ({ label: obj.name.substring(0, 50), value: obj.id })),
      taskOptions: tasks.sort(timeStampSort).map(obj => ({ label: obj.name.substring(0, 50), value: obj.id })),
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
      taskOptions: tasks.sort(timeStampSort).map(obj => ({ label: obj.name.substring(0, 50), value: obj.id })),
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
    const { taskVal, classVal, name } = this.state;
    this.setState({
      loading: true,
    });
    if (name.replace(/\s/g, '').length === 0) {
      this.setState({
        loading: false,
        error: 'Name can not be null',
      });
      return;
    }
    const res = await callback({ name, task: taskVal, class: classVal });
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
      name,
      loading, message,
    } = this.state;
    return (
      <div style={{ padding: '10px', maxWidth: 300 }}>
        <div style={{ padding: '5px 0px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Select a Task</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px 0px' }}>
            <p style={{ fontSize: '16px' }}>
              Name
              <span style={{ color: 'red' }}> *</span>
            </p>
            <InputGroup
              placeholder="Name of attachment"
              onChange={e => this.setState({ name: e.target.value })}
              value={name}
              required
            />
          </div>
          <div style={{ padding: '10px 0px' }}>
            <p style={{ fontSize: '16px' }}>Class</p>
            <HTMLSelect
              style={{ borderRadius: 0 }}
              options={classeOptions}
              onChange={this.onClassChange}
              value={classVal}
              fill
            />
          </div>
          <div style={{ padding: '10px 0px', marginBottom: '10px' }}>
            <p style={{ fontSize: '16px' }}>Task</p>
            <HTMLSelect
              style={{ borderRadius: 0 }}
              options={taskOptions}
              onChange={this.onTaskChange}
              value={taskVal}
              fill
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
