import React from 'react';
import { Icon } from '@blueprintjs/core';
import moment from 'moment';
import { PopoverForm } from '../../../../components';
import { experienceSchema } from '../structure';

const office = require('../../../../assets/icons/64w/office64.png');

const ExperienceInfo = ({ data, editPopover }) => {
  return (
    <div className="p-exp-list-i">
      <img src={office} alt="school icon" />
      <p>
        <span className="p-title-i">{data.title}</span>
        <br />
        <span className="p-company-i">{data.company}</span>
        <br />
        <span className="p-timeline">{`${data.startTime} - ${data.endTime}`}</span>
        <br />
        <span>{data.summary}</span>
      </p>
      <p><Icon icon="edit" onClick={() => editPopover(data)} /></p>
    </div>
  );
};

class Experience extends React.Component {
  state = {
    experienceEditPopover: false,
    editObj: null,
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
        case 'summary':
          i['val'] = obj.summary;
          return i;
        case 'startTime':
          i['val'] = new Date(moment(obj.startTime, 'DD/MM/YYYY').valueOf());
          return i;
        case 'endTime':
          i['val'] = new Date(moment(obj.endTime, 'DD/MM/YYYY').valueOf());
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
    const info = {
      ...data,
      startTime: data.startTime.toLocaleString('en-IN').split(',')[0],
      endTime: data.endTime.toLocaleString('en-IN').split(',')[0],
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

  render() {
    const { experienceEditPopover } = this.state;
    const { database, account } = this.props;
    const experiences = [];
    Object.values(database.UserWorkExperience.byId).map((obj) => {
      if (account.user.id === obj.userId) {
        experiences.push(obj);
      }
    });
    return (
      <div className="experience">
        <PopoverForm
          isOpen={experienceEditPopover}
          structure={experienceSchema}
          callback={this.addExperience}
          onClose={() => this.togglePopover()}
        />
        <p className="p-top">
          <span>Experience</span>
          <Icon
            icon="plus"
            onClick={() => this.editPopover({
              startTime: '02/02/2018',
              endTime: '02/02/2018',
            })}
          />
        </p>
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
