import React from 'react';
import { Icon } from '@blueprintjs/core';
import { PopoverForm } from '../../../../../components';
import { educationSchema } from '../structure';

const school = require('../../../../../assets/icons/64w/school64.png');

class Education extends React.Component {
  state = {
    educationEditPopover: false,
  };

  editEducation = (data) => {
    console.log(data);
  }

  togglePopover = () => {
    const { educationEditPopover } = this.state;
    this.setState({
      educationEditPopover: !educationEditPopover,
    });
  }

  render() {
    const { educationEditPopover } = this.state;
    return (
      <div className="education">
        <PopoverForm
          isOpen={educationEditPopover}
          structure={educationSchema}
          callback={this.editEducation}
          onClose={() => this.togglePopover()}
        />
        <p className="p-top">
          <span>Education</span>
          <Icon icon="plus" />
        </p>
        <div className="p-edu-list">
          <div className="p-edu-list-i">
            <img src={school} alt="school icon" />
            <p>
              <span className="p-name-i">High School Study</span>
              <br />
              <span>Place Kathmandu</span>
              <br />
              <span className="p-timeline">2012-2018</span>
            </p>
            <p><Icon icon="edit" onClick={this.togglePopover} /></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Education;