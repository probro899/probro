import React from 'react';
import { MdEdit } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import moment from 'moment';
import { PopoverForm } from '../../../../components';
import { educationSchema } from '../structure';
import Card from '../../../../common/Card';

const SchoolInfo = ({ data, editPopover }) => {
    return (
        <div className="pc-content-list">
            <img src="/assets/graphics/university.svg" alt="school icon" className="pc-content-list__image" />
            <div className="pc-list-details">
                <h3 className="pc-list-details__title">{data.degree}</h3>
                <p className="pc-list-details__company">{data.address}</p>
                <p className="pc-list-details__timeline">{`${moment(data.startTime, 'DD/MM/YYYY').format("MMM DD, YYYY")} - ${moment(data.endTime, 'DD/MM/YYYY').format("MMM DD, YYYY")}`}</p>
            </div>
            <span className="pc-content-list__edit"><MdEdit style={{ cursor: 'pointer' }} size={20} onClick={() => editPopover(data)} /></span>
        </div>
    );
};

class Education extends React.Component {
    state = { educationEditPopover: false, editObj: null };

    editPopover = (obj) => {
        educationSchema.map((i) => {
            switch (i.id) {
                case 'degree':
                    i['val'] = obj.degree;
                    return i;
                case 'address':
                    i['val'] = obj.address;
                    return i;
                case 'startTime':
                    i['val'] = moment(obj.startTime, 'DD/MM/YYYY');
                    return i;
                case 'endTime':
                    i['val'] = moment(obj.endTime, 'DD/MM/YYYY');
                    return i;
                default:
                    return i;
            }
        });
        this.togglePopover(obj);
    }

    addEducation = async (data) => {
        const { editObj } = this.state;
        const { apis, account, addDatabaseSchema, updateDatabaseSchema } = this.props;
        const info = {
            ...data,
            startTime: data.startTime.format("DD/MM/YYYY"),
            endTime: data.endTime.format("DD/MM/YYYY"),
            userId: account.user.id,
        };
        if (editObj) {
            await apis.updateUserEducation([{ ...info }, { id: editObj.id }]);
            updateDatabaseSchema('UserEducation', { ...info, id: editObj.id });
            return { response: 200, message: 'Successfully Edited!' };
        }
        const res = await apis.addUserEducation(info);
        addDatabaseSchema('UserEducation', { ...info, id: res });
        return { response: 200, message: 'Successfully Added!' };
    }

    togglePopover = (obj = null) => {
        const { educationEditPopover } = this.state;
        this.setState({
            editObj: obj && obj.id ? obj : null,
            educationEditPopover: !educationEditPopover,
        });
    }

    onDelete = async () => {
        const { editObj } = this.state;
        const { apis, deleteDatabaseSchema } = this.props;
        await apis.deleteUserEducation({ id: editObj.id });
        deleteDatabaseSchema('UserEducation', { id: editObj.id });
        this.togglePopover(editObj);
    }

    render() {
        const { educationEditPopover, editObj } = this.state;
        const { database, account } = this.props;
        const schools = Object.values(database.UserEducation.byId).filter(obj => obj && account.user.id === obj.userId);
        return (
            <div className="education">
                <Card>
                    <PopoverForm
                        del={editObj}
                        onDelete={this.onDelete}
                        isOpen={educationEditPopover}
                        structure={educationSchema}
                        callback={this.addEducation}
                        onClose={() => this.togglePopover()}
                    />
                    <div className="pc-content-header">
                        <h2 className="pc-content-header__title">
                        Education
                    </h2>
                        <span className="pc-content-header__icon">
                        <GrAdd
                            size={20}
                            onClick={() => this.editPopover({
                                startTime: new Date(),
                                endTime: new Date(),
                            })}
                        />
                        </span>
                    </div>
                    {schools.length !== 0 ? (
                        <div className="p-edu-list">
                            {
                                schools.map(obj => <SchoolInfo editPopover={this.editPopover} data={obj} key={obj.id} />)
                            }
                        </div>
                    )
                        : (
                            <div>
                                <span style={{ color: '#696969' }}>No School Added</span>
                            </div>
                        )
                    }
                </Card>
            </div>
        );
    }
}

export default Education;
