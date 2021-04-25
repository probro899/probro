import React from 'react';
import PropTypes from 'prop-types';
import { FormSelectField } from '../../../common/Form/FormSelectField';
import ClipLoader from "react-spinners/ClipLoader";
import {Button} from '../../../common/utility-functions/Button/Button';

class SelectColumn extends React.Component {
  constructor(props) {
    super(props);
    const { database } = this.props;
    const classes = Object.values(database.Board.byId);
    const columns = [];
    Object.values(database.BoardColumn.byId).map((obj) => {
      if (obj.boardId === classes[0].id) {
        columns.push(obj);
      }
    });
    this.state = {
      error: null,
      message: null,
      loading: false,
      classVal: classes[0].id,
      classeOptions: classes.map(obj => ({ label: obj.name.substring(0, 50), value: obj.id })),
      colOptions: columns.map(obj => ({ label: obj.name.substring(0, 50), value: obj.id })),
      colVal: columns[0] && columns[0].id,
    };
  }

  onClassChange = (e) => {
    const { database } = this.props;
    const columns = [];
    Object.values(database.BoardColumn.byId).map((i) => {
      if (i.boardId === parseInt(e.target.value, 10)) {
        columns.push(i);
      }
    });
    this.setState({
      classVal: e.target.value,
      colOptions: columns.map(obj => ({ label: obj.name.substring(0, 50), value: obj.id })),
      colVal: columns[0] && columns[0].id,
    });
  }

  onTaskChange = (e) => {
    this.setState({
      colVal: e.target.value,
    });
  }

  submitForm = async () => {
    const { callback } = this.props;
    const { colVal, classVal } = this.state;
    this.setState({
      loading: true,
    });
    const res = await callback({ column: colVal, class: classVal });
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
      classeOptions, colOptions, colVal,
      classVal,
      error,
      loading, message,
    } = this.state;
    return (
      <div style={{ padding: '10px' }}>
        <div style={{ padding: '5px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Choose a Target Bucket</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px' }}>
            <p style={{ fontSize: '16px' }}>Class</p>
            <FormSelectField
              options={classeOptions}
              onChange={this.onClassChange}
              value={classVal}
            />
          </div>
          <div style={{ padding: '10px', marginBottom: '10px' }}>
            <p style={{ fontSize: '16px' }}>Bucket</p>
            <FormSelectField
              options={colOptions}
              onChange={this.onTaskChange}
              value={colVal}
            />
          </div>
          <div className="btn-group">
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              {loading && <ClipLoader size={40} /> }
              {error && <div style={{ fontSize: 16, color: 'red', marginBottom:'15px',marginTop:'0' }}>{error}</div>}
              {message && <div style={{ fontSize: 16, color: 'green',marginBottom:'15px',marginTop:'0' }}>{message}</div>}
            </div>
            <Button 
            onClick={this.submitForm}
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--medium"
            title="Submit"
            />
          </div>
        </div>
      </div>
    );
  }
}

SelectColumn.propTypes = {
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
};

export default SelectColumn;
