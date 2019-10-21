import React from 'react';
import { Icon } from '@blueprintjs/core';
import { PopoverForm } from '../../../../components';
import { experienceSchema } from '../structure';

const office = require('../../../../assets/icons/64w/office64.png');

const ExperienceInfo = ({ data }) => {
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
      <p><Icon icon="edit" /></p>
    </div>
  );
};

class Education extends React.Component {
  state = {};

  state = {
    experienceEditPopover: false,
  };

  editExperience = (data) => {
    console.log(data);
  }

  addExperience = async (data) => {
    const { apis, account } = this.props;
    await apis.addUserWorkExperience({
      ...data,
      startTime: data.startTime.toLocaleString('en-IN').split(',')[0],
      endTime: data.endTime.toLocaleString('en-IN').split(',')[0],
      userId: account.user.id,
    });
    return { response: 200, message: 'Done adding' };
  }

  togglePopover = () => {
    const { experienceEditPopover } = this.state;
    this.setState({
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
          <Icon icon="plus" onClick={this.togglePopover} />
        </p>
        <div className="p-exp-list">
          {experiences.length !== 0 ? (
            <div className="p-edu-list">
              {
                experiences.map(obj => <ExperienceInfo data={obj} key={obj.id} />)
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

export default Education;