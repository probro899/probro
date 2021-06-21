import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DateTime from 'react-datetime';

const DateField = (props) => {
    const { data, onChange, value } = props;

    return (
        <div style={{ display: data.hidden ? 'none' : 'block' }} className="date-field">
            <span className="label-text">{data.name}
                {data.required && <span style={{ color: 'red' }}> *</span>}
            </span>
            <DateTime
                inputProps={{ placeholder: 'Click to enter valid date' }}
                dateFormat="MMM DD, YYYY"
                value={value}
                onChange={(e) => onChange(data.id, e)}
                timeFormat={data.time || false}
            />
        </div>
    );
}

DateField.defaultProps = {
    value: '',
};

DateField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.instanceOf(moment.Moment),
    data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DateField;
