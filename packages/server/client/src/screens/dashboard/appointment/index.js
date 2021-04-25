import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Header from '../components/Header';
import AddAppointments from './AddAppointments';
import AppointmentList from './AppointmentList';
import AppointmentStats from './AppointmentStats';

class Appointment extends Component {
    state = {};

    async componentDidMount() {
        const { updateNav } = this.props;
        updateNav({
            schema: 'sideNav',
            data: { name: 'Appointment' },
        });
    }
    render() {
        return (
            <div className="bro-right appointment">
                <div className="appointment-wrapper">
                    <Header heading="Appointment" subHeading="Make your appointment today" buttonText="Create" popupContent={<AddAppointments />} />
                    <div className="stats-wrapper">
                        <AppointmentStats />
                        <AppointmentStats />
                        <AppointmentStats />
                    </div>
                    <AppointmentList />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Appointment);
