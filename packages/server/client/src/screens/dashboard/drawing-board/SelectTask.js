import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/Button';
import { HTMLSelect, InputGroup } from '@blueprintjs/core';
import { FormSelectField } from '../../../common/Form/FormSelectField';
import { FormTextInput } from '../../../common/Form/FormTextInput';
const timeStampSort = (a, b) => (a.timeStamp < b.timeStamp ? 1 : -1);

class SelectTask extends React.Component {
  constructor(props) {
    super(props);
    const { database } = this.props;
    const classes = Object.values(database.Board.byId).filter(o => o.type === 'private').sort(timeStampSort).map(obj => ({ label: obj.name.substring(0, 50), value: obj.id }));
    this.state = {
      error: null,
      message: null,
      loading: false,
      name: '',
      classVal: classes[0].value,
      classeOptions: classes,
      taskOptions: [],
      taskVal: 0,
    };
  }

  async componentDidMount() {
    const { classVal } = this.state;
    const { getCardsApi } = this.props;
    const res = await getCardsApi({ boardId: classVal });
    const taskOptions = res.sort(timeStampSort).map(obj => ({ label: obj.name.substring(0, 50), value: obj.id }));
    this.setState({
      taskOptions,
      taskVal: taskOptions[0].value,
    });
  }

  onClassChange = async (e) => {
    const val = e.currentTarget.value;
    const { getCardsApi } = this.props;
    this.setState({ loading: true });
    try {
      const res = await getCardsApi({ boardId: parseInt(val, 10) });
      this.setState({
        classVal: parseInt(val, 10),
        taskOptions: res.sort(timeStampSort).map(obj => ({ label: obj.name.substring(0, 50), value: obj.id })),
        taskVal: res[0] && res[0].id,
        loading: false,
      });
    } catch (e) {
      this.setState({ loading: false, error: 'Error. Try again!' });
      console.log("Error");
    }
  }

  onTaskChange = (e) => {
    this.setState({
      taskVal: e.target.value,
    });
  }

  submitForm = async () => {
    const { callback } = this.props;
    const { taskVal, classVal, name } = this.state;
    this.setState({ loading: true });
    if (name.replace(/\s/g, '').length === 0) {
      this.setState({ loading: false, error: 'Name can not be null', message: null });
      return;
    }
    try {
      const res = await callback({ name, task: taskVal, class: classVal });
      if (res.response === 200) {
        this.setState({ loading: false, message: res.message, error: null });
      } else {
        this.setState({ loading: false, error: res.error, message: null });
      }
    } catch {
      this.setState({ loading: false, error: 'Error. Try again!', message: null });
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
            {/* <InputGroup
              placeholder="Name of attachment"
              onChange={e => this.setState({ name: e.target.value })}
              value={name}
              required
            /> */}
            <FormTextInput
              placeholder="Name of attachment"
              onChange={e => this.setState({ name: e.target.value })}
              value={name}
              className="pc-input-group"
              required
            />
          </div>
          <div style={{ padding: '10px 0px' }}>
            <p style={{ fontSize: '16px' }}>Class</p>
            {/* <HTMLSelect
              style={{ borderRadius: 0 }}
              options={classeOptions}
              onChange={this.onClassChange}
              value={classVal}
              fill
            /> */}
            <FormSelectField
              options={classeOptions}
              onChange={this.onClassChange}
              value={classVal}
            />
          </div>
          <div style={{ padding: '10px 0px', marginBottom: '10px' }}>
            <p style={{ fontSize: '16px' }}>Task</p>
            {/* <HTMLSelect
              style={{ borderRadius: 0 }}
              options={taskOptions}
              onChange={this.onTaskChange}
              value={taskVal}
              fill
            /> */}
            <FormSelectField
              options={taskOptions}
              onChange={this.onTaskChange}
              value={taskVal}
            />
          </div>
          <div className="btn-group">
            <Button
              state={{ error, message, loading }}
              onSubmit={this.submitForm}
              buttonStyle="btn--primary--solid"
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
