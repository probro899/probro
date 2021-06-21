import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import client from '../../../socket';
import Header from './Header';
import AppointmentList from './AppointmentList';
import AppointmentStats from './AppointmentStats';
import appointmentStateManipulator from './helper-functions';

class Appointment extends Component {
    state = { apppointmentList: [], apis: {} };

    async componentDidMount() {
        const { updateNav } = this.props;
        updateNav({ schema: 'sideNav', data: { name: 'Appointment' } });
        const apis = await client.scope('Mentor');
        const res = await apis.getAppointments();
        this.setState({ apis, apppointmentList: res });
    }

    appointmentCrud = async (type, data) => {
        const { apppointmentList } = this.state;
        this.setState({
            apppointmentList: appointmentStateManipulator(type, apppointmentList, data),
        });
    }

    createAppointment = async (data) => {
        const { apis } = this.state;
        const { account, database, updateNav } = this.props;
        const res = await apis.addAppointment({ ...data, userId: account.user.id });
        if (res) {
            const newData = { ...data, id: res, userId: account.user.id, classDetail: database.Board.byId[data.classId] };
            this.appointmentCrud('create', { ...newData, });
            updateNav({ schema: 'popNotification', data: { active: true, message: 'You have created a new Appointment', intent: 'success' } });
            return true;
        }
    }

    getAppointmentStats = () => {
        const { apppointmentList } = this.state;
        let result = { total: 0, today: 0, upcoming: 0 };
        result.total = apppointmentList.length;
        const todayMidnight = moment().startOf('day').valueOf();
        const tomorrowMidnight = moment().add('days', 1).startOf('day').valueOf();
        apppointmentList.map(o => {
            if (o.startDate >= todayMidnight) {
                if (o.startDate < tomorrowMidnight) {
                    result.today += 1;
                } else {
                    result.upcoming += 1;
                }
            }
        })
        return result;
    }

    render() {
        const { database, updateNav } = this.props;
        const { apppointmentList, apis } = this.state;
        const classrooms = Object.values(database.Board.byId);
        const stats = this.getAppointmentStats();
        return (
            <div className="bro-right appointment">
                <div className="appointment-wrapper">
                    <Header
                        heading="Appointment"
                        subHeading="Make your appointment today"
                        buttonText="Create"
                        createAppointment={this.createAppointment}
                        classrooms={classrooms}
                    />
                    <div className="stats-wrapper">
                        <AppointmentStats title="Total Appointments" count={stats.total} />
                        <AppointmentStats title="Appointment Today" count={stats.today} />
                        <AppointmentStats title="Following Appointments" count={stats.upcoming} />
                    </div>
                    <AppointmentList
                        classrooms={classrooms}
                        apppointmentList={apppointmentList}
                        appointmentCrud={this.appointmentCrud}
                        apis={apis}
                        updateNav={updateNav}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Appointment);
