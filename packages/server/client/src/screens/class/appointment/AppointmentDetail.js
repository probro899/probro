import React from 'react';
import moment from 'moment';
import { BsAlarm } from 'react-icons/bs';
import { VscBellDot } from 'react-icons/vsc';

const AppointmentDetail = ({ appointment }) => {
    const date = moment(appointment.startDate).format("DD MMM YYYY");
    const time = moment(appointment.startDate).format("hh:mm A");
    return (
        <div className="appointment-summary">
            <span className="appointment-summary__date">
                <VscBellDot size={15} /> {date}
            </span>
            <span className="appointment-summary__time">
                <BsAlarm size={15} /> {time}
            </span>
        </div>
    )
}

export default AppointmentDetail;
