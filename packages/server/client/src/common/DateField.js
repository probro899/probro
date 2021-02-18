import React from 'react';
import PropTypes from 'prop-types';
import DateTime from 'react-datetime';


const DateField = (props) => {
  const { data, onChange, value } = props;

  const dateChange = (e) => {
    if (typeof e !== "string") {
      onChange(data.id, e.toDate());
    }
  }

  return (
    <div style={{ display: data.hidden ? 'none' : 'block' }} className="date-field">
      <span className="label-text">{data.name}</span>
      {data.required && <span style={{ color: 'red' }}> *</span>}
      <DateTime
        inputProps={{
          readOnly: true,
        }}
        dateFormat="MMM DD, YYYY"
        value={value}
        onChange={(e) => dateChange(e)}
        timeFormat={false}
      />
    </div>
  );
}
DateField.defaultProps = {
  value: new Date(),
};

DateField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DateField;
