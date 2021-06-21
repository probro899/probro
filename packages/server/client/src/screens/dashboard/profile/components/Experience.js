import React from 'react';
import { MdEdit } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import moment from 'moment';
import { PopoverForm } from '../../../../components';
import { experienceSchema } from '../structure';
import ReadMoreReadLess from '../../../../common/ReadMoreReadLess';
import Card from '../../../../common/Card';

const ExperienceInfo = ({ data, editPopover }) => {
    return (
        <div className="pc-content-list">
            <img src="/assets/graphics/office.svg" alt="school icon" className="pc-content-list__image" />
            <div className="pc-list-details">
                <h3 className="pc-list-details__title">{data.title}</h3>
                <p className="pc-list-details__company">{data.company}</p>
                <p className="pc-list-details__timeline">{`${moment(data.startTime, 'DD/MM/YYYY').format("MMM DD, YYYY")} - ${data.currentWorking ? 'Currently working' : moment(data.endTime, 'DD/MM/YYYY').format("MMM DD, YYYY")}`}</p>
                <p className="pc-list-details__descriptions"><ReadMoreReadLess text={data.summary} /></p>
            </div>
            <span className="pc-content-list__edit"><MdEdit style={{ cursor: 'pointer' }} size={20} onClick={() => editPopover(data)} /></span>
        </div>
    );
};

class Experience extends React.Component {
    state = { experienceEditPopover: false, editObj: null, current: false };

    editPopover = (obj) => {
        experienceSchema.map((i) => {
            switch (i.id) {
                case 'title':
                    i['val'] = obj.title;
                    return i;
                case 'company':
                    i['val'] = obj.company;
                    return i;
                case 'current':
                    i['val'] = obj.currentWorking ? true : false;
                    i['onChange'] = this.currentWorkToggle;
                    return i;
                case 'summary':
                    i['val'] = obj.summary;
                    return i;
                case 'startTime':
                    i['val'] = moment(obj.startTime, 'DD/MM/YYYY');
                    return i;
                case 'endTime':
                    i['hidden'] = obj.currentWorking ? true : false;
                    i['val'] = obj.currentWorking ? null : moment(obj.endTime, 'DD/MM/YYYY');
                    return i;
                default:
                    return i;
            }
        });
        this.togglePopover(obj);
    }

    addExperience = async (data) => {
        const { apis, account, addDatabaseSchema, updateDatabaseSchema } = this.props;
        const { editObj } = this.state;
        if (!data.current && (!data.endTime || !data.endTime._isAMomentObject)) {
            return { response: 400, error: 'End Date can not be empty' };
        }
        const info = {
            ...data,
            startTime: data.startTime.format("DD/MM/YYYY"),
            endTime: data.current ? Date.now() : data.endTime.format("DD/MM/YYYY"),
            currentWorking: data.current,
            userId: account.user.id,
        };
        delete info.current;
        if (editObj) {
            await apis.updateUserWorkExperience([{ ...info }, { id: editObj.id }]);
            updateDatabaseSchema('UserWorkExperience', { ...info, id: editObj.id });
            return { response: 200, message: 'Successfully Edited!' };
        }
        const res = await apis.addUserWorkExperience(info);
        addDatabaseSchema('UserWorkExperience', { ...info, id: res });
        return { response: 200, message: 'Successfully Added!' };
    }

    togglePopover = (obj = null) => {
        const { experienceEditPopover } = this.state;
        this.setState({ editObj: obj && obj.id ? obj : null, experienceEditPopover: !experienceEditPopover });
    }

    currentWorkToggle = (val) => {
        this.setState({ current: val });
        experienceSchema.map(obj => {
            if (obj.id === 'endTime') {
                obj['val'] = null;
                obj['hidden'] = val;
            }
            if (obj.id === 'current') obj['val'] = val;
            return obj;
        });
    }

    onDelete = async () => {
        const { editObj } = this.state;
        const { apis, deleteDatabaseSchema } = this.props;
        await apis.deleteUserWorkExperience({ id: editObj.id });
        deleteDatabaseSchema('UserWorkExperience', { id: editObj.id });
        this.togglePopover(editObj);
    }

    render() {
        const { experienceEditPopover, editObj } = this.state;
        const { database, account } = this.props;
        const experiences = Object.values(database.UserWorkExperience.byId).filter(obj => obj && account.user.id === obj.userId);
        return (
            <div className="experience">
                <Card>
                    <PopoverForm
                        del={editObj}
                        onDelete={this.onDelete}
                        isOpen={experienceEditPopover}
                        structure={experienceSchema}
                        callback={this.addExperience}
                        onClose={() => this.togglePopover()}
                    />
                    <div className="pc-content-header">
                        <h2 className="pc-content-header__title">
                            Experience
                    </h2>
                        <span className="pc-content-header__icon">
                            <GrAdd
                                size={20}
                                onClick={() => this.editPopover({ startTime: new Date(), endTime: new Date() })}
                            />
                        </span>
                    </div>

                    <div className="p-exp-list">
                        {experiences.length !== 0 ? (
                            <div className="p-edu-list">
                                {
                                    experiences.map(obj => <ExperienceInfo data={obj} editPopover={this.editPopover} key={obj.id} />)
                                }
                            </div>
                        ) : <div><span style={{ color: '#696969' }}>No Experience Added</span></div>
                        }
                    </div>
                </Card>
            </div>
        );
    }
}

export default Experience;
