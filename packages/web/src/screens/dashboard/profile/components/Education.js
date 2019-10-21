import React from 'react';
import { Icon } from '@blueprintjs/core';
import { PopoverForm } from '../../../../components';
import { educationSchema } from '../structure';

const school = require('../../../../assets/icons/64w/school64.png');

const SchoolInfo = ({ data }) => {
  return (
    <div className="p-edu-list-i">
      <img src={school} alt="school icon" />
      <p>
        <span className="p-name-i">{data.degree}</span>
        <br />
        <span>{data.address}</span>
        <br />
        <span className="p-timeline">{`${data.startTime} - ${data.endTime}`}</span>
      </p>
      <p><Icon icon="edit" /></p>
    </div>
  );
};

class Education extends React.Component {
  state = {
    educationEditPopover: false,
  };

  editEducation = (data) => {
    console.log(data);
  }

  addEducation = async (data) => {
    const { apis, account } = this.props;
    await apis.addUserEducation({
      ...data,
      startTime: data.startTime.toLocaleString('en-IN').split(',')[0],
      endTime: data.endTime.toLocaleString('en-IN').split(',')[0],
      userId: account.user.id,
    });
    return { response: 200, message: 'Done adding' };
  }

  togglePopover = () => {
    const { educationEditPopover } = this.state;
    this.setState({
      educationEditPopover: !educationEditPopover,
    });
  }

  render() {
    const { educationEditPopover } = this.state;
    const { database, account } = this.props;
    const schools = [];
    Object.values(database.UserEducation.byId).map((obj) => {
      if (account.user.id === obj.userId) {
        schools.push(obj);
      }
    });
    return (
      <div className="education">
        <PopoverForm
          isOpen={educationEditPopover}
          structure={educationSchema}
          callback={this.addEducation}
          onClose={() => this.togglePopover()}
        />
        <p className="p-top">
          <span>Education</span>
          <Icon icon="plus" onClick={this.togglePopover} />
        </p>
        {schools.length !== 0 ? (
          <div className="p-edu-list">
            {
              schools.map(obj => <SchoolInfo data={obj} key={obj.id} />)
            }
          </div>
        )
          : (
            <div>
              <span style={{ color: '#696969' }}>No School Added</span>
            </div>
          )
        }
      </div>
    );
  }
}

export default Education;