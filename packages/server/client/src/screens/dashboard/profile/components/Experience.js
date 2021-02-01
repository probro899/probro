import React from 'react';
import { Icon } from '@blueprintjs/core';
import moment from 'moment';
import { PopoverForm } from '../../../../components';
import { experienceSchema } from '../structure';

const ExperienceInfo = ({ data, editPopover }) => {
  return (
    <div className="p-exp-list-i">
      <img src="/assets/icons/64w/office64.png" alt="school icon" />
      <p>
        <span className="p-title-i">{data.title}</span>
        <br />
        <span className="p-company-i">{data.company}</span>
        <br />
        <span className="p-timeline">{`${moment(data.startTime, 'DD/MM/YYYY').format("MMM DD, YYYY")} - ${data.endTime ? moment(data.endTime, 'DD/MM/YYYY').format("MMM DD, YYYY") : 'Currently working'}`}</span>
        <br />
        <span>{data.summary}</span>
      </p>
      <p><Icon style={{ cursor: 'pointer' }} icon="edit" onClick={() => editPopover(data)} /></p>
    </div>
  );
};

class Experience extends React.Component {
  state = {
    experienceEditPopover: false,
    editObj: null,
    current: false,
  };

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
          i['val'] = obj.endTime ? true : false;
          i['onChange'] = this.currentWorkToggle;
          return i;
        case 'summary':
          i['val'] = obj.summary;
          return i;
        case 'startTime':
          i['val'] = moment(obj.startTime, 'DD/MM/YYYY').format("MMM DD, YYYY");
          return i;
        case 'endTime':
          i['hidden'] = obj.endTime ? false: true;
          i['val'] = obj.endTime ? moment(obj.endTime, 'DD/MM/YYYY').format("MMM DD, YYYY") : null;
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
    const current = data.current;
    delete data.current;
    const info = {
      ...data,
      startTime: data.startTime.toLocaleString('en-IN').split(',')[0],
      endTime: current ? null : data.endTime.toLocaleString('en-IN').split(',')[0],
      userId: account.user.id,
    };
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
    this.setState({
      editObj: obj && obj.id ? obj : null,
      experienceEditPopover: !experienceEditPopover,
    });
  }

  currentWorkToggle = (val) => {
    this.setState({ current: val });
    experienceSchema.map(obj => {
      if (obj.id === 'endTime') {
        obj['val'] = null;
        obj['hidden'] = val;
      }
      if (obj.id === 'current') {
        obj['val'] = val;
      }
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
        <PopoverForm
          del={editObj}
          onDelete={this.onDelete}
          isOpen={experienceEditPopover}
          structure={experienceSchema}
          callback={this.addExperience}
          onClose={() => this.togglePopover()}
        />
        <h2 className="p-top">
          Experience
          <Icon
            icon="plus"
            onClick={() => {
              this.editPopover({
                startTime: new Date(),
                endTime: new Date(),
              });
            }}
            style={{ cursor: 'pointer' }}
          />
        </h2>
        <div className="p-exp-list">
          {experiences.length !== 0 ? (
            <div className="p-edu-list">
              {
                experiences.map(obj => <ExperienceInfo data={obj} editPopover={this.editPopover} key={obj.id} />)
              }
            </div>
          )
            : (
              <div>
                <span style={{ color: '#696969' }}>No Experience Added</span>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Experience;
