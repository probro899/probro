import React from 'react';
import PropTypes from 'prop-types';
import { Label, Icon } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';

const calendarIcon = () => (
  <Icon
    icon="calendar"
    intent="primary"
  />
);

class DateField extends React.Component {
  state = {};

  render() {
    const { data, onChange, value } = this.props;
    return (
      <Label>
        <span className="label-text">{data.name}</span>
        {data.required && <span style={{ color: 'red' }}> *</span>}
        <DateInput
          formatDate={date => date.toLocaleDateString()}
          parseDate={str => new Date(str)}
          placeholder="M/D/YYYY"
          onChange={e => onChange(data.id, e)}
          value={value}
          popoverProps={{ usePortal: false }}
          rightElement={calendarIcon()}
          {...data}
        />
      </Label>
    );
  }
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