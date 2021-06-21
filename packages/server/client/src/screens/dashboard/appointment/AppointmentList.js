import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import moment from 'moment';
import NoRecordFound from '../../../common/NoRecordFound';
import Pagination from '../../../common/Pagination';
import { sortAppointmentDes } from '../../../common/utility-functions/sortAppointments';
import { DeletePopOver } from '../../../common';
import Popup from '../../../common/Form/Popup';
import AddAppointments from './AddAppointments';

class AppointmentList extends React.Component {
    state = { deleteObj: null, editObj: null };

    toggleEdit = (obj = null) => {
        this.setState({ editObj: obj });
    }

    updateAppointment = async (data) => {
        const { editObj } = this.state;
        const { appointmentCrud, apis, updateNav, classrooms } = this.props;
        const res = await apis.updateAppointment([data, { id: editObj.id }]);
        if (res) appointmentCrud('update', [{ ...data, classDetail: classrooms.find(o => o.id === parseInt(data.classId, 10)) }, { id: editObj.id }]);
        updateNav({ schema: 'popNotification', data: { active: true, message: 'Update Successful', intent: 'success' } });
        this.toggleEdit();
    }

    deleteHandler = async (type) => {
        const { appointmentCrud, apis } = this.props;
        if (type === 'confirm') {
            const { deleteObj } = this.state;
            const res = await apis.deleteAppointment({ id: deleteObj.id });
            if (res) appointmentCrud('delete', deleteObj);
        }
        this.setState({ deleteObj: null });
    }

    checkAppointment = (appointment) => {
        let color = 'grey';
        const todayMidnight = moment().startOf('day').valueOf();
        const tomorrowMidnight = moment().add('days', 1).startOf('day').valueOf();
        if (appointment.startDate >= todayMidnight) {
            if (appointment.startDate < tomorrowMidnight) {
                color = 'green';
            } else {
                color = 'blue';
            }
        }
        return color;
    }

    render() {
        const { editObj, deleteObj } = this.state;
        const { apppointmentList, classrooms } = this.props;

        return (
            <div className="appointment-table-wrapper">
                <div className="appointment-list">
                    <table className="pc-table appointment-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Starts At</th>
                                <th>Ends At</th>
                                <th>Classroom</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                apppointmentList.length > 0 ? apppointmentList.sort(sortAppointmentDes).map((data, idx) => (
                                    <tr key={`appointment-${idx}`}>
                                        <td>{data.title}</td>
                                        <td>{moment(data.startDate).format("DD MMM YYYY hh:mm A")}</td>
                                        <td>{data.endDate ? moment(data.endDate).format("DD MMM YYYY hh:mm A") : '---'}</td>
                                        <td>{data.classDetail.name}</td>
                                        <td >
                                            <div className={`status ${this.checkAppointment(data)}`}></div>
                                        </td>
                                        <td>
                                            <div className="action-icons">
                                                <span className="edit-icon">
                                                    <FaEdit onClick={() => this.setState({ editObj: data })} size={20} />
                                                </span>
                                                <span className="delete-icon">
                                                    <AiFillDelete onClick={() => this.setState({ deleteObj: data })} size={20} />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )) : <tr>
                                    <td colSpan="6">
                                        <NoRecordFound />
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
                {
                    apppointmentList.length > 0 && (<div className="list-pagination">
                        <Pagination
                            pageCount={2}
                            page={1}
                            setPage={() => console.info('h')}
                        />
                    </div>)
                }
                <DeletePopOver
                    isOpen={deleteObj ? true : false}
                    action={this.deleteHandler}
                    name={deleteObj ? deleteObj.title : ''}
                />
                <Popup
                    isOpen={editObj ? true : false}
                    onClose={this.toggleEdit}
                    title="Update Appoinment"
                    icon={<FaRegCalendarCheck size={20} />}
                    width='650px'
                >
                    <AddAppointments instance={editObj} callback={this.updateAppointment} classrooms={classrooms} />
                </Popup>
            </div>
        )
    }
}

export default AppointmentList;
