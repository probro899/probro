import React from 'react';
import { Icon } from '@blueprintjs/core';
import { PopoverForm } from '../../../../../components';
import { experienceSchema } from '../structure';

const office = require('../../../../../assets/icons/64w/office64.png');

class Education extends React.Component {
  state = {};

  state = {
    experienceEditPopover: false,
  };

  editExperience = (data) => {
    console.log(data);
  }

  togglePopover = () => {
    const { experienceEditPopover } = this.state;
    this.setState({
      experienceEditPopover: !experienceEditPopover,
    });
  }

  render() {
    const { experienceEditPopover } = this.state;
    return (
      <div className="experience">
        <PopoverForm
          isOpen={experienceEditPopover}
          structure={experienceSchema}
          callback={this.editExperience}
          onClose={() => this.togglePopover()}
        />
        <p className="p-top">
          <span>Experience</span>
          <Icon icon="plus" />
        </p>
        <div className="p-exp-list">
          <div className="p-exp-list-i">
            <img src={office} alt="school icon" />
            <p>
              <span className="p-title-i">Software Engineer</span>
              <br />
              <span className="p-company-i">Proper Class</span>
              <br />
              <span className="p-timeline">2012-2018</span>
              <br />
              <span>Place Kathmandu</span>
            </p>
            <p><Icon icon="edit" onClick={this.togglePopover} /></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Education;